import { useEffect, useState } from "react"

export const useKeyboard = () => {
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
  })

  useEffect(() => {
    const keyMap = {
      KeyW: "w",
      KeyA: "a",
      KeyS: "s",
      KeyD: "d",
    }

    const handleKeyDown = (e) => {
      const key = keyMap[e.code]
      if (!key) return
      setKeys((prev) => (prev[key] ? prev : { ...prev, [key]: true }))
    }

    const handleKeyUp = (e) => {
      const key = keyMap[e.code]
      if (!key) return
      setKeys((prev) => (!prev[key] ? prev : { ...prev, [key]: false }))
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return keys
}