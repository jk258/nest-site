<script setup lang="ts">
import { NTag } from 'naive-ui';
import { ref } from 'vue'

const item = ref({
	id: 0,
	title: '百度一下，你就知道',
	url: 'https://www.baidu.com/',
	logo: 'https://www.baidu.com/favicon.ico',
	description: '全球领先的中文搜索引擎、致力于让网民更便捷地获取信息，找到所求。百度超过千亿的中文网页数据库，可以瞬间找到相关的搜索结果。',
	tags: [
		{
			id: 1,
			title: '百度',
		},
		{
			id: 2,
			title: '搜索',
		},
	],
	status: 0,
})
</script>
<template>
	<a class="block" :href="item.url" target="_blank" rel="noopener noreferrer">
		<h4 class="flex items-center gap-2">
			<img class="w-5 h-5 object-cover" :src="item.logo" :alt="item.title" />
			<span class="font-bold text-primaryColor text-fontSizeMedium">{{ item.title }}</span>
		</h4>
    <div>
      <NTag v-for="tag in item.tags" :key="tag.id" checkable @click.stop="" size="small">{{ tag.title }}</NTag>
    </div>
    <p class="text-fontSizeSmall text-textColor3 ">{{ item.description }}</p>
    <div>
      <span>2021-04-05</span>
      <div>
        <span>编辑</span>
        <span>删除</span>
      </div>
    </div>
	</a>
</template>

<style scoped></style>
