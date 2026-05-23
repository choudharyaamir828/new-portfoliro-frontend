import GlowText from '../../components/ui/GlowText'
import Section from '../../components/ui/Section'
import PageTransition from '../../components/layout/PageTransition'
import ProjectFilters from './ProjectFilters'
import ProjectGrid from './ProjectGrid'

const ProjectsPage = () => (
  <PageTransition>
    <Section
      className="min-h-screen pt-32 grid-bg"
      eyebrow="// 03 / ARCHIVE"
      heading={
        <GlowText as="h1" className="text-5xl sm:text-7xl">
          Project Archive
        </GlowText>
      }
    >
      <ProjectFilters />
      <ProjectGrid />
    </Section>
  </PageTransition>
)

export default ProjectsPage
