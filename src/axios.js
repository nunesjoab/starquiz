import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://swapi.co/api/'
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN'

export default instance