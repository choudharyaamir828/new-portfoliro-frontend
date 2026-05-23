import { Download, Mail, MapPin } from 'lucide-react'

import PageTransition from '../../components/layout/PageTransition'
import ErrorState from '../../components/ui/ErrorState'
import GlassCard from '../../components/ui/GlassCard'
import GlowText from '../../components/ui/GlowText'
import Loader from '../../components/ui/Loader'
import NeonButton from '../../components/ui/NeonButton'
import Section from '../../components/ui/Section'
import { useProfile } from '../../lib/hooks/useProfile'
import { resolveMediaUrl, siteConfig } from '../../lib/utils/constants'
import SocialLinks from './SocialLinks'

const AboutPage = () => {
  const { data: profile, error, isLoading, refetch } = useProfile()

  if (isLoading) {
    return <Loader centered label="Loading profile" />
  }

  if (error || !profile) {
    return (
      <PageTransition>
        <section className="min-h-screen px-4 pt-32 sm:px-6 lg:px-8">
          <ErrorState onRetry={() => void refetch()} />
        </section>
      </PageTransition>
    )
  }

  const imageUrl = resolveMediaUrl(profile.profile_image)
  const resumeUrl = resolveMediaUrl(profile.resume)
  const bio = profile.bio || siteConfig.defaultBio

  return (
    <PageTransition>
      <Section
        className="min-h-screen pt-32 grid-bg"
        eyebrow="// 01 / ABOUT"
        heading={
          <GlowText as="h1" className="text-5xl sm:text-7xl">
            About Signal
          </GlowText>
        }
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <GlassCard glow className="relative overflow-hidden p-3">
            <div className="pointer-events-none absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-neon-cyan" />
            <div className="pointer-events-none absolute right-4 top-4 h-10 w-10 border-r-2 border-t-2 border-neon-cyan" />
            <div className="pointer-events-none absolute bottom-4 left-4 h-10 w-10 border-b-2 border-l-2 border-neon-cyan" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-neon-cyan" />
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={profile.full_name}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-md object-cover"
              />
            ) : (
              <div className="grid aspect-[4/5] place-items-center rounded-md bg-bg-elevated font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
                Profile Image
              </div>
            )}
          </GlassCard>

          <div>
            <h2 className="font-display text-4xl font-bold text-text-primary">{profile.full_name}</h2>
            <p className="mt-2 font-mono text-sm uppercase tracking-[0.2em] text-neon-cyan">
              {profile.title || siteConfig.defaultTitle}
            </p>
            <p className="mt-8 text-lg leading-9 text-text-secondary first-letter:float-left first-letter:mr-3 first-letter:bg-gradient-to-br first-letter:from-neon-cyan first-letter:to-neon-magenta first-letter:bg-clip-text first-letter:font-display first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-transparent">
              {bio}
            </p>

            <div className="mt-8 grid gap-4 text-text-secondary sm:grid-cols-2">
              {profile.location ? (
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-neon-magenta" />
                  <span>{profile.location}</span>
                </div>
              ) : null}
              {profile.email ? (
                <a className="flex items-center gap-3 hover:text-neon-cyan" href={`mailto:${profile.email}`}>
                  <Mail className="h-5 w-5 text-neon-magenta" />
                  <span>{profile.email}</span>
                </a>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <SocialLinks profile={profile} />
              {resumeUrl ? (
                <NeonButton href={resumeUrl} variant="secondary" leftIcon={<Download className="h-4 w-4" />}>
                  Download CV
                </NeonButton>
              ) : null}
            </div>
          </div>
        </div>
      </Section>
    </PageTransition>
  )
}

export default AboutPage
