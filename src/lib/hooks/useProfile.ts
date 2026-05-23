import { useQuery } from '@tanstack/react-query'

import { apiClient } from '../api/client'
import { endpoints } from '../api/endpoints'
import type { Profile } from '../api/types'
import { portfolioUsername } from '../utils/constants'

export const useProfile = () =>
  useQuery({
    queryKey: ['profile', portfolioUsername],
    queryFn: () =>
      apiClient.get<Profile>(endpoints.ABOUT, {
        params: portfolioUsername ? { username: portfolioUsername } : undefined,
      }),
  })
