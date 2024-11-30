<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { NButton, NConfigProvider, NIcon, darkTheme, NGlobalStyle, dateZhCN, zhCN, NMessageProvider } from 'naive-ui'
import { useThemeStore, useUserStore } from '@/stores'
import Logout from '@/components/icons/Logout.vue'
import { UserRole } from '@/assets/utils/utils'

const router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()

const navList = [
	{ path: '/sitedetail', name: '添加书签' },
	{ path: '/set', name: '设置' },
]
/**用户详情 */
const goUserlist = () => {
	if (userStore.userInfo?.role === UserRole.admin) {
		router.push({
			path: '/userlist',
		})
	}
}
/***退出登录 */
const logout = () => {
	userStore.setToken('')
	router.replace({
		path: '/',
	})
}
</script>

<template>
	<n-config-provider :theme="themeStore.theme == 'dark' ? darkTheme : null" :locale="zhCN" :date-locale="dateZhCN">
		<NMessageProvider>
			<div class="w-[960px] m-auto">
				<header class="h-20 flex justify-between items-center">
					<router-link class="flex items-center" to="/" replace>
						<img src="/favicon.ico" class="w-12 h-12" alt="书签" />
						<span class="text-fontSizeLarge text-primaryColor ml-2">书签</span>
					</router-link>
					<nav class="flex justify-between items-center px-4 h-full">
						<RouterLink
							v-for="(item, index) in navList"
							:key="item.path"
							class="text-fontSizeMedium hover:text-primaryColorHover mr-5"
							:class="{ 'text-primaryColor': $route.path === item.path }"
							:to="item.path">
							{{ item.name }}
						</RouterLink>
						<RouterLink
							v-if="!userStore.userInfo"
							class="text-fontSizeMedium hover:text-primaryColorHover"
							:class="{ 'text-primaryColor': $route.path === '/login' }"
							to="/login">
							登录
						</RouterLink>
						<template v-if="userStore.userInfo">
							<span
								@click="goUserlist"
								class="text-fontSizeMedium font-bold hover:text-primaryColorHover flex items-center"
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
			<NGlobalStyle></NGlobalStyle>
		</NMessageProvider>
	</n-config-provider>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		--baseColor: #ffffff;
		--primaryColor: #18a058;
		--primaryColorHover: #36ad6a;
		--textColor3: rgb(118, 124, 130);
		--borderColor: rgb(224, 224, 230);
	}
	.dark {
		--baseColor: #000;
	}
}
</style>
