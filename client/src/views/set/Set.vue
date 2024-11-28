<script setup lang="ts">
import { NButton, NForm, NFormItem, NInput, NSwitch } from 'naive-ui'
</script>
<template>
	<div>
		<div class="flex text-fontSizeMedium mb-3" >
			<label class="w-24 text-right">修改密码：</label>
			<div class="text-primaryColor cursor-pointer">点击修改密码</div>
		</div>
		<div class="flex text-fontSizeMedium">
			<label class="w-24 text-right">主题：</label>
			<div class="text-primaryColor cursor-pointer">
        <NSwitch></NSwitch>
      </div>
		</div>
	</div>
</template>

<style scoped></style>
