<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NEmpty, NIcon, NInput } from 'naive-ui'
import { pinyin } from 'pinyin-pro'
import SiteItem from '@/components/siteItem/SiteItem.vue'
import type { SiteListType, SiteSearchType, SiteType, TagType } from '@/assets/api/api'
import { GetTagList, TagCreate, GetSiteInfo, GetSiteList, TagDelete } from '@/assets/api/index'
import { Search, Edit, Close } from '@/components/icons'

const isEdit = ref(false)

//#region 标签列表
type SiteTag = {
	letter: string
	list: TagType[]
}
const tag = ref<TagType | null>(null)
const tagOriginList = ref<TagType[]>([])
const tagList = ref<SiteTag[]>([])
/**获取所有标签 */
function getAllTags() {
	GetTagList().then((res) => {
		tagOriginList.value = res.data
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
}
getAllTags()
//#endregion

//#region 网站列表
const searchValue = ref('')
const siteList = ref<SiteListType[]>([])
/**
 * 获取网站列表
 */
function getList() {
	if (searchValue.value.startsWith('#')) {
		const tagval = tagOriginList.value.find((item) => item.title === searchValue.value.slice(1))
		if (tagval) {
			tag.value = tagval
		} else {
			siteList.value = []
			return
		}
	}
	const data: SiteSearchType = {
		tagId: tag.value?.id || 0,
		title: searchValue.value.startsWith('#') ? '' : searchValue.value,
	}
	GetSiteList(data).then((res) => {
		siteList.value = res.data
	})
}
getList()
//#endregion
/**标签搜索网站 */
const tagSearch = (tagVal: TagType) => {
	tag.value = tag.value?.id === tagVal.id ? null : tagVal
	getList()
}
/**
 * 网站搜索
 */
const siteSearch = () => {
	getList()
}
const removeTag = (tagItem: TagType) => {
	TagDelete({ id: tagItem.id }).then(() => {
    getList()
    getAllTags()
	})
}
</script>

<template>
	<div>
		<main class="mx-auto flex">
			<div class="site-list flex-1">
				<h3 class="text-fontSizeLarge font-bold py-2 border-b border-borderColor mb-3 flex justify-between">
					书签
					<div class="flex font-normal">
						<NInput v-model:value="searchValue" @keyup.enter="siteSearch" placeholder="请输入书签或#标签">
							<template #prefix>
								<NIcon size="20">
									<Search></Search>
								</NIcon>
							</template>
						</NInput>

						<NButton class="ml-3 px-2" type="primary" secondary @click="isEdit = !isEdit">
							<NIcon size="20">
								<Edit></Edit>
							</NIcon>
						</NButton>
					</div>
				</h3>
				<template v-if="siteList.length > 0">
					<SiteItem
						class="mb-5"
						@removeSite="getList"
						@tagSearch="tagSearch"
						v-for="(item, index) in siteList"
						:key="item.id"
						:tag="tag"
						:item="item"
						:isEdit="isEdit"></SiteItem>
				</template>
				<template v-else>
					<NEmpty class="py-24"></NEmpty>
				</template>
			</div>
			<div class="tag-list w-1/3 ml-8">
				<h3 class="text-fontSizeLarge font-bold py-2 border-b border-borderColor mb-3">标签</h3>
				<div class="mb-1 flex items-center flex-wrap" v-for="(item, index) in tagList" :key="item.letter">
					<span class="text-primaryColor text-fontSize mr-1 w-4 text-center font-bold">{{ item.letter }}</span>
					<NButton
						text
						@click="tagSearch(tagItem)"
						class="mr-2 mb-1 group"
						:type="tag?.id == tagItem.id ? 'primary' : 'default'"
						:class="{ 'font-bold': tag?.id == tagItem.id }"
						v-for="(tagItem, index1) in item.list"
						:key="tagItem.id"
						closable>
						{{ tagItem.title }}
						<NButton @click.stop="removeTag(tagItem)" class="ml-1 hidden group-hover:block" v-if="isEdit" text type="error" secondary>
							<NIcon size="14">
								<Close></Close>
							</NIcon>
						</NButton>
					</NButton>
				</div>
			</div>
		</main>
	</div>
</template>
