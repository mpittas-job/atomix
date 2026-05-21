"use client";

import type { ReactNode } from "react";
import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
} from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCpu,
  FiGlobe,
  FiKey,
  FiUsers,
} from "react-icons/fi";
import { Button as DefButton } from "@/components/ui";
import { CgArrowsHAlt } from "react-icons/cg";
import { FaUsers, FaMicrochip, FaKey, FaRocket, FaGlobe } from "react-icons/fa";

interface WhyCardProps {
  title: string;
  description: string;
  buttonText?: string;
  linkText?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  checklistClassName?: string;
  checklistIconClassName?: string;
  buttonVariant?: "primary" | "dark" | "outline" | "outline-white";
  buttonClassName?: string;
  checklist?: string[];
}

interface OverlayItemCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  glowTopClassName?: string;
  glowBottomClassName?: string;
  iconGradientUrl?: string;
}

function clamp(min: number, max: number, value: number) {
  return Math.max(min, Math.min(max, value));
}

function WhyCard({
  title,
  description,
  buttonText,
  linkText,
  className = "text-white",
  titleClassName = "",
  descriptionClassName = "",
  checklistClassName = "",
  checklistIconClassName = "",
  buttonVariant = "primary",
  buttonClassName = "",
  checklist,
}: WhyCardProps) {
  return (
    <div className={`${className} flex flex-col items-start gap-y-7 max-w-lg`}>
      <div className={`text-6xl font-semibold uppercase ${titleClassName}`}>
        {title}
      </div>
      <div className={`text-2xl leading-[1.5em] ${descriptionClassName}`}>
        {description}
      </div>
      {checklist && (
        <ul className="space-y-3.5 my-2">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <FiCheck
                className={`w-6 h-6 shrink-0 mt-0.5 opacity-90 ${checklistIconClassName || "text-[#39C6ED]"}`}
              />
              <span
                className={`text-lg md:text-xl leading-relaxed opacity-90 ${checklistClassName}`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
      <DefButton
        href={linkText || "#"}
        variant={buttonVariant}
        size="large"
        className={buttonClassName}
      >
        {buttonText || "See Opportunities"}
      </DefButton>
    </div>
  );
}

function OverlayItemCard({
  icon,
  title,
  description,
  className = "bg-white text-white",
  titleClassName = "",
  descriptionClassName = "text-white/80",
  glowTopClassName = "bg-white/70",
  glowBottomClassName = "bg-white/70",
  iconGradientUrl,
}: OverlayItemCardProps) {
  const renderIcon = () => {
    if (!iconGradientUrl || !icon) return icon;
    if (!isValidElement(icon)) return icon;

    const el = icon as React.ReactElement<{
      style?: React.CSSProperties;
      className?: string;
    }>;

    // Same gradient technique as IconBoxLight (defs + url(#id)),
    // but we set both fill and stroke for better react-icons coverage.
    return cloneElement(el, {
      className: el.props.className || "",
      style: {
        ...el.props.style,
        fill: iconGradientUrl,
        stroke: iconGradientUrl,
      },
    });
  };

  return (
    <div
      className={`relative flex flex-col items-start text-left gap-y-3 rounded-[29px] bg-white/10 inset-shadow-[0_0_10px_rgba(0,0,0,0.05)] border border-white/18 p-6 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
        <div
          className={`absolute -top-5 -right-5 w-[35%] h-[35%] rounded-full blur-xl ${glowTopClassName}`}
        />
        <div
          className={`absolute -bottom-5 -left-5 w-[35%] h-[35%] rounded-full blur-xl ${glowBottomClassName}`}
        />
      </div>

      <div className="relative flex flex-col items-start text-left gap-y-2">
        <div className="mb-2">{renderIcon()}</div>
        <div className={`text-xl font-semibold ${titleClassName}`}>{title}</div>
        <div className={descriptionClassName}>{description}</div>
      </div>
    </div>
  );
}

const ICON_CLASS_NAME = "h-8 w-8";

/** Full-section vertical background (top → bottom). */
const SECTION_BG_GRADIENT = "linear-gradient(180deg, #014355 0%, #247691 100%)";

/** Right column panel (Opportunities / overlay left column). */
const SECTION_RIGHT_PANEL_BG = "#EBEFF2";

const SEAMLESS_TWO_COLUMN_GRID_STYLE = {
  gridTemplateColumns: "calc(50% + 1px) calc(50% + 1px)",
} as const;

const SEAMLESS_RIGHT_COLUMN_STYLE = {
  marginLeft: "-1px",
} as const;

const OVERLAY_ITEMS: OverlayItemCardProps[] = [
  {
    icon: <FaUsers className={ICON_CLASS_NAME} aria-hidden="true" />,
    title: "Small Team, Big Impact",
    description:
      "Join a focused team where every contribution directly shapes the product, technology, and company.",
  },
  {
    icon: <FaMicrochip className={ICON_CLASS_NAME} aria-hidden="true" />,
    title: "Cutting-Edge Technology",
    description:
      "Work across AI, automation, data systems, and blockchain-backed infrastructure.",
  },
  {
    icon: <FaGlobe className={ICON_CLASS_NAME} aria-hidden="true" />,
    title: "Real-World Financial Infrastructure",
    description:
      "Build technology that powers real lending markets and impacts billions in asset-backed finance.",
  },
  {
    icon: <FaKey className={ICON_CLASS_NAME} aria-hidden="true" />,
    title: "Ownership From Day One",
    description:
      "Take ownership of key systems early and help define both architecture and product direction.",
  },
  {
    icon: <FaRocket className={ICON_CLASS_NAME} aria-hidden="true" />,
    title: "Fast Product Iteration",
    description:
      "Ship quickly with short feedback loops, rapid experiments, and direct collaboration across teams.",
  },
  {
    icon: <FaGlobe className={ICON_CLASS_NAME} aria-hidden="true" />,
    title: "Global Scope, Practical Impact",
    description:
      "Deliver infrastructure used across regions, turning complex financial workflows into scalable products.",
  },
];

const LEFT_OVERLAY_ITEMS = OVERLAY_ITEMS.slice(0, 3);
const RIGHT_OVERLAY_ITEMS = OVERLAY_ITEMS.slice(3, 6);

function OverlayContent({
  innerRef,
}: {
  innerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const leftGradientId = useId().replace(/:/g, "");
  const leftGradientUrl = useMemo(
    () => `url(#${leftGradientId})`,
    [leftGradientId],
  );

  return (
    <div
      ref={innerRef}
      className="relative grid h-full w-full items-stretch gap-0"
      style={SEAMLESS_TWO_COLUMN_GRID_STYLE}
    >
      <div
        className="relative flex min-h-full min-w-0 items-center justify-center"
        style={{ backgroundColor: SECTION_RIGHT_PANEL_BG }}
      >
        <div
          className="relative max-w-lg flex flex-col items-end text-white text-center gap-y-3"
          data-overlay-content
          style={{ opacity: 0, willChange: "opacity" }}
        >
          <svg width="0" height="0" className="absolute" aria-hidden="true">
            <defs>
              <linearGradient
                id={leftGradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#0693B9" />
                <stop offset="100%" stopColor="#39C6ED" />
              </linearGradient>
            </defs>
          </svg>

          {LEFT_OVERLAY_ITEMS.map((item, index) => (
            <OverlayItemCard
              key={`${item.title}-${index}`}
              icon={item.icon}
              title={item.title}
              description={item.description}
              className="bg-white/30 inset-shadow-[0_0_10px_rgba(0,0,0,0.05)] border border-white/30 text-[#011F27]"
              descriptionClassName="text-[#4C6268]"
              iconGradientUrl={leftGradientUrl}
            />
          ))}
        </div>
      </div>

      <div
        className="flex min-h-full min-w-0 items-center justify-center"
        style={{
          ...SEAMLESS_RIGHT_COLUMN_STYLE,
          backgroundImage: SECTION_BG_GRADIENT,
        }}
      >
        <div
          className="max-w-lg flex flex-col items-end text-white text-center gap-y-3"
          data-overlay-content
          style={{ opacity: 0, willChange: "opacity" }}
        >
          {RIGHT_OVERLAY_ITEMS.map((item, index) => (
            <OverlayItemCard
              key={`${item.title}-${index}`}
              icon={item.icon}
              title={item.title}
              description={item.description}
              className="bg-[#003746] text-white"
              descriptionClassName="text-white/80"
              glowTopClassName="bg-white/20"
              glowBottomClassName="bg-white/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SliderWhyWorkWithUs() {
  const DEBUG_SHOW_FULL_OVERLAY = false;
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const handleWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fadeCardRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const signedProgressRef = useRef(0); // [-1..1], used for a11y label only

  useEffect(() => {
    const container = containerRef.current;
    const handle = handleRef.current;
    const handleWrap = handleWrapRef.current;
    const overlay = overlayRef.current;
    const fadeCard = fadeCardRef.current;
    const overlayContent = overlayContentRef.current;
    if (
      !container ||
      !handle ||
      !handleWrap ||
      !overlay ||
      !fadeCard ||
      !overlayContent
    )
      return;

    let maxX = container.clientWidth / 2;

    const overlayContentEls = Array.from(
      overlayContent.querySelectorAll<HTMLElement>("[data-overlay-content]"),
    );

    let rafId: number | null = null;
    let pendingX = 0;
    let currentX = 0;
    let dragging = false;
    let startPointerX = 0;
    let startX = 0;

    const apply = (x: number) => {
      const signedProgress = maxX > 0 ? clamp(-1, 1, x / maxX) : 0;
      signedProgressRef.current = signedProgress;
      const rightProgress = Math.max(0, signedProgress);
      const leftProgress = Math.max(0, -signedProgress);
      const revealProgress = Math.abs(signedProgress);
      const contentOpacity = clamp(0, 1, revealProgress * 12);

      const leftInset = (1 - leftProgress) * 50;
      const rightInset = (1 - rightProgress) * 50;
      const visiblePct = 100 - leftInset - rightInset;
      if (DEBUG_SHOW_FULL_OVERLAY) {
        overlay.style.clipPath = "inset(0 0 0 0)";
      } else if (visiblePct <= 0.01) {
        overlay.style.clipPath = "inset(0 50% 0 50%)";
      } else {
        overlay.style.clipPath = `inset(0 ${rightInset}% 0 ${leftInset}%)`;
      }

      fadeCard.style.opacity = String(1 - rightProgress);

      const opacityStr = String(DEBUG_SHOW_FULL_OVERLAY ? 1 : contentOpacity);
      for (const el of overlayContentEls) el.style.opacity = opacityStr;

      handleWrap.style.transform = `translate3d(${x}px, 0, 0) translate(-50%, -50%)`;

      const a11yValueNow = Math.round(signedProgress * 100);
      handle.setAttribute("aria-valuenow", String(a11yValueNow));
    };

    const scheduleApply = (x: number) => {
      pendingX = x;
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        apply(pendingX);
      });
    };

    // Initialize styles without loading GSAP.
    apply(0);

    const resizeObserver = new ResizeObserver(([entry]) => {
      maxX = entry.contentRect.width / 2;
      currentX = clamp(-maxX, maxX, currentX);
      scheduleApply(currentX);
    });

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      startPointerX = e.clientX;
      startX = currentX;
      handle.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = e.clientX - startPointerX;
      const nextX = clamp(-maxX, maxX, startX + delta);
      currentX = nextX;
      scheduleApply(nextX);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      handle.releasePointerCapture?.(e.pointerId);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Home" &&
        e.key !== "End"
      )
        return;
      e.preventDefault();
      const step = Math.max(12, Math.round(maxX * 0.08));
      if (e.key === "Home") currentX = 0;
      else if (e.key === "End") currentX = maxX;
      else if (e.key === "ArrowLeft")
        currentX = clamp(-maxX, maxX, currentX - step);
      else if (e.key === "ArrowRight")
        currentX = clamp(-maxX, maxX, currentX + step);
      scheduleApply(currentX);
    };

    resizeObserver.observe(container);
    handle.addEventListener("pointerdown", onPointerDown);
    handle.addEventListener("pointermove", onPointerMove, { passive: true });
    handle.addEventListener("pointerup", onPointerUp, { passive: true });
    handle.addEventListener("pointercancel", onPointerUp, { passive: true });
    handle.addEventListener("keydown", onKeyDown);

    return () => {
      resizeObserver.disconnect();
      if (rafId != null) window.cancelAnimationFrame(rafId);
      handle.removeEventListener("pointerdown", onPointerDown);
      handle.removeEventListener("pointermove", onPointerMove);
      handle.removeEventListener("pointerup", onPointerUp);
      handle.removeEventListener("pointercancel", onPointerUp);
      handle.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-[calc(100vh-126px)] rounded-3xl relative overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Base content */}
      <div className="w-full relative z-10 flex-1 flex flex-col justify-center">
        <div
          className="relative grid h-full w-full flex-1 items-stretch gap-0"
          style={SEAMLESS_TWO_COLUMN_GRID_STYLE}
        >
          <div
            className="flex min-h-full min-w-0 flex-col items-start justify-center pl-10 md:pl-20 lg:pl-36"
            style={{ backgroundImage: SECTION_BG_GRADIENT }}
          >
            <WhyCard
              title="Team"
              description="Our culture prioritizes high ownership, high velocity, and zero bureaucracy. We are building property lending technology that scales, from the ground up."
              buttonText="See Team"
              linkText="/about-us"
              buttonVariant="outline-white"
              checklistIconClassName="text-white"
              checklist={[
                "Lorem ipsum dolor sit amet, consectetur.",
                "Suspendisse varius lorem eget leo vehicula.",
                "Donec auctor justo nec eleifend eleifend.",
              ]}
            />
          </div>
          <div
            className="flex min-h-full min-w-0 flex-col items-end justify-center pr-10 md:pr-20 lg:pr-36"
            style={{
              ...SEAMLESS_RIGHT_COLUMN_STYLE,
              backgroundColor: SECTION_RIGHT_PANEL_BG,
            }}
          >
            <div ref={fadeCardRef}>
              <WhyCard
                title="OPPORTUNITIES"
                description="We are actively growing our team with builders, systems thinkers, and engineers who care deeply about craft and real-world impact."
                buttonText="See Opportunities"
                linkText="/careers"
                className="text-[#011F27]"
                descriptionClassName="text-[#4B6166]"
                checklistClassName="text-[#4B6166]"
                checklistIconClassName="text-neutral-700"
                buttonVariant="outline"
                buttonClassName="border-[#d2d5d8] hover:bg-[#d2d5d8] bg-transparent text-[#011F27] hover:text-[#011F27] focus:ring-[#d2d5d8] focus:ring-offset-0"
                checklist={[
                  "Lorem ipsum dolor sit amet, consectetur.",
                  "Suspendisse varius lorem eget leo vehicula.",
                  "Donec auctor justo nec eleifend eleifend.",
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay content revealed on drag (covers the OPPORTUNITIES side) */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20"
        style={{ willChange: "clip-path" }}
        // style={{ clipPath: "inset(0 50% 0 50%)" }}
      >
        <OverlayContent innerRef={overlayContentRef} />
      </div>

      {/* Draggable handle */}
      <div
        ref={handleWrapRef}
        className="absolute top-1/2 left-1/2 z-40 will-change-transform"
      >
        <div
          ref={handleRef}
          className="w-[72px] h-[72px] rounded-full border-2 border-white flex items-center justify-center bg-[#247691] cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-white/50 will-change-transform"
          style={{ touchAction: "none" }}
          aria-label="Drag to reveal"
          role="slider"
          tabIndex={0}
          aria-valuemin={-100}
          aria-valuemax={100}
          aria-valuenow={0}
          aria-valuetext="Drag left or right to reveal"
        >
          <span className="flex items-center justify-center gap-x-1 text-white">
            <CgArrowsHAlt className="h-8 w-8" aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
