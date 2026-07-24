import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'

/**
 * Send image to /predict endpoint.
 * @param {File} file  - image file
 * @param {string} model - 'vit' | 'efficientnetv2'
 * @returns {Promise<{ class_label: string, confidence: number, model_used: string }>}
 */
export async function predictSpecies(file, model = 'vit') {
  const formData = new FormData()
  formData.append('file', file)

  const response = await axios.post(`${BASE_URL}/predict`, formData, {
    params: { model },
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}