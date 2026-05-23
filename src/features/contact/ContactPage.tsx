import { Canvas, useFrame } from '@react-three/fiber'
import { Mail, MapPin } from 'lucide-react'
import { useRef } from 'react'
import type * as THREE from 'three'

import PageTransition from '../../components/layout/PageTransition'
import GlassCard from '../../components/ui/GlassCard'
import GlowText from '../../components/ui/GlowText'
import Section from '../../components/ui/Section'
import { useProfile } from '../../lib/hooks/useProfile'
import SocialLinks from '../about/SocialLinks'
import ContactForm from './ContactForm'

const WireSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    const mesh = meshRef.current

    if (!mesh) {
      return
    }

    mesh.rotation.x += 0.003
    mesh.rotation.y += 0.006
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.15, 32, 32]} />
      <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.75} />
    </mesh>
  )
}

const ContactMiniScene = () => (
  <div className="pointer-events-none h-44 max-w-sm opacity-80">
    <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight color="#ff2bd6" intensity={2} position={[2, 2, 2]} />
      <WireSphere />
    </Canvas>
  </div>
)

const ContactPage = () => {
  const { data: profile } = useProfile()

  return (
    <PageTransition>
      <Section
        className="min-h-screen pt-32 grid-bg"
        eyebrow="// 05 / CONTACT"
        heading={
          <GlowText as="h1" className="text-5xl uppercase sm:text-7xl">
            Let&apos;s Build Something
          </GlowText>
        }
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary">
              Send a concise signal about the product, interface, or system you want to build. I
              will reply with the next practical step.
            </p>

            <div className="mt-8 grid gap-4 text-text-secondary">
              {profile?.email ? (
                <a className="flex items-center gap-3 hover:text-neon-cyan" href={`mailto:${profile.email}`}>
                  <Mail className="h-5 w-5 text-neon-magenta" />
                  <span>{profile.email}</span>
                </a>
              ) : null}
              {profile?.location ? (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-neon-magenta" />
                  <span>{profile.location}</span>
                </div>
              ) : null}
            </div>

            <div className="mt-8">
              <SocialLinks profile={profile} />
            </div>

            <div className="mt-12">
              <ContactMiniScene />
            </div>
          </div>

          <GlassCard glow>
            <ContactForm />
          </GlassCard>
        </div>
      </Section>
    </PageTransition>
  )
}

export default ContactPage
