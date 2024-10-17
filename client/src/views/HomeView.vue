<script setup lang="ts">
import { ref } from 'vue'
import { GetTagList, TagCreate, GetSiteInfo } from '@/assets/api/index'
import { pinyin } from 'pinyin-pro'
import SiteItem from '@/components/siteItem/SiteItem.vue'
import type { TagType } from '@/assets/api/api'

type SiteTag = {
	letter: string
	list: TagType[]
}
const tagList = ref<SiteTag[]>([])
GetTagList().then((res) => {
	tagList.value = res.data
		.sort((a: TagType, b: TagType) => pinyin(a.title).localeCompare(pinyin(b.title)))
		.reduce((pre: SiteTag[], cur: TagType) => {
			const key = pinyin(cur.title)[0].toLocaleUpperCase()
			const index = pre.findIndex((item) => item.letter === key)
			if (index !== -1) {
				pre[index].list.push(cur)
			} else {
				pre.push({
					letter: key,
					list: [cur],
				})
			}
			return pre
		}, [])
})
// GetSiteInfo({url:"http://www.baidu.com"}).then(res=>{
//   console.log(res)
// })
</script>

<template>
	<main class="container mx-auto">
		<!-- <div class="site-list">
			<SiteItem></SiteItem>
		</div> -->
		<div class="w-96"></div>
	</main>
</template>
