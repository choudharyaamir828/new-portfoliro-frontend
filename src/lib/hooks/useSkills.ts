import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api/client'
import { endpoints } from '../api/endpoints'
import type { SkillCategory } from '../api/types'
import { portfolioUsername } from '../utils/constants'

export const useSkills = () =>
  useQuery({
    queryKey: ['skills', portfolioUsername],
    queryFn: () =>
      apiClient.get<SkillCategory[]>(endpoints.SKILLS, {
        params: portfolioUsername ? { username: portfolioUsername } : undefined,
      }),
    staleTime: 60_000,
  })
