import React, { ButtonHTMLAttributes } from "react"
import cn from "classnames"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  textColor?: string
  backgroundColor?: string
  backgroundHoverColor?: string
  onClick?: () => void
}

// TODO: Implement sizes and colors

const Button: React.FC<IButtonProps> = ({
  text,
  textColor = "black",
  backgroundColor = "white",
  backgroundHoverColor = "gray-100",
  onClick,
  ...buttonProps
}) => (
  <button
    className={cn(
      `bg-${backgroundColor}`,
      `text-${textColor}`,
      "px-4",
      "py-2",
      "rounded",
      "font-semibold",
      "antialiased",
      "focus:outline-none",
      `hover:bg-${backgroundHoverColor}`,
      "hover:text-black"
    )}
    onClick={onClick}
    {...buttonProps}
  >
    {text}
  </button>
)

export default Button
