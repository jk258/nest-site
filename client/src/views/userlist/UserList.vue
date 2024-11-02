<script setup lang='ts'>
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
  }
]
const tableData = ref<UserType[]>([
  {
    id: 1,
    username: "admin",
    role: 1
  }
])
/**
 * 获取用户列表
 */
function getUserList() {
  UserList().then(res=>{
    console.log(res)
  })
}
getUserList()

</script>
<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-fontSizeMedium font-bold">用户管理</h2>
      <NButton type="primary">添加</NButton>
    </div>
    <NDataTable
    :columns="columns"
    :data="tableData"
    :pagination="false"></NDataTable>
    <UserDetail></UserDetail>
  </div>
</template>

<style scoped>

</style>
