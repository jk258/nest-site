<script setup lang="ts">
import { CreateUser, UpdatePass, UpdateUser } from '@/assets/api'
import { NForm, NFormItem, NInput, NModal, NButton, NSelect, type FormInst, type FormRules, useMessage } from 'naive-ui'
import { ref, watch } from 'vue'
import { userRoles } from '@/assets/utils/utils'
import { useDiscrete } from '@/assets/utils/hooks'
import type { UserType } from '@/assets/api/api'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

const showModal = defineModel<boolean>('showModal', { default: false })
const emit = defineEmits<{
	(e: 'submitSucess'): void
}>()

const formRef = ref<FormInst | null>(null)
const formValue = ref({
	password: '',
	againPass: '',
})
const rules: FormRules = {
	password: {
		required: true,
		trigger: ['blur', 'input'],
		message: '请输入密码',
	},
	againPass: {
		required: true,
		validator: (rule, value) => {
			if (value !== formValue.value.password) {
				return new Error('两次密码不一致')
			}
			return true
		},
	},
}
const message = useMessage()
const router = useRouter()
const userStore = useUserStore()
const submitForm = () => {
	formRef.value?.validate((error) => {
		if (!error) {
			console.log(formValue.value)
			UpdatePass({ password: formValue.value.password }).then((res) => {
				message.success('修改成功')
				showModal.value = false

				setTimeout(() => {
					userStore.setToken('')
					router.replace({
						path: '/login',
					})
				},1500)
			})
		}
	})
}
</script>
<template>
	<n-modal v-model:show="showModal" preset="dialog" title="修改密码">
		<NForm ref="formRef" :model="formValue" label-placement="left" :rules="rules" :label-width="70">
			<NFormItem label="新密码" path="password">
				<NInput v-model:value="formValue.password" type="password" showPasswordOn="click" placeholder="请输入密码"></NInput>
			</NFormItem>
			<NFormItem label="新密码" path="againPass">
				<NInput v-model:value="formValue.againPass" type="password" showPasswordOn="click" placeholder="请再次输入密码"></NInput>
			</NFormItem>
			<NFormItem>
				<n-button type="primary" block @click="submitForm">提交</n-button>
			</NFormItem>
		</NForm>
	</n-modal>
</template>

<style scoped></style>
