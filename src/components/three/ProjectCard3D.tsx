import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useRef, useState } from 'react'
import type * as THREE from 'three'

import { resolveMediaUrl } from '../../lib/utils/constants'

export type ProjectCard3DProps = {
  image: string
  title: string
}

const ProjectCard3D = ({ image, title }: ProjectCard3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [targetRotation, setTargetRotation] = useState<[number, number]>([0, 0])
  const texture = useTexture(resolveMediaUrl(image) || '/favicon.svg') as THREE.Texture

  useFrame(() => {
    const mesh = meshRef.current

    if (!mesh) {
      return
    }

    const scale = mesh.scale.x + ((hovered ? 1.06 : 1) - mesh.scale.x) * 0.08
    mesh.rotation.x += (targetRotation[0] - mesh.rotation.x) * 0.08
    mesh.rotation.y += (targetRotation[1] - mesh.rotation.y) * 0.08
    mesh.scale.setScalar(scale)
  })

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!event.uv) {
      return
    }

    setTargetRotation([(event.uv.y - 0.5) * 0.3, (event.uv.x - 0.5) * -0.4])
  }

  return (
    <group>
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[2.18, 1.38]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh
        ref={meshRef}
        aria-label={title}
        onPointerMove={handlePointerMove}
        onPointerOut={() => {
          setHovered(false)
          setTargetRotation([0, 0])
        }}
        onPointerOver={() => setHovered(true)}
      >
        <planeGeometry args={[2, 1.22]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  )
}

export default ProjectCard3D
