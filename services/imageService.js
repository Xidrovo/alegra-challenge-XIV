import axios from 'axios'

const createUnsplashAPI = (accessKey) =>
  axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
      Authorization: `Client-ID ${accessKey}`
    }
  })

export const getImages = async (query, accessKey, pageNumber = 0) => {
  const unsplashAPI = createUnsplashAPI(accessKey)
  try {
    const response = await unsplashAPI.get(`/search/photos`, {
      params: { query, per_page: 6, page: pageNumber }
    })
    const images = response.data.results.map((img) => ({
      description: img.description || img.alt_description,
      url: img.urls.small,
      fullUrl: img.urls.full
    }))
    return images
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error)
    throw error
  }
}
