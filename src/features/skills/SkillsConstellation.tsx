import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { useMemo } from 'react'

import SkillOrb from '../../components/three/SkillOrb'
import GlassCard from '../../components/ui/GlassCard'
import type { SkillCategory } from '../../lib/api/types'
import { makeElementId } from '../../lib/utils/constants'

export type SkillsConstellationProps = {
  categories: SkillCategory[]
}

const colors = ['#00f0ff', '#ff2bd6', '#7c3aed', '#a3ff12']

const seeded = (seed: number) => {
  const value = Math.sin(seed * 78.233) * 43758.5453
  return value - Math.floor(value)
}

const SkillsConstellation = ({ categories }: SkillsConstellationProps) => {
  const orbs = useMemo(
    () =>
      categories.flatMap((category, categoryIndex) => {
        const clusterAngle = (categoryIndex / Math.max(categories.length, 1)) * Math.PI * 2
        const clusterRadius = 2.2
        const clusterX = Math.cos(clusterAngle) * clusterRadius
        const clusterZ = Math.sin(clusterAngle) * clusterRadius
        const color = colors[categoryIndex % colors.length] ?? '#00f0ff'

        return category.skills.map((skill, skillIndex) => {
          const seed = category.id * 100 + skill.id
          const offsetX = (seeded(seed) - 0.5) * 1.2
          const offsetY = (seeded(seed + 1) - 0.5) * 1.3
          const offsetZ = (seeded(seed + 2) - 0.5) * 1.2

          return {
            category,
            color,
            key: `${category.id}-${skill.id}-${skillIndex}`,
            position: [clusterX + offsetX, offsetY, clusterZ + offsetZ] as [number, number, number],
            skill,
          }
        })
      }),
    [categories],
  )

  const handleSkillClick = (categoryName: string) => {
    document.getElementById(makeElementId(categoryName))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <GlassCard glow className="h-[340px] overflow-hidden p-0">
      <Canvas camera={{ position: [0, 0.5, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#05060f']} />
        <ambientLight intensity={0.35} />
        <pointLight color="#00f0ff" intensity={2.2} position={[-4, 3, 4]} />
        <pointLight color="#ff2bd6" intensity={1.8} position={[4, -2, 3]} />
        {orbs.map(({ category, color, key, position, skill }) => (
          <SkillOrb
            key={key}
            category={category.name}
            color={color}
            name={skill.name}
            position={position}
            proficiency={skill.proficiency}
            onClick={() => handleSkillClick(category.name)}
          />
        ))}
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.25} />
        <Preload all />
      </Canvas>
    </GlassCard>
  )
}

export default SkillsConstellation
