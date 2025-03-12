import axios from "axios"
import config from "../../config.js"

const api = axios.create({
  baseURL: config.api.baseURL,
})

export default api
