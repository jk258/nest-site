import axios from 'axios'
import { useDiscrete } from '@/assets/utils/hooks'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const baseUrl = import.meta.env.MODE == 'development' ? 'http://localhost:3000' : ''

const request = axios.create({
	baseURL: baseUrl + '/api',
	timeout: 600000,
	method: 'POST',
	
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization ='Bearer '+ userStore.token
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
      
			return Promise.reject(response.data)
		}
	},
  (err) => {
    if (err.response.data && [400, 401].includes(err.response.data.code)) {
      discretes.message.error(err.response.data.message)
      if (err.response.data.code == 401) {
        const userStore = useUserStore()
        userStore.setToken('')
        router.push({
					path: '/login',
				})
      }
		}
    

		return Promise.reject(err)
	},
)
export default request
