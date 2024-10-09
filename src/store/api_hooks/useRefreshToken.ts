import COOKIE_KEYS from '@/constants/cookieKeys'
import { getCookie, setCookie } from '@/utils/cookieHandler'
import axios from 'axios'
import { useCallback } from 'react'
import { create } from 'zustand'

/**
 * Interface for the refresh token response from the API.
 * Assuming the API returns a new accessToken and other metadata.
 */
interface TokenResponse {
  accessToken: string
  refreshToken: string // If the API also returns a new refresh token
}

/**
 * Interface for the Zustand state to manage the token refresh process.
 */
interface TokenState {
  data: TokenResponse | null
  loading: boolean
  error: string | null
  success: boolean | null
  refreshAccessToken: () => Promise<void>
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL

/**
 * Zustand store for managing the token refresh state, including loading,
 * success/error states, and token data.
 */
export const useTokenStore = create<TokenState>((set) => ({
  data: null, // Holds the refreshed token data
  loading: false, // Indicates loading state during the refresh process
  error: null, // Holds any error messages
  success: null, // Indicates whether the refresh was successful

  /**
   * Function to refresh the access token by sending the refresh token to the API.
   */
  refreshAccessToken: async () => {
    console.log('Starting token refresh...')
    set({ loading: true, error: null, success: null })

    const refreshToken = getCookie(COOKIE_KEYS.REFRESH_TOKEN)
    console.log('Found refreshToken:', refreshToken)

    if (!refreshToken) {
      set({ error: 'No refresh token found', loading: false, success: false })
      return
    }

    try {
      // Send the POST request to refresh the access token
      const JSONresponse = await axios.post(`${BASE_URL}/api/token/refresh`, {
        refreshToken, // Sending the refresh token as the body
      })

      const response = JSONresponse.data
      console.log('API Response:', JSON.stringify(response))

      setCookie(COOKIE_KEYS.ACCESS_TOKEN, response.accessToken)
      // Update the store with the new token data
      set({ data: response, loading: false, success: true })
    } catch (err) {
      console.error('Error refreshing token:', err)
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
        success: false,
      })
    }
  },
}))

/**
 * Custom hook to refresh the access token. It wraps Zustand's token store and
 * provides a memoized function to trigger the token refresh.
 */
export const useRefreshToken = () => {
  const { data, loading, error, success, refreshAccessToken } = useTokenStore()

  /**
   * Memoized function to refresh the token using Zustand's store method.
   */
  const refresh = useCallback(() => {
    refreshAccessToken()
  }, [refreshAccessToken])

  // Return state and the refresh function
  return { data, loading, error, success, refresh }
}
