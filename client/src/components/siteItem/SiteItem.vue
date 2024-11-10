<script setup lang="ts">
import { SiteDelete } from '@/assets/api'
import type { SiteListType, TagType } from '@/assets/api/api'
import { NButton, NTag, NText } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props=defineProps<{
  item: SiteListType,
  tag:TagType|null
}>()

const emit = defineEmits<{
	(e: 'removeSite'): void
	(e: 'tagSearch', tag: TagType): void
}>()

const editSite = (item: any) => {
	router.push({
		path: '/sitedetail',
		query: {
			id: item.id,
		},
	})
}
const removeSite = (item: SiteListType) => {
	SiteDelete({ id: item.id }).then((res) => {
		emit('removeSite')
	})
}
const searchTag = (tagItem: TagType) => {
  if (tagItem.id == props.tag?.id) {
    return false
  }
	emit('tagSearch', tagItem)
}
</script>
<template>
	<a class="block group" :href="item.url" target="_blank" rel="noopener noreferrer">
		<h4 class="flex items-center gap-2">
			<img class="w-5 h-5 object-cover" :src="item.logo" :alt="item.title" />
			<span class="font-bold text-primaryColor text-fontSizeMedium line-clamp-1 group-hover:underline">{{ item.title }}</span>
		</h4>
		<div class="flex items-center gap-2">
			#
			<NButton text :type="tag?.id == tagItem.id ? 'primary' : 'default'" v-for="tagItem in item.tags" :key="tagItem.id" checkable @click.prevent="searchTag(tagItem)" size="small">
				{{ tagItem.title }}
			</NButton>
		</div>
		<p class="text-fontSizeSmall text-textColor3 line-clamp-1">{{ item.desc }}</p>
		<div class="flex items-center gap-3">
			<span class="text-textColor3 leading-6">2021-04-05</span>
			<div class="flex items-center gap-2">
				<NButton @click.prevent="editSite(item)" text type="primary">编辑</NButton>
				<NButton @click.prevent="removeSite(item)" text type="error">删除</NButton>
			</div>
		</div>
	</a>
</template>

<style scoped></style>
