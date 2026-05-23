import PageTransition from '../../components/layout/PageTransition'
import ErrorState from '../../components/ui/ErrorState'
import GlowText from '../../components/ui/GlowText'
import Loader from '../../components/ui/Loader'
import Section from '../../components/ui/Section'
import { useSkills } from '../../lib/hooks/useSkills'
import SkillCategoryBlock from './SkillCategoryBlock'
import SkillsConstellation from './SkillsConstellation'

const SkillsPage = () => {
  const { data: categories, error, isLoading, refetch } = useSkills()

  if (isLoading) {
    return <Loader centered label="Loading skills" />
  }

  if (error || !categories) {
    return (
      <PageTransition>
        <section className="min-h-screen px-4 pt-32 sm:px-6 lg:px-8">
          <ErrorState onRetry={() => void refetch()} />
        </section>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Section
        className="min-h-screen pt-32 grid-bg"
        eyebrow="// 04 / SKILLS"
        heading={
          <GlowText as="h1" className="text-5xl sm:text-7xl">
            Skill Constellation
          </GlowText>
        }
      >
        <SkillsConstellation categories={categories} />
        <div className="mt-16 grid gap-8">
          {categories.map((category) => (
            <SkillCategoryBlock key={category.id} category={category} />
          ))}
        </div>
      </Section>
    </PageTransition>
  )
}

export default SkillsPage
