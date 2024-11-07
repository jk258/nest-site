<script setup lang="ts">
import { ref } from 'vue'
import { GetTagList, TagCreate, GetSiteInfo, GetSiteList } from '@/assets/api/index'
import { pinyin } from 'pinyin-pro'
import SiteItem from '@/components/siteItem/SiteItem.vue'
import type { SiteListType, SiteSearchType, SiteType, TagType } from '@/assets/api/api'
import { NButton, NEmpty, NInput } from 'naive-ui'

type SiteTag = {
	letter: string
	list: TagType[]
}
const tagOriginList=ref<TagType[]>([])
const tagList = ref<SiteTag[]>([])
GetTagList().then((res) => {
  tagOriginList.value=res.data
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

const searchValue = ref('')
const tag= ref<TagType|null>(null)
const siteList = ref<SiteListType[]>([])
function getList() {
  if (searchValue.value.startsWith('#')) {
    const tagval = tagOriginList.value.find(item => item.title === searchValue.value.slice(1))
    if (tagval) {
      tag.value = tagval
    } else {
      siteList.value = []
      return 
    }
  }
  const data:SiteSearchType = {
    tagId: tag.value?.id || 0,
    title:searchValue.value.startsWith('#')?'':searchValue.value,
  }
	GetSiteList(data).then((res) => {
		console.log(res)
		siteList.value = res.data
	})
}
getList()
const tagSearch = (tagVal: TagType)=>{
  tag.value = tagVal
  getList()
}
</script>

<template>
	<div>
    
		<main class="mx-auto flex">
			<div class="site-list flex-1">
				<h3 class="text-fontSizeLarge font-bold py-2 border-b border-borderColor mb-3 flex justify-between ">书签
          <div class="flex font-normal">
            <NInput v-model:value="searchValue" placeholder="请输入书签标题或标签"></NInput>
            <NButton type="primary" @click="getList">搜索</NButton>
          </div>
        </h3>
				<template v-if="siteList.length > 0">
					<SiteItem class="mb-5" @removeSite="getList" v-for="(item, index) in siteList" :key="item.id" :item="item"></SiteItem>
				</template>
				<template v-else>
					<NEmpty class="py-24"></NEmpty>
				</template>
			</div>
			<div class="tag-list w-1/3 ml-8">
				<h3 class="text-fontSizeLarge font-bold py-2 border-b border-borderColor mb-3">标签</h3>
				<div class="mb-1 flex flex-wrap"  v-for="(item, index) in tagList" :key="item.letter">
					<span class="text-primaryColor mr-1 w-4 text-center font-bold">{{ item.letter }}</span>
					<NButton text type="primary" @click="tagSearch(tag)" class="mr-2 mb-1" v-for="(tag, index1) in item.list" :key="tag.id" closable>{{ tag.title }}</NButton>
				</div>
			</div>
		</main>
	</div>
</template>
