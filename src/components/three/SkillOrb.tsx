import { Float, Html, MeshTransmissionMaterial } from '@react-three/drei'
import { useState } from 'react'

export type SkillOrbProps = {
  category: string
  color: string
  name: string
  onClick?: () => void
  position: [number, number, number]
  proficiency: number
}

const SkillOrb = ({ category, color, name, onClick, position, proficiency }: SkillOrbProps) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Float floatIntensity={0.8} rotationIntensity={0.35} speed={1.5}>
      <group position={position}>
        <mesh
          onClick={(event) => {
            event.stopPropagation()
            onClick?.()
          }}
          onPointerOut={() => setHovered(false)}
          onPointerOver={() => setHovered(true)}
        >
          <sphereGeometry args={[0.22, 32, 32]} />
          <MeshTransmissionMaterial
            color={color}
            thickness={0.65}
            roughness={0.22}
            transmission={0.65}
            chromaticAberration={0.08}
          />
        </mesh>
        <pointLight color={color} intensity={1.3} distance={2.4} />
        {hovered ? (
          <Html center distanceFactor={8}>
            <div className="pointer-events-none min-w-36 rounded-md border border-border-glow bg-bg-elevated/95 px-3 py-2 text-left shadow-glow-cyan backdrop-blur-xl">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-neon-cyan">
                {category}
              </p>
              <p className="mt-1 font-display text-sm font-bold text-text-primary">{name}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-text-muted/25">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                  style={{ width: `${proficiency}%` }}
                />
              </div>
            </div>
          </Html>
        ) : null}
      </group>
    </Float>
  )
}

export default SkillOrb
