import axios from 'axios'
import { uuid } from 'vue-uuid'

let apiInstance = null

const getAlegraAPIInstance = (accessKey) => {
  if (!apiInstance) {
    apiInstance = alegraAPI(accessKey)
  }
  return apiInstance
}

const alegraAPI = (accessKey) =>
  axios.create({
    baseURL: 'https://api.alegra.com/api/',
    headers: {
      Authorization: `Basic ${accessKey}`
    }
  })

export const getSellers = async (accessKey) => {
  const api = getAlegraAPIInstance(accessKey)
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

/**
 * Service that creates an invoice and uses an input which contains an array of values
 *
 * @param {Object[]} items - El objeto de entrada para la función.
 * @param {number} items.id - El ID único.
 * @param {string} items.name - El nombre.
 * @param {string} items.description - La descripción.
 * @param {number} items.prices - El precio.
 * @param {number} items.quantity - La cantidad.
 */
export const createInvoice = async (accessKey, items, sellerId) => {
  const api = getAlegraAPIInstance(accessKey)
  const url = 'v1/invoices/'
  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)
  const data = {
    status: 'open',
    date: formateDate(today),
    dueDate: formateDate(tomorrow),
    seller: sellerId,
    client: uuid.v1(),
    items: items
  }
  try {
    const response = await api.post(url, data)
    console.log('Invoice Created:', { status: 200, ...response.data })
    return { status: 200, ...response.data }
  } catch (error) {
    console.error(
      'Error creating invoice:',
      error.response ? error.response.data : error.message
    )
    throw new Error(error.response ? error.response.data : error.message)
  }
}

const formateDate = (date) => {
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
