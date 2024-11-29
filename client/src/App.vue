<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { NButton, NConfigProvider, NIcon, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { useThemeStore, useUserStore } from '@/stores'
import Logout from '@/components/icons/Logout.vue'
import { UserRole } from '@/assets/utils/utils'

const router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()
const goUserlist = () => {
	if (userStore.userInfo?.role === UserRole.admin) {
		router.push({
			path: '/userlist',
		})
	}
}
const logout = () => {
	userStore.setToken('')
	router.replace({
		path: '/',
	})
}
</script>

<template>
	<n-config-provider :theme="themeStore.theme == 'dark' ? darkTheme : null" :locale="zhCN" :date-locale="dateZhCN">
		<div class="w-[960px] m-auto">
			<header class="h-20 flex justify-between items-center">
				<router-link class="flex items-center" to="/" replace>
					<img src="/favicon.ico" class="w-12 h-12" alt="书签" />
					<span class="text-fontSizeLarge text-primaryColor ml-2">书签</span>
				</router-link>
				<nav class="flex justify-between items-center px-4 h-full">
					<RouterLink
						class="text-fontSizeMedium hover:text-primaryColorHover"
						:class="{ 'text-primaryColor': $route.path === '/sitedetail' }"
						to="/sitedetail">
						添加书签
					</RouterLink>
					<RouterLink
						class="text-fontSizeMedium hover:text-primaryColorHover ml-5"
						:class="{ 'text-primaryColor': $route.path === '/set' }"
						to="/set">
						设置
					</RouterLink>
					<RouterLink
						v-if="!userStore.userInfo"
						class="text-fontSizeMedium hover:text-primaryColorHover ml-5"
						:class="{ 'text-primaryColor': $route.path === '/login' }"
						to="/login">
						登录
					</RouterLink>
					<template v-if="userStore.userInfo">
						<span
							@click="goUserlist"
							class="text-fontSizeMedium font-bold hover:text-primaryColorHover ml-5 flex items-center"
							:class="{ 'text-primaryColor': $route.path === '/login', 'cursor-pointer': userStore.userInfo.role == 0 }">
							{{ userStore.userInfo.username }}
						</span>
						<NButton @click="logout" text type="error">
							<NIcon size="20" class="ml-3">
								<Logout></Logout>
							</NIcon>
						</NButton>
					</template>
				</nav>
			</header>
			<RouterView class="h-[calc(100vh-96px)]" />
		</div>
	</n-config-provider>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		--baseColor: #ffffff;
		--primaryColor: #409eff;
		--primaryColorHover: #36ad6a;
		--textColor3: rgb(118, 124, 130);
		--borderColor: rgb(224, 224, 230);
	}
	.dark {
		--baseColor: #000;
	}
}
</style>
