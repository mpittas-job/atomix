import React from "react";

interface BadgeHeadingPillProps {
  children: React.ReactNode;
  color?: "dark";
  size?: "default" | "small";
  className?: string;
}

export const BadgeHeadingPill: React.FC<BadgeHeadingPillProps> = ({
  children,
  color = "dark",
  size = "default",
  className = "",
}) => {
  const colorStyles = {
    dark: {
      background: "bg-linear-to-r from-[#43727F] to-[#265866]",
      textGradient: "from-[#fff] to-[#fff]",
    },
  };
  const sizeStyles = {
    default: {
      wrapper: "px-4 py-2",
      text: "font-medium",
    },
    small: {
      wrapper: "px-3 py-1.5",
      text: "text-sm font-medium",
    },
  };

  const styles = colorStyles[color] ?? colorStyles.dark;
  const sizeStyle = sizeStyles[size] ?? sizeStyles.default;

  return (
    <span
      className={`inline-block rounded-full ${styles.background} ${sizeStyle.wrapper} ${className}`}
    >
      <span
        className={`bg-gradient-to-r ${styles.textGradient} bg-clip-text text-transparent ${sizeStyle.text}`}
      >
        {children}
      </span>
    </span>
  );
};
