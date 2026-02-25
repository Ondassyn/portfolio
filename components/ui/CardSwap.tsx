"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RotatingText from "./RotatingText";
import { Boxes } from "./Boxes";

// --- Interfaces ---

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

// --- Components ---

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

// --- Helpers ---

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

// --- Main Component ---

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

    const ctx = gsap.context(() => {
      // 1. Initial State: Cards
      refs.forEach((r, i) =>
        placeNow(
          r.current!,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount,
        ),
      );

      // 2. Initial State: Text (Hide everything except the first one)
      gsap.set(textRefs.current.slice(1), {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        pointerEvents: "none",
      });

      // 3. Create Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${total * 1200}`, // Total scroll distance
          pin: true,
          scrub: 1,
          snap: 1 / total,
        },
      });

      for (let step = 0; step < total; step++) {
        const label = `step${step}`;
        masterTl.addLabel(label);

        const elFront = refs[step % total].current!;
        const currentText = textRefs.current[step % total];
        const nextText = textRefs.current[(step + 1) % total];

        // A. Drop Current Card
        masterTl.to(
          elFront,
          {
            y: "+=600",
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          label,
        );

        // B. Animate Text Reveal
        if (currentText && nextText && step < total - 1) {
          masterTl.to(
            currentText,
            {
              opacity: 0,
              y: -40,
              filter: "blur(10px)",
              duration: 0.6,
            },
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

        // C. Advance the Stack
        refs.forEach((ref, index) => {
          const el = ref.current!;
          if (el === elFront) return;

          let virtualIndex = (index - (step + 1) + total) % total;
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

        // D. Send Dropped Card to Back
        const lastSlot = makeSlot(
          total - 1,
          cardDistance,
          verticalDistance,
          total,
        );
        masterTl.set(elFront, { zIndex: 0 }, `${label}+=1`);
        masterTl.to(
          elFront,
          {
            x: lastSlot.x,
            y: lastSlot.y,
            z: lastSlot.z,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          `${label}+=1`,
        );
      }
    });

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
    <div
      ref={sectionRef}
      className="w-full h-screen relative bg-obsidian overflow-hidden flex items-center px-20"
    >
      <Boxes />
      {/* 1. LEFT SIDE: Dynamic Text Section */}
      <div className="relative w-1/2 h-[300px]">
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

      {/* 2. RIGHT SIDE: Swapping Cards Container */}
      <div
        ref={container}
        className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[15%] origin-bottom-right perspective-[1500px] overflow-visible"
        style={{ width, height }}
      >
        {rendered}
      </div>
    </div>
  );
};

export default CardSwap;
