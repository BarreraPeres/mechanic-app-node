import { forwardRef, type ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2',

  variants: {
    variant: {
      primary: "bg-emerald-800 text-zinc-300 hover:bg-emerald-900 ring-emerald-950",
      secondary: 'bg-gradient-to-r from-zinc-900 to-emerald-900 text-zinc-50',
    },

    size: {
      default: 'px-4 py-2.5',
      sm: 'px-3 py-1.5',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={button({ variant, size, className })}
      />
    )
  }
)

Button.displayName = 'Button'
