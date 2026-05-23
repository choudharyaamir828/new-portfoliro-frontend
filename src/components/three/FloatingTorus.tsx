import { MeshDistortMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import type * as THREE from 'three'

export type FloatingTorusProps = {
  color?: string
  distort?: number
  position?: [number, number, number]
  scale?: number
  speed?: number
}

const FloatingTorus = ({
  color = '#63f3ff',
  distort = 0.3,
  position = [0, 0, 0],
  scale = 1,
  speed = 1,
}: FloatingTorusProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const shouldReduceMotion = useReducedMotion()

  useFrame(({ mouse }) => {
    const mesh = meshRef.current

    if (!mesh || shouldReduceMotion) {
      return
    }

    mesh.rotation.x += 0.0025 * speed
    mesh.rotation.y += 0.0045 * speed
    mesh.position.x = position[0] + mouse.x * 0.35
    mesh.position.y = position[1] + mouse.y * 0.2
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <MeshDistortMaterial
        color={color}
        distort={distort}
        emissive={color}
        emissiveIntensity={0.7}
        roughness={0.18}
        metalness={0.45}
        speed={1.5 * speed}
      />
    </mesh>
  )
}

export default FloatingTorus
