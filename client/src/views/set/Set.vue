<script setup lang="ts">
import { NButton, NForm, NFormItem, NIcon, NInput, NSwitch } from 'naive-ui'
import { Sun, Moon } from '@/components/icons'
import { useThemeStore } from '@/stores/index'

const themeStore = useThemeStore()
const updateTheme = (value: boolean) => {}
</script>
<template>
	<div>
		<div class="flex text-fontSizeMedium mb-3">
			<label class="w-24 text-right">修改密码：</label>
			<div class="text-primaryColor cursor-pointer">点击修改密码</div>
		</div>
		<div class="flex text-fontSizeMedium">
			<label class="w-24 text-right">主题：</label>
			<div class="text-primaryColor cursor-pointer">
				<NSwitch :value="themeStore.theme === 'dark'" @update-value="updateTheme">
					<template #checked>
						<NIcon>
							<Sun />
						</NIcon>
					</template>
					<template #unchecked>
						<NIcon>
							<Moon />
						</NIcon>
					</template>
				</NSwitch>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
