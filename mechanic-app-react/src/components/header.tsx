import { Icon } from "./icon";
import { Dialog } from "./ui/dialog";


export function Header() {

    return (
        <Dialog>
            <head className="flex justify-between h-20 w-full">
                <div className="p-4"> <Icon /> </div>

                <div className="p-4"> My foto </div>
            </head >

        </Dialog>
    )
}