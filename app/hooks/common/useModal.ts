import { useState } from "react"

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  const onToggle = () => setIsShowing(!isShowing)

  return {
    isShowing,
    onToggle,
  }
}

export default useModal
