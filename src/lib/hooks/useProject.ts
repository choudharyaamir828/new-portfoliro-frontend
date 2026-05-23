import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api/client'
import { endpoints } from '../api/endpoints'
import type { ProjectDetail } from '../api/types'
import { portfolioUsername } from '../utils/constants'

export const useProject = (slug?: string) =>
  useQuery({
    queryKey: ['project', portfolioUsername, slug],
    queryFn: () =>
      apiClient.get<ProjectDetail>(endpoints.PROJECT_DETAIL(slug ?? ''), {
        params: portfolioUsername ? { username: portfolioUsername } : undefined,
      }),
    enabled: Boolean(slug),
  })
