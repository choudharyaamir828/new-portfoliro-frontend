import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Input from '../../components/ui/Input'
import { cn } from '../../lib/utils/cn'
import { siteConfig } from '../../lib/utils/constants'

const ProjectFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('tech_stack__category') ?? ''
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const currentSearchParam = searchParams.get('search') ?? ''

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (search.trim() === currentSearchParam) {
        return
      }

      const nextParams = new URLSearchParams(searchParams)

      if (search.trim()) {
        nextParams.set('search', search.trim())
      } else {
        nextParams.delete('search')
      }

      if (nextParams.toString() !== searchParams.toString()) {
        setSearchParams(nextParams, { replace: true })
      }
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [currentSearchParam, search, searchParams, setSearchParams])

  const handleCategory = (category: string) => {
    const nextParams = new URLSearchParams(searchParams)

    if (category) {
      nextParams.set('tech_stack__category', category)
    } else {
      nextParams.delete('tech_stack__category')
    }

    setSearchParams(nextParams)
  }

  return (
    <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_22rem] lg:items-end">
      <div className="flex flex-wrap gap-3">
        {siteConfig.techCategories.map((category) => (
          <button
            key={category.value}
            type="button"
            className={cn(
              'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition',
              activeCategory === category.value
                ? 'border-neon-cyan bg-neon-cyan text-bg-base shadow-glow-cyan'
                : 'border-border-glow text-text-secondary hover:border-neon-cyan hover:text-neon-cyan',
            )}
            onClick={() => handleCategory(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-neon-cyan" />
        <Input
          label="Search title"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-11"
        />
      </div>
    </div>
  )
}

export default ProjectFilters
