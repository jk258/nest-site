<script setup lang="tsx">
import { DeleteUser, UserList } from '@/assets/api'
import type { UserType } from '@/assets/api/api'
import { UserRole } from '@/assets/utils/utils'
import { useUserStore } from '@/stores/user'
import UserDetail from '@/views/userlist/UserDetail.vue'
import { NForm,NFormItem,NInput, NButton, NDataTable, NPopconfirm, type DataTableColumns, type FormInst } from 'naive-ui'
import { ref } from 'vue'

const userStore = useUserStore()
const columns: DataTableColumns<UserType> = [
	{
		title: 'ID',
		key: 'id',
	},
	{
		title: '用户名',
		key: 'username',
	},
	{
		title: '角色',
		key: 'role',
	},
	{
		title: '操作',
		key: 'set',
		render(row) {
			return (
				<div>
					<NButton type='primary' onClick={() => detailHandler(row)}>
						编辑
					</NButton>
					<NPopconfirm
						onPositiveClick={() => removeUser(row)}
						v-slots={{
							default: () => `确认要删除吗`,
							trigger: () => (
								<NButton type='error' class='ml-2' size='medium'>
									删除
								</NButton>
							),
						}}></NPopconfirm>
				</div>
			)
		},
	},
]
const tableData = ref<UserType[]>([])
/**
 * 获取用户列表
 */
function getUserList() {
	if (userStore.userInfo?.role === UserRole.admin) {
		UserList().then((res) => {
			tableData.value = res.data
		})
	}
}
getUserList()

const showModal = ref(false)
const detail = ref<UserType | null>(null)
const detailHandler = (row: UserType | null) => {
	detail.value = row
	showModal.value = true
}
/**删除用户 */
const removeUser = (row: UserType) => {
	console.log(row)
	DeleteUser({ id: row.id }).then((res) => {
		getUserList()
	})
}
// const formValue = ref({
// 	password: '',
// })
// const formRef = ref<FormInst | null>(null)
// const rules = {
// 	password: [
// 		{
// 			required: true,
// 			message: '请输入密码',
// 			trigger: 'blur',
// 		},
// 	],
// }
// const submitForm = () => {
//   formRef.value?.validate((errors) => {
//     if (!errors) {
//     } 
//   })
// }
</script>
<template>
	<div>
		<!-- <div>
			<NForm class="w-[500px] shadow-boxShadow3 p-5 pt-8 rounded-lg mx-auto mt-[20vh]" ref="formRef" :model="formValue" label-placement="left" :rules="rules" :label-width="70">
				<NFormItem label="新密码" path="password">
					<NInput v-model:value="formValue.password" placeholder="请输入密码"></NInput>
				</NFormItem>
				<NFormItem>
					<n-button type="primary" block @click="submitForm">提交</n-button>
				</NFormItem>
			</NForm>
		</div> -->
		<div v-if="userStore.userInfo?.role === UserRole.admin">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-fontSizeMedium font-bold">用户管理</h2>
				<NButton type="primary" @click="detailHandler(null)">添加</NButton>
			</div>
			<NDataTable :columns="columns" :data="tableData" :pagination="false"></NDataTable>
			<UserDetail v-model:show-modal="showModal" :detail="detail" @submit-sucess="getUserList"></UserDetail>
		</div>
	</div>
</template>

<style scoped></style>
