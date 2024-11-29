import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { GetUserInfo } from '@/assets/api'

type ThemeType = 'light' | 'dark'

export const useThemeStore = defineStore(
	'theme',
	() => {
		const theme = ref<ThemeType>('light')
		const setTheme = (themeType: ThemeType) => {
			theme.value = themeType
			if (themeType === 'dark') {
				document.body.classList.add('dark')
			} else {
				document.body.classList.remove('dark')
			}
		}
		return { theme,setTheme }
	},
	{
		persist: {
			key: 'bookmark-theme',
			storage: localStorage,
		},
	},
)
