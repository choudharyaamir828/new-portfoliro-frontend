import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import ScrollProgress from './components/layout/ScrollProgress'
import PortfolioRoutes from './routes/router'

const App = () => (
  <div className="min-h-screen overflow-hidden bg-bg-base text-text-primary">
    <ScrollProgress />
    <Navbar />
    <main className="relative">
      <PortfolioRoutes />
    </main>
    <Footer />
  </div>
)

export default App
