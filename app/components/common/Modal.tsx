import { ReactNode } from "react"
import cn from "classnames"

type ModalTypes = {
  onToggle?: Function
  children?: ReactNode
}

const Modal = ({ onToggle, children }: ModalTypes) => (
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
    <section className="sm:fixed sm:bg-white sm:h-auto sm:top-1/4 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-md">
      {children}
    </section>
  </div>
)

export default Modal
