<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NForm, NFormItem, NIcon, NInput, NSwitch } from 'naive-ui'
import { Sun, Moon } from '@/components/icons'
import { useThemeStore } from '@/stores/index'
import ChangePass from '@/views/set/components/ChangePass.vue';


const isShowChangePass = ref(false)

const themeStore = useThemeStore()
const updateTheme = (value: boolean) => {
	themeStore.setTheme(value ? 'dark' : 'light')
}
</script>
<template>
	<div>
		<div class="flex text-fontSizeMedium mb-3">
			<label class="w-24 text-right">修改密码：</label>
			<div class="text-primaryColor cursor-pointer" @click="isShowChangePass = true">点击修改密码</div>
		</div>
    <ChangePass v-model:show-modal="isShowChangePass"></ChangePass>
		<div class="flex text-fontSizeMedium">
			<label class="w-24 text-right">主题：</label>
			<div class="text-primaryColor cursor-pointer">
				<NSwitch :value="themeStore.theme === 'dark'" @update-value="updateTheme">
					<template #checked>
						<NIcon>
							<Moon />
						</NIcon>
					</template>
					<template #unchecked>
						<NIcon>
							<Sun />
						</NIcon>
					</template>
				</NSwitch>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
