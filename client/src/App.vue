<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { NButton, NConfigProvider, NIcon, darkTheme, NGlobalStyle, dateZhCN, zhCN, NMessageProvider } from 'naive-ui'
import { useThemeStore, useUserStore } from '@/stores'
import Logout from '@/components/icons/Logout.vue'
import { UserRole } from '@/assets/utils/utils'
import { Moon, Sun } from '@/components/icons'
import ChangePass from '@/views/set/components/ChangePass.vue'

const router = useRouter()
const userStore = useUserStore()
const themeStore = useThemeStore()
/**
 * 切换主题
 */
const updateTheme = () => {
	themeStore.setTheme(themeStore.theme == 'light' ? 'dark' : 'light')
}
const isShowChangePass = ref(false) // 是否显示修改密码

const navList = [
	{ path: '/sitedetail', name: '添加书签' },
	// { path: '/set', name: '设置' },
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
						<NIcon size="24" @click="updateTheme" text class="mr-5 cursor-pointer">
							<Moon v-if="themeStore.theme == 'dark'"></Moon>
							<Sun v-if="themeStore.theme == 'light'"></Sun>
						</NIcon>
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
						<div class="flex items-center" v-if="userStore.userInfo">
							<div @click="isShowChangePass = true" class="cursor-pointer text-fontSizeMedium hover:text-primaryColorHover mr-5">修改密码</div>
							<ChangePass v-model:show-modal="isShowChangePass"></ChangePass>
							<div
								@click="goUserlist"
								class="text-fontSize leading-4 font-bold hover:text-primaryColorHover flex items-center"
								:class="{ 'text-primaryColor': $route.path === '/login', 'cursor-pointer': userStore.userInfo.role == 0 }">
								{{ userStore.userInfo.username }}
							</div>
							<!-- <div class="cursor-pointer text-primaryColor text-fontSizeMini leading-3">修改密码</div> -->
							<NButton @click="logout" text type="error">
								<NIcon size="20" class="ml-3">
									<Logout></Logout>
								</NIcon>
							</NButton>
						</div>
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
