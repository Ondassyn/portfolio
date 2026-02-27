"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gridState } from "./GridCanvas";

export interface ProjectData {
  title: string;
  project?: string;
  description?: string;
}

export interface CardSwapProps {
  projects: ProjectData[];
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  skewAmount?: number;
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-[#314158]/50 bg-[#0f172b]
        [transform-style:preserve-3d] [will-change:transform,opacity] [backface-visibility:hidden]
        [-webkit-font-smoothing:antialiased] shadow-2xl ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  ),
);
Card.displayName = "Card";

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap: React.FC<CardSwapProps> = ({
  projects,
  width = 1000,
  height = 800,
  cardDistance = 60,
  verticalDistance = 70,
  skewAmount = 6,
  children,
}) => {
  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children],
  );
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length],
  );

  const container = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const total = refs.length;
    if (total === 0) return;

    // Reset grid to skewed state when this section mounts
    gridState.flattenProgress = 0;

    const ctx = gsap.context(() => {
      refs.forEach((r, i) =>
        placeNow(
          r.current!,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount,
        ),
      );
      gsap.set(textRefs.current.slice(1), {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        pointerEvents: "none",
      });

      const totalSteps = total + 1;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalSteps * 1200}`,
          pin: true,
          scrub: 1,
          snap: 1 / totalSteps,
          onRefresh: () => {
            // GSAP wraps the pinned element in a .pin-spacer div which
            // captures pointer events across the entire scroll distance.
            // Disable it so clicks reach the canvas underneath.
            const spacer = sectionRef.current?.parentElement;
            if (spacer?.classList.contains("pin-spacer")) {
              (spacer as HTMLElement).style.pointerEvents = "none";
            }
          },
        },
      });

      // --- Card cycle ---
      for (let step = 0; step < total; step++) {
        const label = `step${step}`;
        masterTl.addLabel(label);

        const elFront = refs[step].current!;
        const currentText = textRefs.current[step];
        const nextText = textRefs.current[(step + 1) % total];

        masterTl.to(
          elFront,
          { y: "+=600", opacity: 0, duration: 1, ease: "power2.in" },
          label,
        );

        if (currentText && nextText && step < total - 1) {
          masterTl.to(
            currentText,
            { opacity: 0, y: -40, filter: "blur(10px)", duration: 0.6 },
            label,
          );
          masterTl.to(
            nextText,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            `${label}+=0.4`,
          );
        }

        refs.forEach((ref, index) => {
          const el = ref.current!;
          if (el === elFront) return;
          const virtualIndex = (index - (step + 1) + total) % total;
          const slot = makeSlot(
            virtualIndex,
            cardDistance,
            verticalDistance,
            total,
          );
          masterTl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              zIndex: slot.zIndex,
              duration: 1,
              ease: "power2.inOut",
            },
            label,
          );
        });
      }

      // --- Flatten phase ---
      masterTl.addLabel("flatten");

      // Dismiss all remaining cards
      refs.forEach((ref) => {
        masterTl.to(
          ref.current!,
          { opacity: 0, y: "+=400", duration: 1.5, ease: "power2.in" },
          "flatten",
        );
      });

      // Fade last text
      const lastText = textRefs.current[total - 1];
      if (lastText) {
        masterTl.to(
          lastText,
          { opacity: 0, y: -40, filter: "blur(10px)", duration: 1 },
          "flatten",
        );
      }

      // Drive gridState.flattenProgress from 0 → 1.
      // GridCanvas reads this each frame to compute skew/scale.
      // Using a proxy object so GSAP can tween a plain number.
      const proxy = { value: 0 };
      masterTl.to(
        proxy,
        {
          value: 1,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: () => {
            gridState.flattenProgress = proxy.value;
          },
        },
        "flatten+=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [refs, cardDistance, verticalDistance, skewAmount]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
        } as any)
      : child,
  );

  return (
    // bg-transparent so the fixed GridCanvas shows through
    <div
      ref={sectionRef}
      className="w-full h-screen relative bg-transparent overflow-hidden flex items-center px-20 pointer-events-none"
    >
      {/* LEFT: Text — re-enable pointer events for text selection */}
      <div className="relative w-1/2 h-[300px] z-10 pointer-events-auto">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col justify-center gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-px bg-cyan-400" />
              <span className="text-cyan-400 font-mono text-sm tracking-[0.4em] uppercase">
                {project.project}
              </span>
            </div>
            <h2 className="text-bone text-7xl font-black tracking-tighter uppercase italic leading-none">
              {project.title}
            </h2>
            <p className="text-zinc-300 max-w-md lg:text-lg leading-relaxed mt-6 font-light italic whitespace-pre-line font-serif">
              {project.description ||
                "Experimental design and development focusing on immersive web interfaces."}
            </p>
          </div>
        ))}
      </div>

      {/* RIGHT: Card Stack */}
      <div
        ref={container}
        className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[15%] origin-bottom-right perspective-[1500px] overflow-visible pointer-events-none"
        style={{ width, height }}
      >
        {rendered}
      </div>
    </div>
  );
};

export default CardSwap;
