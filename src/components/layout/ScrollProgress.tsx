import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { damping: 28, stiffness: 220 })

  return (
    <motion.div
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-lime"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress
