// Admin API functions for football app
const API_BASE_URL = 'http://localhost:5000'

// Types
export interface Match {
  _id: string
  homeTeam: string | { _id: string; name: string }
  awayTeam: string | { _id: string; name: string }
  venue?: string | {
    stadium: string
    state: string
  }
  state?: string
  date?: string
  time?: string
  referee?: string | {
    name: string
  }
  season?: string
  matchday?: number
  ticketPrice?: string
  capacity?: number
  description?: string
  score?: {
    home: number
    away: number
  }
  homeScore?: number
  awayScore?: number
  currentMinute?: number
  status: 'upcoming' | 'live' | 'finished'
  isLive?: boolean
  allowBetting?: boolean
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Team {
  _id: string
  name: string
  shortName?: string
  state?: string
  league?: string
}

export interface Player {
  _id: string
  name: string
  position?: string
  teamId?: string
  jerseyNumber?: number
}

export interface CreateMatchData {
  homeTeam: string
  awayTeam: string
  venue: {
    stadium: string
    state: string
  }
  date: string
  time?: string
  referee: {
    name: string
  }
  season: string
  matchday: number
  description?: string
  status?: string
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

// MATCH API FUNCTIONS
export const matchAPI = {
  // Get all matches
  getAll: async (): Promise<{ success: boolean; data: Match[] }> => {
    const response = await fetch(`${API_BASE_URL}/api/matches/matches`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  // Get match by ID
  getById: async (id: string): Promise<{ success: boolean; data: Match }> => {
    const response = await fetch(`${API_BASE_URL}/api/matches/${id}`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  // Create new match
  create: async (matchData: CreateMatchData): Promise<{ success: boolean; data: Match }> => {
    const response = await fetch(`${API_BASE_URL}/api/matches/creatematches`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(matchData)
    })
    return handleResponse(response)
  },

  // Update match
  update: async (id: string, matchData: Partial<Match>): Promise<{ success: boolean; data: Match }> => {
    const response = await fetch(`${API_BASE_URL}/api/matches/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(matchData)
    })
    return handleResponse(response)
  },

  // Delete match
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/matches/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  // Update live match
  updateLive: async (id: string, liveData: {
    homeScore: number
    awayScore: number
    currentMinute: number
    status: string
  }): Promise<{ success: boolean; data: Match }> => {
    const response = await fetch(`${API_BASE_URL}/api/matches/${id}/live`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(liveData)
    })
    return handleResponse(response)
  }
}

// TEAM API FUNCTIONS
export const teamAPI = {
  // Get all teams
  getAll: async (): Promise<{ success: boolean; data: Team[] }> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/teams`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  // Create new team
  create: async (teamData: Partial<Team>): Promise<{ success: boolean; data: Team }> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/teams`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(teamData)
    })
    return handleResponse(response)
  }
}

// PLAYER API FUNCTIONS
export const playerAPI = {
  // Get all players
  getAll: async (): Promise<{ success: boolean; data: Player[] }> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/players`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  // Get players by team
  getByTeam: async (teamId: string): Promise<{ success: boolean; data: Player[] }> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/players/team/${teamId}`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  // Create new player
  create: async (playerData: Partial<Player>): Promise<{ success: boolean; data: Player }> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/players`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(playerData)
    })
    return handleResponse(response)
  }
}

// AUTH API FUNCTIONS
export const authAPI = {
  // Admin login
  login: async (credentials: { email: string; password: string }): Promise<{
    success: boolean
    token?: string
    admin?: any
    message?: string
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    return handleResponse(response)
  },

  // Get current admin profile
  getProfile: async (): Promise<{ success: boolean; data: any }> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/profile`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  },

  // Logout
  logout: () => {
    localStorage.removeItem('admin_token')
    window.location.href = '/admin/login'
  }
}

// STATISTICS API FUNCTIONS
export const statsAPI = {
  // Get dashboard statistics
  getDashboard: async (): Promise<{
    success: boolean
    data: {
      totalMatches: number
      liveMatches: number
      upcomingMatches: number
      finishedMatches: number
      totalTeams: number
      totalPlayers: number
    }
  }> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
      headers: getAuthHeaders()
    })
    return handleResponse(response)
  }
}

export default {
  match: matchAPI,
  team: teamAPI,
  player: playerAPI,
  auth: authAPI,
  stats: statsAPI
}
