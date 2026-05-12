import type { ComponentType, ReactNode, SVGProps } from "react";

export type AdvSliderTooltipIcon = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string }
>;

export type AdvSliderTooltipProps = {
  /** Any `react-icons` icon component */
  icon: AdvSliderTooltipIcon;
  /** Main message shown next to the icon */
  title: ReactNode;
  className?: string;
  /** Dashed connector height in pixels (default `48`, ~Tailwind `h-12`) */
  lineHeight?: number;
  /**
   * CSS `left` for the dot + dashed line stack above the tooltip.
   * Defaults to `50%` with `translateX(-50%)` so the connector stays centered.
   */
  connectorLeft?: string;
  /** Icon fill color (any CSS color). Defaults to `#499DB8`. */
  iconColor?: string;
};

export default function AdvSliderTooltip({
  icon: Icon,
  title,
  className = "",
  lineHeight = 48,
  connectorLeft,
  iconColor = "#499DB8",
}: AdvSliderTooltipProps) {
  return (
    <div
      className={`flex flex-col absolute top-[calc(100%+20px)] left-[50%] translate-x-[-50%] ${className}`}
    >
      <div
        className={
          connectorLeft != null
            ? "absolute bottom-full flex flex-col items-center translate-x-[-50%]"
            : "absolute left-[50%] translate-x-[-50%] bottom-full flex flex-col items-center"
        }
        style={connectorLeft != null ? { left: connectorLeft } : undefined}
        aria-hidden
      >
        <span className="size-2 shrink-0 rounded-full bg-[#6CAFC5] relative -left-[1px]" />
        <div
          className="w-0 shrink-0 self-center border-l border-dashed border-[#6CAFC5]"
          style={{ height: `${lineHeight}px` }}
        />
      </div>
      <div className="flex w-full min-w-[800px] items-start gap-3 rounded-2xl px-4 py-3 text-left bg-[#EAEFF1] p-5 ring-1 ring-[#fff] shadow-[inset_0_1px_20px_rgba(255,255,255,0.65)] backdrop-blur-md relative overflow-hidden">
        <Icon
          className="mt-0.5 size-5 shrink-0 relative z-1"
          style={{ color: iconColor }}
          aria-hidden
        />
        <p className="m-0 min-w-0 text-md font-medium text-[#011F27] relative z-1">
          {title}
        </p>

        <div className="pointer-events-none absolute inset-0 rounded-3xl">
          <div className="absolute -top-5 -right-5 w-[35%] h-[35%] rounded-2xl bg-white/100 blur-xl" />
          <div className="absolute -bottom-5 -left-5 w-[35%] h-[35%] rounded-2xl bg-white/100 blur-xl" />
        </div>
      </div>
    </div>
  );
}
