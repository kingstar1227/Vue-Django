import axios from 'axios'
import moment from 'moment'

const BASE_API_URL = 'http://localhost:8000/api/'

export const AuthService = {
  login(username, password) {
    return axios.post('login/', {
      username,
      password,
    }, {
      baseURL: BASE_API_URL
    })
  },
  signup(data) {
    return axios.post('signup/', data, {
      baseURL: BASE_API_URL
    })
  },
}

export const RecordService = {
  list(page = 1, filters) {
    let apiUrl = `records/?page=${page}`
    if (filters.date) {
      if (filters.date.from) {
        const value = moment(filters.date.from).format('YYYY-MM-DD')
        apiUrl += `&start_date=${value}`
      }
      if (filters.date.to) {
        const value = moment(filters.date.to).format('YYYY-MM-DD')
        apiUrl += `&end_date=${value}`
      }
    }
    if (filters.time) {
      if (filters.time.from) {
        apiUrl += `&start_time=${filters.time.from}`
      }
      if (filters.time.to) {
        apiUrl += `&end_time=${filters.time.to}`
      }
    }
    return axios.get(apiUrl, {
      baseURL: BASE_API_URL
    })
  },
  get(id) {
    return axios.get(`records/${id}/`, {
      baseURL: BASE_API_URL
    })
  },
  create(data) {
    return axios.post(`records/`, data, {
      baseURL: BASE_API_URL
    })
  },
  update(id, data) {
    return axios.put(`records/${id}/`, data, {
      baseURL: BASE_API_URL
    })
  },
  delete(id) {
    return axios.delete(`records/${id}/`, {
      baseURL: BASE_API_URL
    })
  },
}

export const UserService = {
  list(page = 1) {
    return axios.get(`users/?page=${page}`, {
      baseURL: BASE_API_URL
    })
  },
  get(id) {
    return axios.get(`users/${id}/`, {
      baseURL: BASE_API_URL
    })
  },
  create(data) {
    return axios.post(`users/`, data, {
      baseURL: BASE_API_URL
    })
  },
  update(id, data) {
    return axios.put(`users/${id}/`, data, {
      baseURL: BASE_API_URL
    })
  },
  delete(id) {
    return axios.delete(`users/${id}/`, {
      baseURL: BASE_API_URL
    })
  },
}

export const UserConfigService = {
  get() {
    return axios.get('userconfig/', {
      baseURL: BASE_API_URL
    })
  },
  update(data) {
    return axios.put('userconfig/', data, {
      baseURL: BASE_API_URL
    })
  }
}
