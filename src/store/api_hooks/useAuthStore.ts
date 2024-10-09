// src/store/hooks/useAuthStore.ts

import { create } from 'zustand';
import axios from 'axios';
import { AuthResponse, ResponseState, SigninBody } from '@/interfaces';  // Import your interfaces

/**
 * AuthState defines the state structure for authentication.
 * It extends the generic ResponseState to manage API state
 * and uses the AuthResponse for the token data.
 */
interface AuthState extends ResponseState<AuthResponse> {
  /**
   * Function to authenticate the user.
   * Accepts an object of type SigninBody (email, password) and performs the API call.
   * @param body - Object containing the email and password for authentication.
   * @returns Promise<void>
   */
  authenticate: (body: SigninBody) => Promise<void>;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;

/**
 * useAuthStore hook for managing authentication state.
 * Provides access to tokens (accessToken, refreshToken), and handles loading, success, and error states.
 */
const useAuthStore = create<AuthState>((set) => ({
  data: null,   // Stores accessToken and refreshToken after successful authentication
  loading: false, // Loading state during API call
  error: null,   // Stores any error message that occurs during the authentication process
  success: null, // Success state, true if authentication is successful

  /**
   * authenticate: Function to handle user sign-in.
   * Makes a POST request to the authentication API endpoint with user credentials (email, password).
   * On success, stores the accessToken and refreshToken in the state.
   * On failure, updates the error and success state.
   * 
   * @param body - SigninBody object containing the user's email and password
   */
  authenticate: async (body: SigninBody) => {
    // Reset state and set loading to true
    set({ loading: true, error: null, success: null, data: null });

    try {
      // Axios configuration for headers
      const CONF = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Make a POST request to authenticate the user
      const response = await axios.post(`${BASE_URL}/api/authenticate`, body, CONF);
      const { status, data } = response;

      // If authentication is successful, update state with accessToken and refreshToken
      if (status === 200) {
        const { accessToken, refreshToken }: AuthResponse = data;
        set({
          data: { accessToken, refreshToken },
          loading: false,
          success: true,
        });
      } else {
        // Handle unsuccessful authentication (non-200 status)
        set({
          error: data.message || 'Authentication failed',
          loading: false,
          success: false,
        });
      }
    } catch (err) {
      // Handle errors from the API request
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
        success: false,
      });
    }
  },
}));

export default useAuthStore;
