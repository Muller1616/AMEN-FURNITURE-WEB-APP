// lib/api/auth.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-deployed-backend.onrender.com/api"

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    username: string
    role: "user" | "admin"
  }
}

interface SignupData {
  email: string
  password: string
  username: string
  firstName: string
  lastName: string
}

interface AdminVerificationResponse {
  verified: boolean
  adminUrl: string
}

async function handleResponse(response: Response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.error || "An error occurred")
  }

  return data
}

export const authApi = {
  // User login
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    return handleResponse(response)
  },

  // User signup
  signup: async (data: SignupData): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
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

  // Admin verification
  verifyAdmin: async (email: string): Promise<AdminVerificationResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-admin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })

    return handleResponse(response)
  },

  // Get current user
  getCurrentUser: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null

    const response = await fetch(`${API_BASE_URL}/auth/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return handleResponse(response)
  },

  // Logout
  logout: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null

    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return handleResponse(response)
  },
}