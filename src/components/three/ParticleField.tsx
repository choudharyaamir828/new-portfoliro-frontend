import { useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { useMemo, useRef } from 'react'
import type * as THREE from 'three'

export type ParticleFieldProps = {
  count?: number
}

const seeded = (seed: number) => {
  const value = Math.sin(seed) * 10000
  return value - Math.floor(value)
}

const ParticleField = ({ count = 700 }: ParticleFieldProps) => {
  const pointsRef = useRef<THREE.Points>(null)
  const shouldReduceMotion = useReducedMotion()

  const { colors, positions } = useMemo(() => {
    const positionArray = new Float32Array(count * 3)
    const colorArray = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      const radius = 2 + seeded(index + 1) * 10
      const theta = seeded(index + 2) * Math.PI * 2
      const phi = Math.acos(2 * seeded(index + 3) - 1)
      const offset = index * 3

      positionArray[offset] = radius * Math.sin(phi) * Math.cos(theta)
      positionArray[offset + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positionArray[offset + 2] = radius * Math.cos(phi)

      const palette: Array<[number, number, number]> = [
        [0.29, 0.55, 0.75],
        [1.0, 0.83, 0.23],
        [0.5, 0.7, 0.84],
        [0.39, 0.82, 0.63],
      ]
      const c = palette[Math.floor(seeded(index + 4) * palette.length) % palette.length]!
      colorArray[offset] = c[0]
      colorArray[offset + 1] = c[1]
      colorArray[offset + 2] = c[2]
    }

    return { colors: colorArray, positions: positionArray }
  }, [count])

  useFrame(() => {
    const points = pointsRef.current

    if (!points || shouldReduceMotion) {
      return
    }

    points.rotation.y += 0.0008
    points.rotation.x += 0.00025
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        transparent
        opacity={0.85}
        sizeAttenuation
        vertexColors
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

export default ParticleField
