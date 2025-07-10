
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const modernCardVariants = cva(
  "relative overflow-hidden transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-white border border-slate-200 shadow-lg",
        glassmorphism: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
        gradient: "bg-gradient-to-br shadow-xl border-0",
        premium: "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl",
        success: "bg-green-50 border border-green-200 shadow-lg",
        error: "bg-red-50 border border-red-200 shadow-lg"
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        xl: "p-12"
      },
      hover: {
        default: "hover:scale-105 hover:shadow-xl",
        float: "hover:-translate-y-2 hover:scale-105 hover:shadow-2xl",
        shine: "hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25",
        transform3d: "hover:scale-110 hover:rotateY-5 hover:rotateX-5 hover:shadow-2xl"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "default"
    }
  }
)

export interface ModernCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modernCardVariants> {
  shine?: boolean
  gradient?: string
}

const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, variant, size, hover, shine = false, gradient, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          modernCardVariants({ variant, size, hover, className }),
          gradient && `bg-gradient-to-br ${gradient}`,
          "transform-gpu will-change-transform",
          shine && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
        )}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ModernCard.displayName = "ModernCard"

export { ModernCard, modernCardVariants }
