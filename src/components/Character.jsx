"use client"

import { useRef, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { FBXLoader } from "three-stdlib"
import { AnimationMixer } from "three"
import { useKeyboard } from "@/hooks/useKeyboard"

export default function Character() {
  const ref = useRef()
  const mixer = useRef()
  const action = useRef()

  const keys = useKeyboard()

  const fbx = useLoader(FBXLoader, "/models/character.fbx")

  const speed = 0.05

  useEffect(() => {
    if (!fbx) return

    mixer.current = new AnimationMixer(fbx)

    if (fbx.animations.length > 0) {
      action.current = mixer.current.clipAction(fbx.animations[0])
      action.current.play()
    }
  }, [fbx])

  useFrame((state, delta) => {
    if (!ref.current) return

    mixer.current?.update(delta)

    let moving = false

    let x = ref.current.position.x
    let z = ref.current.position.z

    // Movement
    if (keys.w) {
      z -= speed
      ref.current.rotation.y = Math.PI // forward
      moving = true
    }

    if (keys.s) {
      z += speed
      ref.current.rotation.y = 0
      moving = true
    }

    if (keys.a) {
      x -= speed
      ref.current.rotation.y = Math.PI / 2
      moving = true
    }

    if (keys.d) {
      x += speed
      ref.current.rotation.y = -Math.PI / 2
      moving = true
    }

    ref.current.position.set(x, 0, z)

    // Animation control
    if (action.current) {
      if (moving) {
        action.current.paused = false
      } else {
        action.current.paused = true
      }
    }

    // Camera follow
    state.camera.position.x = x
    state.camera.position.z = z + 5
    state.camera.position.y = 3

    state.camera.lookAt(x, 0, z)
  })

  return <primitive ref={ref} object={fbx} scale={0.01} />
}