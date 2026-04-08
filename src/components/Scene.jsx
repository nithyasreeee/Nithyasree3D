"use client"

import { Canvas } from "@react-three/fiber"
import Character from "./Character"

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 3, 5] }}
      tabIndex={0}
      onCreated={(state) => {
        state.gl.domElement.focus()
      }}
      onPointerDown={(e) => {
        e.currentTarget.focus()
      }}
    >
      
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Player */}
     <Character />

    </Canvas>
  )
}