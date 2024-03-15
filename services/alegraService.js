import axios from 'axios'

const alegraAPI = (accessKey) =>
  axios.create({
    baseURL: 'https://api.alegra.com/api/',
    headers: {
      Authorization: `Basic ${accessKey}`
    }
  })

export const getSellers = async (accessKey) => {
  const api = alegraAPI(accessKey)
  try {
    const response = await api.get(`v1/sellers`, {
      params: { status: 'active' }
    })
    return response.data.map(({ status, ...data }) => data)
  } catch (error) {
    console.error('Error fetching sellers from Alegra:', error)
    throw error
  }
}
