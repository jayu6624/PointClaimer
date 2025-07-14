const API_BASE_URL = "http://localhost:5000/api"

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API call failed:", error)
    throw error
  }
}

export const getUsers = () => apiCall("/users")

export const addUser = (name) =>
  apiCall("/users", {
    method: "POST",
    body: JSON.stringify({ name }),
  })

export const claimPoints = (userId) =>
  apiCall("/claims", {
    method: "POST",
    body: JSON.stringify({ userId }),
  })

export const getClaims = () => apiCall("/claims")
