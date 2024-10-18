import axios from 'axios'
import { useDiscrete } from '@/assets/utils/hooks'

const baseUrl = import.meta.env.MODE == 'development' ? 'http://localhost:3000' : ''

const request = axios.create({
	baseURL: baseUrl + '/api',
	timeout: 600000,
	method: 'POST',
	
})

request.interceptors.request.use((config) => {
	if (config.method?.toLocaleUpperCase() == 'POST') {
		
	}
	return config
})

const discretes = useDiscrete()
request.interceptors.response.use(
	(response) => {
		if (!response.data) {
			return Promise.reject(response.data)
		}
		
		if (response.data.code == 200|| response.data.code == 201) {
			return response.data
		} else {
			discretes.message.error(response.data.msg)
			return Promise.reject(response.data)
		}
	},
	(err) => {
		return Promise.reject(err)
	},
)
export default request
