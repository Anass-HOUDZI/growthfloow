
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonCleanVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-800 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm hover:shadow-md",
        primary: "bg-hsl(var(--blue-primary)) text-white border-hsl(var(--blue-dark)) hover:bg-hsl(var(--blue-dark)) shadow-md hover:shadow-lg",
        success: "bg-hsl(var(--green-primary)) text-white border-hsl(var(--green-dark)) hover:bg-hsl(var(--green-dark)) shadow-md hover:shadow-lg",
        warning: "bg-hsl(var(--orange-primary)) text-white border-hsl(var(--orange-dark)) hover:bg-hsl(var(--orange-dark)) shadow-md hover:shadow-lg",
        outline: "bg-transparent text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400",
        ghost: "bg-transparent text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-200"
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonCleanProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonCleanVariants> {
  asChild?: boolean
}

const ButtonClean = React.forwardRef<HTMLButtonElement, ButtonCleanProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonCleanVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ButtonClean.displayName = "ButtonClean"

export { ButtonClean, buttonCleanVariants }
