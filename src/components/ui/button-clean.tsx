
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonCleanVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-3",
  {
    variants: {
      variant: {
        default: "bg-white text-hsl(var(--neutral-800)) border-hsl(var(--neutral-300)) hover:bg-hsl(var(--neutral-50)) hover:border-hsl(var(--neutral-400)) shadow-md hover:shadow-lg",
        primary: "bg-hsl(var(--blue-primary)) text-white border-hsl(var(--blue-dark)) hover:bg-hsl(var(--blue-dark)) shadow-lg hover:shadow-xl transform hover:scale-105",
        success: "bg-hsl(var(--green-primary)) text-white border-hsl(var(--green-dark)) hover:bg-hsl(var(--green-dark)) shadow-lg hover:shadow-xl transform hover:scale-105",
        warning: "bg-hsl(var(--orange-primary)) text-white border-hsl(var(--orange-dark)) hover:bg-hsl(var(--orange-dark)) shadow-lg hover:shadow-xl transform hover:scale-105",
        outline: "bg-transparent text-hsl(var(--neutral-700)) border-hsl(var(--neutral-300)) hover:bg-hsl(var(--neutral-50)) hover:border-hsl(var(--neutral-400))",
        ghost: "bg-transparent text-hsl(var(--neutral-700)) border-transparent hover:bg-hsl(var(--neutral-100)) hover:border-hsl(var(--neutral-200))"
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-9 rounded-lg px-5 text-xs",
        lg: "h-14 rounded-xl px-10 text-base font-black",
        icon: "h-12 w-12",
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
