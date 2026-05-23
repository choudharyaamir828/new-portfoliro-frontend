import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { apiClient } from '../api/client'
import { endpoints } from '../api/endpoints'
import type { ContactInput, ContactMessage } from '../api/types'
import { portfolioUsername } from '../utils/constants'

export const useContactMutation = (
  options?: UseMutationOptions<ContactMessage, unknown, ContactInput>,
) =>
  useMutation({
    mutationFn: (input: ContactInput) =>
      apiClient.post<ContactMessage, ContactInput>(endpoints.CONTACT, input, {
        params: portfolioUsername ? { username: portfolioUsername } : undefined,
      }),
    ...options,
  })
