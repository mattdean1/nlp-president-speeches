import axios from 'axios';

const BASE_URL = 'http://localhost:8000'

const url = (path) => {
  return BASE_URL + path
}


const api = {
  getSpeeches: async () => {
    const res = await axios.get(url("/speeches"))
    return res.data
  },

  getPresidents: async () => {
    const res = await axios.get(url("/presidents"))
    return res.data
  },

  getMatches: async () => {
    const res = await axios.get(url("/matches"))
    return res.data
  }
}


export default api;
