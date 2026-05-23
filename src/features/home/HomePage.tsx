import PageTransition from '../../components/layout/PageTransition'
import FeaturedProjects from './FeaturedProjects'
import Hero from './Hero'
import StatsStrip from './StatsStrip'

const HomePage = () => (
  <PageTransition>
    <main className="relative overflow-hidden">
      <Hero />
      <FeaturedProjects />
      <StatsStrip />
    </main>
  </PageTransition>
)

export default HomePage
