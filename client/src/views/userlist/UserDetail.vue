<script setup lang="ts">
import { CreateUser, UpdateUser } from '@/assets/api'
import { NForm, NFormItem, NInput, NModal, NButton, NSelect, type FormInst, type FormRules } from 'naive-ui'
import { ref, watch } from 'vue'
import { userRoles } from '@/assets/utils/utils'
import { useDiscrete } from '@/assets/utils/hooks'
import type { UserType } from '@/assets/api/api'

const props = defineProps<{
	detail: UserType | null
}>()

const showModal = defineModel<boolean>('showModal', { default: false })
const emit = defineEmits<{
	(e: 'submitSucess'): void
}>()

const detailId = ref(0)
watch(showModal, (newVal) => {
	if (newVal) {
		console.log(newVal)
		formValue.value = {
			username: props.detail?.username || '',
			password: '',
			role: props.detail ? props.detail.role : 4,
		}
		detailId.value = props.detail?.id || 0
	}
})
const formRef = ref<FormInst | null>(null)
const formValue = ref({
	username: '',
	password: '',
	role: 4,
})
const rules: FormRules = {
	username: {
		required: true,
		trigger: ['blur', 'input'],
		message: '请输入用户名',
	},
}
const submitForm = () => {
	formRef.value?.validate((errors) => {
		if (!errors) {
			const promise = props.detail ? UpdateUser({ ...formValue.value, id: detailId.value }) : CreateUser(formValue.value)
			promise.then((res) => {
				const discretes = useDiscrete()
				discretes.message.success('提交成功')
				showModal.value = false
				emit('submitSucess')
			})
		}
	})
}
</script>
<template>
	<n-modal v-model:show="showModal" preset="dialog" title="用户信息">
		<NForm ref="formRef" :model="formValue" label-placement="left" :rules="rules" :label-width="70">
			<NFormItem label="用户名" path="username">
				<NInput v-model:value="formValue.username" placeholder="请输入用户名"></NInput>
			</NFormItem>
			<NFormItem label="密码" path="password">
				<NInput v-model:value="formValue.password" placeholder="请输入密码"></NInput>
			</NFormItem>
			<NFormItem label="角色" path="role">
				<NSelect v-model:value="formValue.role" :options="userRoles"></NSelect>
			</NFormItem>
			<NFormItem>
				<n-button type="primary" block @click="submitForm">提交</n-button>
			</NFormItem>
		</NForm>
	</n-modal>
</template>

<style scoped></style>
