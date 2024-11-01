<script setup lang="tsx">
import { onActivated, ref, watch } from 'vue'
import { NButton, NDataTable,NPopconfirm, NText, type DataTableColumns } from 'naive-ui'
import BaseForm from '@/components/baseForm/BaseForm.vue'
import type { FormItemType } from '@/components/baseForm/type'
import { useTable } from '@/assets/utils/hooks'
import { GetSysUserList, UpdateSysUserIsActive } from '@/assets/api'
import type { UserRes } from '@/assets/api/api'
import AccountDetail from '@/views/adminAccount/components/AccountDetail.vue'

//#region 列表搜索
const formValue = ref({
	sys_user_name: '',
})
const schemas = ref<FormItemType[]>([
	{
		placeholder: '请输入用户姓名',
		component: 'NInput',
		label: '用户姓名',
		field: 'sys_user_name',
	},
])

const tableData = ref<UserRes[]>([])
const chnnelList = ref([
  {label: "甜悦读", value: "tianyuedu"},
  {label: "朵米", value: "duomi"},
  {label: "萌鹿", value: "menglu"},
  {label: "瓜子", value: "guazi"}
])
const columns: DataTableColumns<UserRes> = [
	{
		title: '用户ID',
		key: 'id',
	},
	{
		title: '用户账号',
		key: 'login_account',
	},
	{
		title: '用户姓名',
		key: 'sys_user_name',
  },

  {
    title: '用户角色',
    key: 'role_name',
  },
  {
		title: '数据库名称',
    key: 'db_name',
    render(row) {
      return chnnelList.value.find(item => item.value == row.db_name)?.label
    }
	},
	{
		title: '状态',
		key: 'is_active',
		render(row) {
			return (
				<NText type={row.is_active == 1 ? 'default' : 'error'}>
					{row.is_active == 1 ? '正常' : '冻结'}
				</NText>
			)
		},
	},
	{
		title: '操作',
		key: 'set',
		width: 150,
		render(row) {
			return (
				<div>
					<NButton type='primary' onClick={() => handleEdit(row)}>
						编辑
					</NButton>
					<NPopconfirm
						onPositiveClick={() => editStatus(row)}
						v-slots={{
							default: () => `确认要${row.is_active == 1 ? '冻结' : '解冻'}吗`,
							trigger: () => (
								<NButton type={row.is_active == 1 ? 'error' : 'warning'} class='ml-2' size='medium'>
									{row.is_active == 1 ? '冻结' : '解冻'}
								</NButton>
							),
						}}></NPopconfirm>
				</div>
			)
		},
	},
]
const { pagination, loading, maxHeight } = useTable(getData)
function getData() {
	loading.value = true

	GetSysUserList({
		page: pagination.value.page,
		pageSize: pagination.value.pageSize,
    sys_user_name: formValue.value.sys_user_name,
	})
		.then((res) => {
			tableData.value = res.data
			pagination.value.itemCount = res.totalCount
		})
		.finally(() => {
			loading.value = false
		})
}
/**编辑状态 */
const editStatus = (row: UserRes) => {
	UpdateSysUserIsActive({
		id: row.id,
		is_active: row.is_active == 1 ? 0 : 1,
	}).then(() => {
		getData()
	})
}
//#endregion

const searchHandler = () => {
	pagination.value.page = 1
	getData()
}
onActivated(() => {
  formValue.value = {
    sys_user_name: '',
  }
  searchHandler()
})
const detail = ref<UserRes | null>(null)
//#region 添加|编辑
const isEdit = ref(false)
const modalShow = ref(false)
const handleEdit = (row: UserRes | null) => {
	detail.value = row
	isEdit.value = !!row
	modalShow.value = true
}
//#endregion
</script>
<template>
	<main>
		<BaseForm v-model:form-value="formValue" :schemas="schemas" @validate-success="searchHandler"></BaseForm>
		<div class="flex justify-between items-center mb-5">
			<span class="font-bold text-base">账号管理</span>
			<NButton type="primary" @click="handleEdit(null)">新增</NButton>
		</div>
		<n-data-table :single-line="false"
			scroll-x="1000"
			id="table"
			:max-height="maxHeight"
			remote
			:loading="loading"
			:paginate-single-page="false"
			bordered
			:pagination="pagination"
			:columns="columns"
			:data="tableData" />
      <!-- 添加/编辑账号 -->
		<AccountDetail :detail="detail" :is-edit="isEdit" v-model:modal-show="modalShow" @confirm-success="getData"></AccountDetail>
	</main>
</template>

<style scoped></style>
