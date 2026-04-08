"use client"

import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboard } from "@/hooks/useKeyboard"
import { usePlayerStore } from "@/store/usePlayerStore"

export default function Player() {
  const ref = useRef()
  const keys = useKeyboard()
  const setPosition = usePlayerStore((s) => s.setPosition)

  const speed = 0.3

  useEffect(() => {
    console.log(keys)
  }, [keys])

  useFrame((state) => {
    if (!ref.current) return

    let x = ref.current.position.x
    let z = ref.current.position.z

    if (keys.w) z -= speed
    if (keys.s) z += speed
    if (keys.a) x -= speed
    if (keys.d) x += speed

    ref.current.position.set(x, 0.5, z)
    setPosition([x, 0.5, z])

    // Camera follow
    state.camera.position.x = x
    state.camera.position.z = z + 5
    state.camera.position.y = 3

    state.camera.lookAt(x, 0, z)
  })

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}