import * as DialogPrimitive from '@radix-ui/react-dialog'

export function Dialog(props: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Dialog {...props} />
}

export function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
  return <DialogPrimitive.DialogTrigger {...props} />
}

export function DialogClose(props: DialogPrimitive.DialogCloseProps) {
  return <DialogPrimitive.DialogClose {...props} />
}

export function DialogPortal(props: DialogPrimitive.DialogPortalProps) {
  return <DialogPrimitive.DialogPortal {...props} />
}

export function DialogOverlay(props: DialogPrimitive.DialogOverlayProps) {
  return (
    <DialogPrimitive.DialogOverlay
      {...props}
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm"
    />
  )
}

export function DialogContent(props: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.DialogContent
        {...props}
        className="fixed z-[9999] right-0 top-0 bottom-0 w-[400px] h-screen border-l border-zinc-900 bg-zinc-950 p-10 "
      />
    </DialogPortal>
  )
}

export function DialogTitle(props: DialogPrimitive.DialogTitleProps) {
  return (
    <DialogPrimitive.DialogTitle {...props} className="text-sm mt-1 font-semibold p-1" />
  )
}

export function DialogDescription(
  props: DialogPrimitive.DialogDescriptionProps
) {
  return (
    <DialogPrimitive.DialogDescription
      {...props}
      className="text-zinc-400 text-base leading-relaxed"
    />
  )
}
