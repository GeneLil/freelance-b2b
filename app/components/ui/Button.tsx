import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-black text-white hover:bg-gray-800 shadow-sm focus-visible:ring-black",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400",
        outline:
          "border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-700 focus-visible:ring-gray-400",
        danger:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm focus-visible:ring-red-600",
      },
      size: {
        small: "h-8 px-3 text-xs gap-1.5",
        medium: "h-10 px-4 text-sm gap-2",
        large: "h-12 px-6 text-base gap-2.5",
      },
      shape: {
        rectangular: "rounded-lg",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
      shape: "rectangular",
    },
  },
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, icon, children, ...props }, ref) => {
    const isIconOnly = !children

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            shape,
            className,
          }),
          "cursor-pointer",
          isIconOnly
            ? "px-0 aspect-square"
            : {
                "px-3": size === "small",
                "px-4": size === "medium",
                "px-6": size === "large",
              },
          isIconOnly && "px-0 aspect-square",
        )}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              "flex items-center justify-center",
              isIconOnly ? "" : "shrink-0",
            )}
          >
            {icon}
          </span>
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
