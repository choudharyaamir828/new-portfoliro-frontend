import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import type { ProjectImage } from '../../lib/api/types'
import { resolveMediaUrl } from '../../lib/utils/constants'

export type ProjectGalleryProps = {
  images: ProjectImage[]
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const currentImage = activeIndex !== null ? images[activeIndex] : undefined

  const close = useCallback(() => setActiveIndex(null), [])
  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index === null ? index : (index - 1 + images.length) % images.length))
  }, [images.length])
  const showNext = useCallback(() => {
    setActiveIndex((index) => (index === null ? index : (index + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (activeIndex === null) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }

      if (event.key === 'ArrowLeft') {
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, close, showNext, showPrevious])

  if (images.length === 0) {
    return null
  }

  const lightbox = (
    <AnimatePresence>
      {currentImage ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-bg-base/95 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-md border border-border-glow text-neon-cyan hover:border-neon-magenta hover:text-neon-magenta"
            onClick={close}
            aria-label="Close gallery"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md border border-border-glow text-neon-cyan hover:border-neon-magenta hover:text-neon-magenta"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <motion.img
            key={currentImage.id}
            src={resolveMediaUrl(currentImage.image)}
            alt={currentImage.caption || 'Project gallery image'}
            className="max-h-[82vh] rounded-lg border border-border-glow object-contain shadow-glow-cyan"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-md border border-border-glow text-neon-cyan hover:border-neon-magenta hover:text-neon-magenta"
            onClick={showNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          {currentImage.caption ? (
            <p className="absolute bottom-5 px-4 text-center font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">
              {currentImage.caption}
            </p>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )

  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-neon-cyan">
        // GALLERY
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            className="group overflow-hidden rounded-lg border border-border-glow bg-bg-elevated text-left transition hover:border-neon-cyan hover:shadow-glow-cyan"
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={resolveMediaUrl(image.image)}
              alt={image.caption || 'Project gallery image'}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>
      {createPortal(lightbox, document.body)}
    </section>
  )
}

export default ProjectGallery
