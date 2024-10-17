<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { NConfigProvider,dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
	<n-config-provider :locale="zhCN" :date-locale="dateZhCN">
		<header class="h-24"></header>
		<RouterView class="h-[calc(100vh-96px)]"/>
	</n-config-provider>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
