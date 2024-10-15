<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { NConfigProvider,dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN">
		<nav>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/about">About</RouterLink>
		</nav>
		<RouterView />
	</n-config-provider>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
