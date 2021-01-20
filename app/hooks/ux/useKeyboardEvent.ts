import { useEffect } from "react"

const handlerEvent = (event: KeyboardEvent, callback: Function, key: String) => {
  if (event.key === key) {
    callback()
  }
}

const useKeyboardEvent = (key: String, callback?: Function) => {
  useEffect(() => {
    if (callback) {
      window.addEventListener("keydown", (event) => handlerEvent(event, callback, key))
      return () => {
        window.removeEventListener("keydown", (event) => handlerEvent(event, callback, key))
      }
    }
  }, [])
}

export default useKeyboardEvent
