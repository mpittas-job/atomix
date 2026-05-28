import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";
import { FaShieldHalved } from "react-icons/fa6";

export interface IconBoxSimpleProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  titleMaxWidth?: string;
  className?: string;
  children?: ReactNode;
  bgCircleClassName?: string;
}

export default function IconBoxSimple({
  icon,
  title,
  description,
  titleMaxWidth,
  className = "",
  children,
  bgCircleClassName = "bg-white/60",
}: IconBoxSimpleProps) {
  const gradientId = useId().replace(/:/g, "");
  const gradientUrl = `url(#${gradientId})`;

  const renderIcon = () => {
    if (icon && isValidElement(icon)) {
      const el = icon as ReactElement<{
        style?: React.CSSProperties;
        className?: string;
      }>;
      return cloneElement(el, {
        className: el.props.className || "",
        style: { ...el.props.style, fill: gradientUrl },
      });
    }

    return <FaShieldHalved className="h-7 w-7" style={{ fill: gradientUrl }} />;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-0 bg-white/40 p-6 backdrop-blur-md border-1 border-white/80 ${className}`}
      style={{
        boxShadow: "inset 5px 5px 20px rgba(10, 21, 44, 0.06)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className={`absolute -top-5 -right-5 h-[35%] w-[35%] rounded-full blur-xl ${bgCircleClassName}`} />
        <div className={`absolute -bottom-5 -left-5 h-[35%] w-[35%] rounded-full blur-xl ${bgCircleClassName}`} />
      </div>

      <div className="relative flex h-full flex-col items-start gap-3 text-left">
        <svg width="0" height="0" className="absolute" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0693B9" />
              <stop offset="100%" stopColor="#39C6ED" />
            </linearGradient>
          </defs>
        </svg>

        {children ? (
          children
        ) : (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D8E9EE]">
              {renderIcon()}
            </div>

            <h3
              className="text-lg leading-6 font-semibold text-[#011F27]"
              style={titleMaxWidth ? { maxWidth: titleMaxWidth } : undefined}
            >
              {title}
            </h3>

            <p className="text-md leading-relaxed text-[#4B6066]">{description}</p>
          </>
        )}
      </div>
    </div>
  );
}
