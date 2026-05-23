import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api/client'
import { endpoints } from '../api/endpoints'
import type { Paginated, ProjectListItem, ProjectQueryParams } from '../api/types'
import { portfolioUsername } from '../utils/constants'

const cleanParams = (params?: ProjectQueryParams) =>
  Object.fromEntries(
    Object.entries({
      username: portfolioUsername || undefined,
      ...(params ?? {}),
    }).filter(([, value]) => value !== undefined && value !== ''),
  )

export const useProjects = (params?: ProjectQueryParams) =>
  useQuery({
    queryKey: ['projects', cleanParams(params)],
    queryFn: () =>
      apiClient.get<Paginated<ProjectListItem>>(endpoints.PROJECTS, {
        params: cleanParams(params),
      }),
    staleTime: 60_000,
  })
