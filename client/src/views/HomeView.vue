<script setup lang="ts">
import { ref } from 'vue'
import { GetTagList, TagCreate, GetSiteInfo, GetSiteList } from '@/assets/api/index'
import { pinyin } from 'pinyin-pro'
import SiteItem from '@/components/siteItem/SiteItem.vue'
import type { SiteListType, SiteType, TagType } from '@/assets/api/api'
import { NButton, NEmpty } from 'naive-ui'

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
const siteList=ref<SiteListType[]>([])
function getList() {
  GetSiteList().then(res=>{
    console.log(res)
    siteList.value=res.data
  })
}
getList()

</script>

<template>
	<main class="w-[960px] mx-auto flex">
		<div class="site-list flex-1">
      <h3 class="text-fontSizeLarge font-bold py-2 border-b border-borderColor mb-3">书签</h3>
			<template v-if="siteList.length>0">
        <SiteItem class="mb-5" @removeSite="getList" v-for="(item,index) in siteList" :key="item.id" :item="item"></SiteItem>
      </template>
      <template v-else>
        <NEmpty class="py-24"></NEmpty>
      </template>
		</div> 
    <div class="tag-list w-1/3 ml-8">
      <h3 class="text-fontSizeLarge font-bold py-2 border-b border-borderColor mb-3">标签</h3>
      <div class="mb-1 flex flex-wrap" v-for="(item,index) in tagList" :key="item.letter">
        <span class="text-primaryColor mr-1 w-4 text-center font-bold">{{ item.letter }}</span>
        <NButton text type="primary" class="mr-2 mb-1" v-for="(tag,index1) in item.list" :key="tag.id" closable>{{ tag.title }}</NButton>
      </div>
    </div>
	</main>
</template>
