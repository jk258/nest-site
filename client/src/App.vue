<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { NConfigProvider, NIcon, NText, dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN">
		<header class="w-[960px] m-auto h-20 flex justify-between items-center">
			<router-link to="/">
				<img src="/favicon.ico" class="w-12 h-12" alt="">
			</router-link>
			<nav class="flex justify-between items-center px-4 h-full">
				<RouterLink class="text-fontSizeMedium  hover:text-primaryColorHover" :class="{ 'text-primaryColor': $route.path === '/sitedetail' }" to="/sitedetail">
          添加书签
        </RouterLink>
			</nav>
		</header>
		<!-- <RouterView class="h-[calc(100vh-96px)]" /> -->
	</n-config-provider>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
