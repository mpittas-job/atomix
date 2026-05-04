import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  variant?: "primary" | "dark" | "outline" | "outline-white";
  children: React.ReactNode;
  href?: string;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      size = "medium",
      variant = "primary",
      className = "",
      children,
      href,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      small: "px-4 py-2 text-sm",
      medium: "px-6 py-4 text-base",
      large: "px-8 py-5 text-lg",
    };

    const getBackgroundClass = () => {
      if (variant === "dark") {
        return "bg-[#003746] hover:bg-[#004a5e] border border-[#1491B3]";
      }

      if (variant === "outline") {
        return "bg-transparent border border-[#D9DEE2] text-[#011F27] hover:bg-[#D9DEE2]";
      }

      if (variant === "outline-white") {
        return "bg-transparent border border-[#fff] text-[#fff] hover:bg-white hover:text-[#011F27]";
      }

      return "bg-gradient-to-r from-[#19A1C6] to-[#2BB9DF] hover:opacity-90";
    };

    const baseClasses = `font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 cursor-pointer ${
      variant === "outline" || variant === "outline-white" ? "" : "text-white"
    }`;

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={`${baseClasses} ${sizeClasses[size]} ${getBackgroundClass()} ${className}`}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`${baseClasses} ${sizeClasses[size]} ${getBackgroundClass()} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
