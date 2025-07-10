
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardCleanVariants = cva(
  "relative overflow-hidden transition-all duration-200 ease-out bg-white rounded-xl shadow-md border-3",
  {
    variants: {
      variant: {
        default: "border-hsl(var(--neutral-300)) hover:border-hsl(var(--neutral-400)) hover:shadow-lg",
        primary: "border-hsl(var(--blue-primary))/30 hover:border-hsl(var(--blue-primary))/50 hover:shadow-lg hover:shadow-hsl(var(--blue-primary))/10",
        success: "border-hsl(var(--green-primary))/30 hover:border-hsl(var(--green-primary))/50 hover:shadow-lg hover:shadow-hsl(var(--green-primary))/10",
        warning: "border-hsl(var(--orange-primary))/30 hover:border-hsl(var(--orange-primary))/50 hover:shadow-lg hover:shadow-hsl(var(--orange-primary))/10",
        selected: "bg-hsl(var(--blue-bg)) border-hsl(var(--blue-primary)) shadow-lg shadow-hsl(var(--blue-primary))/20"
      },
      size: {
        default: "p-8",
        sm: "p-6",
        lg: "p-10",
        category: "p-8 min-h-[300px]"
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-2",
        scale: "hover:scale-[1.02]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "none"
    }
  }
)

export interface CardCleanProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardCleanVariants> {}

const CardClean = React.forwardRef<HTMLDivElement, CardCleanProps>(
  ({ className, variant, size, hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardCleanVariants({ variant, size, hover, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CardClean.displayName = "CardClean"

export { CardClean, cardCleanVariants }
