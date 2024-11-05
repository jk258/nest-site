<script setup lang='tsx'>
import { UserList } from '@/assets/api'
import type { UserType } from '@/assets/api/api';
import UserDetail from '@/views/userlist/UserDetail.vue';
import { NButton, NDataTable, type DataTableColumns } from 'naive-ui';
import { ref } from 'vue';


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
    title: "角色",
    key: "role",
  },
  {
    title: "操作",
    key: "set",
    render(row) {
      return <div>
          <NButton type='primary' onClick={() => detailHandler(row)}>
            编辑
          </NButton>
        </div>
    }
  }
]
const tableData = ref<UserType[]>([])
/**
 * 获取用户列表
 */
function getUserList() {
  UserList().then(res=>{
    tableData.value=res.data
  })
}
getUserList()

const showModal=ref(false)
const detail=ref<UserType|null>(null)
const detailHandler = (row:UserType|null) => {
  detail.value=row
  showModal.value=true
}
</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-fontSizeMedium font-bold">用户管理</h2>
      <NButton type="primary" @click="detailHandler(null)">添加</NButton>
    </div>
    <NDataTable
    :columns="columns"
    :data="tableData"
    :pagination="false"></NDataTable>
    <UserDetail v-model:show-modal="showModal" :detail="detail" @submit-sucess="getUserList"></UserDetail>
  </div>
</template>

<style scoped>

</style>
