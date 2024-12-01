import { ArrowDown } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";
import { tv, VariantProps } from "tailwind-variants";

const dropdown = tv({
    base: "inline-flex w-full justify-center rounded-md bg-zinc-900 text-zinc-100 inline-flex justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-emerald-800",

    variants: {
        variant: {
            primary: "bg-zinc-900 text-zinc-100 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-emerald-800",
            secondary: "bg-zinc-900 text-zinc-100 hover:bg-black-800"
        },
        size: {
            default: "gap-x-6 ml-2 w-28 px-3 py-2",
            sm: "p-1"
        }

    }
})

type DropDownProps = ComponentProps<"button"> & VariantProps<typeof dropdown> & {
    children: React.ReactNode
    title: string
}

export const DropDown = forwardRef<HTMLButtonElement, DropDownProps>(
    ({ className, children, title, variant, size, ...props }, ref) => {
        const [showPicker, setShowPicker] = useState(false);

        return (
            < div className="relative inline-block text-left" >
                <div>
                    <button
                        type="button"
                        ref={ref}
                        {...props}
                        className={dropdown({ className, size, variant })}
                        onClick={() => setShowPicker(!showPicker)}
                    >
                        {title}
                        <ArrowDown size={18} color="white" />
                    </button>
                </div>

                {showPicker && (
                    <div className="absolute p-2 flex ">
                        {children}
                    </div>
                )}
            </div >

        )
    }
)

