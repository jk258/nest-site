<script setup lang='ts'>
import { UserList } from '@/assets/api'

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
    <h2>用户管理</h2>
    
  </div>
</template>

<style scoped>

</style>
