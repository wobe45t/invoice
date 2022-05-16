import axios from 'axios'
import LocalStorageService from './localstorageservice'


const localStorageService = LocalStorageService.getService()

// Add a request interceptor
axios.interceptors.request.use(
(config) => {
    const token = localStorageService.getAccessToken()
    if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
},
(error) => {
    Promise.reject(error)
}
)

console.log('axios.js ran')
