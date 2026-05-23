import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'

import type { ApiResponse } from './types'

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL is not configured.')
}

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const unwrapResponse = (response: AxiosResponse<ApiResponse<unknown>>) => {
  const payload = response.data

  if (payload?.success === true) {
    return payload.data
  }

  return Promise.reject(payload?.errors ?? new Error('API request failed.'))
}

const unwrapError = (error: AxiosError<ApiResponse<unknown>>) => {
  const errors = error.response?.data?.errors
  return Promise.reject(errors ?? error)
}

axiosInstance.interceptors.response.use(
  // Axios' interceptor type does not model returning unwrapped data.
  unwrapResponse as unknown as (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
  unwrapError,
)

export const apiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<unknown, T>(url, config),
  post: <TResponse, TBody>(url: string, body: TBody, config?: AxiosRequestConfig) =>
    axiosInstance.post<unknown, TResponse>(url, body, config),
}
