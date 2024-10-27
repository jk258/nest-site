<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { NConfigProvider, NIcon, NText, dateZhCN, zhCN } from 'naive-ui'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const goUserlist = () => {
	router.push({
		path: '/userlist',
	})
}
</script>

<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN">
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
						v-if="!userStore.userInfo"
						class="text-fontSizeMedium hover:text-primaryColorHover ml-5"
						:class="{ 'text-primaryColor': $route.path === '/login' }"
						to="/login">
						登录
					</RouterLink>
					<span
						@click="goUserlist"
						v-if="userStore.userInfo"
						class="text-fontSizeMedium font-bold hover:text-primaryColorHover ml-5"
						:class="{ 'text-primaryColor': $route.path === '/login', 'cursor-pointer': userStore.userInfo.role == 0 }">
						{{ userStore.userInfo.username }}
					</span>
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
</style>
