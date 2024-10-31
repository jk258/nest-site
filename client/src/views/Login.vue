<script setup lang="ts">
import { NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { ref } from 'vue'
import { Login } from '@/assets/api'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router=useRouter()
//#region 创建修改
const formValue = ref({
  username: '',
  password: '',
})
const rules: FormRules = {
	username: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
	password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const formRef = ref<FormInst | null>(null)
const submit = () => {
	formRef.value?.validate((errors) => {
		if (!errors) {
      Login(formValue.value).then(res => {
        userStore.setToken(res.data.access_token)
        router.replace({
          path:'/'
        })
      })
		}
	})
}
//#endregion
</script>
<template>
	<div class="flex items-center justify-center pb-52">
		<div class="w-[450px] max-h-full m-auto">
			<h3 class="font-bold text-fontSizeLarge mb-3 py-2 border-b border-borderColor">登录</h3>
			<NForm ref="formRef" :model="formValue" :rules="rules" :label-width="80">
				<NFormItem label="邮箱" path="username">
					<NInput v-model:value="formValue.username" :input-props="{ name: 'bookmark-username', autocomplete: 'on' }" @keyup.enter.native="submit" placeholder="请输入邮箱"></NInput>
				</NFormItem>
				<NFormItem label="密码" path="password">
					<NInput v-model:value="formValue.password" type="password" @keyup.enter.native="submit" placeholder="请输入密码"></NInput>
				</NFormItem>
				<NFormItem>
					<NButton type="primary" block @click="submit">提交</NButton>
				</NFormItem>
			</NForm>
		</div>
	</div>
</template>

<style scoped></style>
