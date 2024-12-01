import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CheckCircle2, Circle } from 'lucide-react'
import { tv, type VariantProps } from 'tailwind-variants'

const radioGroupItem = tv({
  base: "group bg-black border border-zinc-900 rounded-lg p-0.5 flex items-center justify-between outline-none hover:border-zinc-800 focus-visible:border-yellow-500 focus-visible:ring-4 ring-pink-500/10 data-[state=checked]:bg-black-500/5 data-[state=checked]:border-emerald-800",
  variants: {
    size: {
      default: 'px-3 py-2 w-28',
      sm: 'px-2 py-1',
      xs: "p-1"
    },
  }
})

type RadioGroupItemsProps = RadioGroupPrimitive.RadioGroupItemProps & VariantProps<typeof radioGroupItem>
export function RadioGroup(props: RadioGroupPrimitive.RadioGroupProps) {
  return (
    <RadioGroupPrimitive.RadioGroup
      {...props}
      className="flex flex-col gap-1 mt-1"
    />
  )
}

export function RadioGroupItem({ className, size, ...props }: RadioGroupItemsProps) {
  return (
    <RadioGroupPrimitive.RadioGroupItem
      {...props}
      className={radioGroupItem({ className, size })}
    />
  )
}

export function RadioGroupIndicator() {
  return (
    <>
      <Circle className="size-4 text-zinc-600 group-data-[state=checked]:hidden" />
      <CheckCircle2 className="size-4 text-emerald-500 hidden group-data-[state=checked]:inline" />
    </>
  )
}
