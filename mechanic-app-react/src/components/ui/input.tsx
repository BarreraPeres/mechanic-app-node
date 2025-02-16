import { forwardRef, type ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        'p-4 w-full caret-green-800 focus:border-green-800 focus:outline-green-800  focus:ring-green-500 bg-black border border-zinc-900 rounded-lg placeholder-zinc-400 outline-none text-sm hover:bg-zinc-800 ring-zinc-900',
        props.className
      )}
    />
  )
})

Input.displayName = 'Input'
