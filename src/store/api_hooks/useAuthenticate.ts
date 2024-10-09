// src/store/hooks/useAuthenticate.ts

import useAuthStore from './useAuthStore'
import { useCallback } from 'react'
import { SigninBody } from '@/interfaces'

/**
 * Custom hook that manages user authentication.
 *
 * @returns {object} - Contains the authentication state and the login function.
 */
const useAuthenticate = () => {
  const { data, loading, error, success, authenticate } = useAuthStore()

  /**
   * Initiates the login process by sending the user's email and password.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   */
  const login = useCallback(
    (email: string, password: string) => {
      const signinData: SigninBody = { email, password }
      authenticate(signinData)
    },
    [authenticate]
  )

  return { data, loading, error, success, login }
}

export default useAuthenticate
