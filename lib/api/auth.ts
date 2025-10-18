// lib/api/auth.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://amen-k4ut.onrender.com"

interface LoginResponse {
  access: string
  refresh: string
  user: {
    id: string
    email: string
    first_name: string
    last_name: string
    username: string
  }
}

interface SignupData {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
}

interface SignupResponse {
  access: string
  refresh: string
  user: {
    id: string
    email: string
    first_name: string
    last_name: string
    username: string
  }
}

async function handleResponse(response: Response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.error || data.detail || "An error occurred")
  }

  return data
}

export const authApi = {
  // User login
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    return handleResponse(response)
  },

  // User signup
  signup: async (data: SignupData): Promise<SignupResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
      }),
    })

    return handleResponse(response)
  },

  // Get current user
  getCurrentUser: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null

    if (!token) {
      throw new Error("No access token found")
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return handleResponse(response)
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    })

    return handleResponse(response)
  },

  // Logout (client-side only - clear tokens)
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      localStorage.removeItem("user")
    }
  },
}