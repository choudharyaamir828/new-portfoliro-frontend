import {
  Environment,
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  Preload,
  Sparkles,
  Stars,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Vignette,
} from '@react-three/postprocessing'
import { useEffect, useRef, useState, Suspense } from 'react'
import type { Group } from 'three'
import { Vector2 } from 'three'

import Loader from '../ui/Loader'
import GridFloor from './GridFloor'
import ParticleField from './ParticleField'

const chromaticOffset = new Vector2(0.0009, 0.0009)

const SceneStage = () => {
  const groupRef = useRef<Group>(null)
  const knotRef = useRef<Group>(null)

  useFrame(({ pointer, clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      const tx = pointer.x * 0.25
      const ty = pointer.y * 0.18
      groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.04
      groupRef.current.rotation.x += (-ty - groupRef.current.rotation.x) * 0.04
    }
    if (knotRef.current) {
      knotRef.current.rotation.y = t * 0.25
      knotRef.current.rotation.x = Math.sin(t * 0.4) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Crystal centerpiece: transmissive glass icosahedron */}
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh position={[0, 0.05, 0]} scale={1.15}>
          <icosahedronGeometry args={[1.05, 1]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.9}
            roughness={0.08}
            ior={1.35}
            chromaticAberration={0.08}
            anisotropy={0.4}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.18}
            color="#bfe2ff"
            attenuationColor="#4b8bbe"
            attenuationDistance={1.2}
            backside
          />
        </mesh>
      </Float>

      {/* Orbiting distorted knot */}
      <group ref={knotRef}>
        <Float speed={0.9} rotationIntensity={0.6} floatIntensity={0.6}>
          <mesh position={[2.05, 0.4, -0.6]} scale={0.55}>
            <torusKnotGeometry args={[1, 0.28, 220, 32]} />
            <MeshDistortMaterial
              color="#ffd43b"
              emissive="#ffb347"
              emissiveIntensity={0.55}
              roughness={0.18}
              metalness={0.55}
              distort={0.28}
              speed={1.4}
            />
          </mesh>
        </Float>
      </group>

      {/* Accent satellite orb */}
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[-2.1, 0.9, -0.4]} scale={0.42}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#7fb3d5"
            emissive="#4b8bbe"
            emissiveIntensity={0.7}
            roughness={0.22}
            metalness={0.85}
          />
        </mesh>
      </Float>

      {/* Background octahedron */}
      <Float speed={0.6} rotationIntensity={0.8} floatIntensity={0.5}>
        <mesh position={[-1.4, -1.1, -2.4]} scale={0.55} rotation={[0.6, 0.3, 0.1]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0d243b"
            emissive="#4b8bbe"
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.18}
          />
        </mesh>
      </Float>

      <Sparkles count={70} scale={[6, 4, 4]} size={2.4} speed={0.35} color="#ffd43b" />
      <Sparkles count={40} scale={[8, 5, 5]} size={1.6} speed={0.25} color="#7fb3d5" />
    </group>
  )
}

const HeroScene = () => {
  const [dpr, setDpr] = useState<number | [number, number]>([1, 2])
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return (
    <Suspense fallback={<Loader centered label="Booting scene" />}>
      <Canvas
        className="h-full min-h-[320px] w-full"
        camera={{ position: [0, 0.4, 6.6], fov: 42 }}
        dpr={dpr}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#060d18']} />
        <fog attach="fog" args={['#060d18', 9, 22]} />

        <ambientLight intensity={0.35} />
        <pointLight color="#4b8bbe" intensity={5.2} position={[-5, 4, 4]} distance={20} decay={1.6} />
        <pointLight color="#ffd43b" intensity={3.2} position={[5, -2, 3]} distance={18} decay={1.6} />
        <pointLight color="#7fb3d5" intensity={2.4} position={[0, 3, -3]} distance={18} decay={1.6} />
        <spotLight
          color="#ffffff"
          intensity={1.4}
          position={[0, 6, 6]}
          angle={0.6}
          penumbra={0.9}
          decay={1.4}
        />

        <Environment preset="night" />
        <PerformanceMonitor onDecline={() => setDpr(1)} />

        <Stars
          radius={50}
          depth={40}
          count={isDesktop ? 2200 : 1000}
          factor={3.2}
          saturation={0}
          fade
          speed={0.6}
        />

        <SceneStage />

        <ParticleField count={isDesktop ? 900 : 400} />
        <GridFloor position={[0, -2.4, 0]} />

        <EffectComposer multisampling={0}>
          <Bloom intensity={1.45} luminanceThreshold={0.12} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            offset={chromaticOffset}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>

        <Preload all />
      </Canvas>
    </Suspense>
  )
}

export default HeroScene
