<script setup lang="ts">
import { NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import { ref } from 'vue'
import { GetSiteDetail, GetSiteInfo, SiteCreate, SiteUpdate } from '@/assets/api'
import TagSelect from '@/components/tagSelect/TagSelect.vue'
import { useRoute, useRouter } from 'vue-router'
import type { SiteType, SiteListType } from '@/assets/api/api'
const route = useRoute()
const router = useRouter()
const id = route.query.id as string
const siteId = ref(0)
//#region 创建修改
const formValue = ref<Omit<SiteType, 'id' | 'tags'> & { tags: number[] }>({
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
	tags: [{ required: true, message: '请选择标签' }],
}
const formRef = ref<FormInst | null>(null)
const submit = () => {
	formRef.value?.validate((errors) => {
		if (!errors) {
			console.log('submit!')
			const tags = formValue.value.tags.join(',')
			const promise = id
				? SiteUpdate({
						...formValue.value,
						id: siteId.value,
						tags: tags,
					})
				: SiteCreate({
						...formValue.value,
						tags: tags,
					})
			promise.then(() => {
				router.replace({
					path: '/',
				})
			})
		}
	})
}
//#endregion
function isValidUrl(str: string) {
	const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
	return urlRegex.test(str)
}
/**
 * 根据网址获取网页信息
 * @param value
 */
const getSiteInfo = (value: string) => {
	if (!id && value && isValidUrl(value)) {
		GetSiteInfo({ url: value }).then((res) => {
			console.log(res)
			formValue.value.title = res.data.title
			formValue.value.logo = res.data.logo
			formValue.value.desc = res.data.desc
		})
	}
}
function getDetail() {
	GetSiteDetail({ id: Number(id) }).then((res) => {
		const data: SiteListType = res.data
		siteId.value = data.id
		formValue.value = {
			title: data.title,
			url: data.url,
			logo: data.logo,
			desc: data.desc || '',
			tags: data.tags.map((item) => item.id),
		}
	})
}
getDetail()
</script>
<template>
	<div class="flex items-center justify-center">
		<div class="w-[450px] max-h-full m-auto">
			<h3 class="font-bold text-fontSizeLarge mb-3 py-2 border-b border-borderColor">书签</h3>
			<NForm ref="formRef" :model="formValue" :rules="rules" :label-width="80">
				<NFormItem label="网址" path="url">
					<NInput v-model:value="formValue.url" @update:value="getSiteInfo" placeholder="请输入网址"></NInput>
				</NFormItem>
				<NFormItem label="标题" path="title">
					<NInput v-model:value="formValue.title" placeholder="请输入标题"></NInput>
				</NFormItem>
				<!-- <NFormItem label="logo" path="logo">
					<NInput v-model:value="formValue.logo" placeholder="请输入logo"></NInput>
				</NFormItem> -->
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
