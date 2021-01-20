import { ReactNode } from "react"
import Image from "next/image"
import cn from "classnames"

import useKeyboardEvent from "app/hooks/ux/useKeyboardEvent"

type ModalTypes = {
  onClose?: () => void
  children?: ReactNode
}

const Modal = ({ onClose, children }: ModalTypes) => {
  useKeyboardEvent("Escape", onClose)

  return (
    <div
      className={cn(
        "z-10",
        "top-0",
        "bg-black",
        "mt-20",
        "pt-5",
        "fixed",
        "w-full",
        "h-full",
        "sm:z-50",
        "sm:mt-0",
        "sm:top-0",
        "sm:left-0",
        "sm:w-full",
        "sm:h-full",
        "sm:bg-gray-400",
        "sm:bg-opacity-80",
        "sm:block"
      )}
    >
      <section
        className={cn(
          "sm:fixed",
          "sm:bg-white",
          "sm:h-auto",
          "sm:top-80",
          "sm:left-1/2",
          "sm:transform",
          "sm:-translate-x-1/2",
          "sm:-translate-y-1/2",
          "sm:rounded-md"
        )}
      >
        <button
          onClick={onClose}
          className={cn("fixed", "top-2", "right-4", "cursor-pointer", "outline-none")}
        >
          <Image src="/close.png" alt="Close modal" width="12" height="12" />
        </button>
        <div className={cn("flex", "flex-col", "content-center", "items-center", "mx-10", "my-10")}>
          {children}
        </div>
      </section>
    </div>
  )
}

export default Modal
