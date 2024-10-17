<script setup lang="ts">
import { NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { ref } from 'vue'
import { GetSiteInfo } from '@/assets/api'
import TagSelect from '@/components/tagSelect/TagSelect.vue';

const formValue = ref({
	title: '',
	url: '',
	logo: '',
	desc: '',
	tags: [],
})
const rules: FormRules = {
  url: [
    { required: true, message: '请输入网址', trigger: 'blur' },
    { type: 'url', message: '请输入正确的网址', trigger: ['blur', 'change'] },
  ],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  logo: [{ required: true, message: '请输入logo', trigger: 'blur' }],
  tags: [{ required: true, message:'请选择标签'}]
}
const formRef = ref<FormInst | null>(null)
const submit = () => {
	formRef.value?.validate((errors) => {
		if (!errors) {
			console.log('submit!')
		}
	})
}
function getSiteInfo() {
	GetSiteInfo({ url: 'http://www.baidu.com' }).then((res) => {
		console.log(res)
	})
}
</script>
<template>
	<div class="flex items-center justify-center">
		<div class="w-[450px] max-h-full m-auto">
			<h3 class="font-bold text-fontSizeLarge mb-3 py-2 border-b border-borderColor">书签</h3>
			<NForm ref="formRef" :model="formValue" :rules="rules" :label-width="80">
				<NFormItem label="网址" path="url">
					<NInput v-model:value="formValue.url" placeholder="请输入网址"></NInput>
				</NFormItem>
				<NFormItem label="标题" path="title">
					<NInput v-model:value="formValue.title" placeholder="请输入标题"></NInput>
				</NFormItem>
				<NFormItem label="logo" path="logo">
					<NInput v-model:value="formValue.logo" placeholder="请输入logo"></NInput>
				</NFormItem>
				<NFormItem label="简介" path="desc">
					<NInput v-model:value="formValue.desc" placeholder="请输入简介"></NInput>
				</NFormItem>
				<NFormItem label="标签" path="tags">
					<TagSelect v-model:value="formValue.tags"></TagSelect>
				</NFormItem>
				<NFormItem>
					<NButton type="primary" block @click="submit">提交</NButton>
				</NFormItem>
			</NForm>
		</div>
	</div>
</template>

<style scoped></style>
