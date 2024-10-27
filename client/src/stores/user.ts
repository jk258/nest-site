import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetUserInfo } from '@/assets/api'

export const useUserStore = defineStore(
	'user',
	() => {
    const token = ref('')
    const userInfo = ref<{
      id: number,
      username: string
      role: number
    } | null>(null)
		const setToken = (tokenStr: string) => {
      token.value = tokenStr
      if (tokenStr) {
        GetUserInfo().then(res => {
          userInfo.value = res.data
        })
      }
    }
		return { token,  setToken, userInfo }
	},
	{
		persist: {
			key: 'bookmark-user-tore',
			storage: sessionStorage,
		},
	},
)
