
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardCleanVariants = cva(
  "relative overflow-hidden transition-all duration-200 ease-out bg-white border-2 rounded-xl shadow-sm",
  {
    variants: {
      variant: {
        default: "border-slate-200 hover:border-slate-300 hover:shadow-md",
        primary: "border-hsl(var(--blue-primary))/20 hover:border-hsl(var(--blue-primary))/40 hover:shadow-md",
        success: "border-hsl(var(--green-primary))/20 hover:border-hsl(var(--green-primary))/40 hover:shadow-md",
        warning: "border-hsl(var(--orange-primary))/20 hover:border-hsl(var(--orange-primary))/40 hover:shadow-md",
        selected: "bg-hsl(var(--blue-primary))/5 border-hsl(var(--blue-primary)) shadow-md"
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        category: "p-6 min-h-[240px]"
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1",
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
