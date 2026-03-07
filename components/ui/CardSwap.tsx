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
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { gridState } from "./GridCanvas";
import { BracketLabel } from "./BracketLabel";
import ScrambleText from "./ScrambleText";
import { useBlurSwap } from "@/lib/hooks/useBlurSwap";
import { useTranslation } from "@/lib/providers/LanguageProvider";

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
  language?: string;
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
      className={`absolute top-1/2 left-1/2 rounded-xl border border-[#314158]/50 bg-[#060910]
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

// Per-project text block with scramble + blur swap
const ProjectText = ({
  project,
  language,
}: {
  project: ProjectData;
  language: string;
}) => {
  const { displayText, style } = useBlurSwap(
    project.description ?? "",
    language,
  );

  return (
    <>
      <BracketLabel>
        <div className="tracking-normal xl:tracking-wider 2xl:tracking-widest">
          <ScrambleText
            text={project.project ?? ""}
            trigger={language}
            as="span"
          />
        </div>
      </BracketLabel>

      <div className="flex items-start gap-2 lg:gap-3">
        <h2 className="text-bone md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-black tracking-tighter uppercase italic leading-none">
          <ScrambleText text={project.title} trigger={language} as="span" />
        </h2>
      </div>

      <p
        className="text-zinc-300 max-w-xs 2xl:max-w-md text-xs lg:text-sm 2xl:text-lg leading-relaxed mt-2 lg:mt-6 font-light italic whitespace-pre-line font-serif"
        style={style}
      >
        {displayText}
      </p>
    </>
  );
};

const CardSwap: React.FC<CardSwapProps> = ({
  projects,
  width = 1000,
  height = 800,
  cardDistance = 60,
  verticalDistance = 70,
  skewAmount = 6,
  language = "en",
  children,
}) => {
  const { t } = useTranslation();

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const total = refs.length;
    if (total === 0) return;

    gridState.heroProgress = 1;
    gridState.flattenProgress = 0;

    const totalSteps = total + 1;

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

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(totalSteps + 1) * 2000}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          preventOverlaps: true,
          fastScrollEnd: true,
          refreshPriority: 0,
          snap: {
            snapTo: 1 / totalSteps,
            duration: { min: 0.3, max: 0.6 },
            delay: 0.2,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const p = self.progress;
            const total_duration = totalSteps + 1;
            const flattenStart = total / total_duration;
            const show = p > 0.00001 && p < flattenStart - 0.01;
            setIsActive(show);

            const stepSize = 1 / total_duration;
            const idx = Math.min(Math.floor(p / stepSize), total - 1);
            setActiveIndex(idx);
          },
          onRefresh: () => {
            const spacer = sectionRef.current?.parentElement;
            if (spacer?.classList.contains("pin-spacer")) {
              (spacer as HTMLElement).style.pointerEvents = "none";
            }
          },
        },
      });

      masterTl.to({}, { duration: 1 });

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

      masterTl.addLabel("flatten");
      masterTl.call(() => setIsActive(false), [], "flatten");

      refs.forEach((ref) => {
        masterTl.to(
          ref.current!,
          { opacity: 0, y: "+=400", duration: 1.5, ease: "power2.in" },
          "flatten",
        );
      });

      const lastText = textRefs.current[total - 1];
      if (lastText) {
        masterTl.to(
          lastText,
          { opacity: 0, y: -40, filter: "blur(10px)", duration: 1 },
          "flatten",
        );
      }

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

    const el = sectionRef.current;
    const observer = new MutationObserver(() => {
      if (el && el.style.position === "fixed") {
        el.style.width = `${document.documentElement.clientWidth}px`;
        el.style.maxWidth = `${document.documentElement.clientWidth}px`;
      } else if (el) {
        el.style.width = "";
        el.style.maxWidth = "";
      }
    });
    if (el)
      observer.observe(el, { attributes: true, attributeFilter: ["style"] });

    return () => {
      ctx.revert();
      observer.disconnect();
    };
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
    <>
      <div
        ref={sectionRef}
        style={{ width: "100%" }}
        className="w-full h-screen relative bg-transparent overflow-hidden flex items-center px-6 lg:px-12 xl:px-20 pointer-events-none"
      >
        {/* LEFT: Text */}
        <div className="relative w-1/2 h-[300px] z-10 pointer-events-auto">
          {projects.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-col justify-center gap-2 lg:gap-4"
            >
              <ProjectText
                key={`${i}-${language}`}
                project={project}
                language={language}
              />
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

      {/* Fixed label + dots */}
      <div
        className="fixed top-8 left-1/2 z-50 pointer-events-none flex flex-col items-center gap-3"
        style={{
          opacity: isActive ? 1 : 0,
          filter: isActive ? "blur(0px)" : "blur(8px)",
          transform: `translateX(-50%) translateY(${isActive ? "0px" : "-10px"})`,
          transition:
            "opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease",
        }}
      >
        <ScrambleText
          text={`[ ${t("selected_work")} ]`}
          trigger={language}
          as="span"
          className="font-mono text-xs tracking-[0.5em] uppercase"
          style={{
            color: "#E2D1A4",
            filter: "drop-shadow(0 0 6px rgba(226,209,164,0.5))",
          }}
        />
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeIndex ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: "#E2D1A4",
                opacity: i === activeIndex ? 1 : 0.25,
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CardSwap;
