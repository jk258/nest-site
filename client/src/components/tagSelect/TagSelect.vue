<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NSelect, NButton, type InputInst } from 'naive-ui'
import { GetTagList, TagCreate } from '@/assets/api'
import type { TagType } from '@/assets/api/api'

const selectValue = defineModel<number[]>('value', {
  required: true,
  default:[]
})
const options = ref<TagType[]>([])
function getList() {
	GetTagList().then((res) => {
		options.value = res.data
	})
}
getList()
const tagInput = ref<InputInst|null>(null)
const tagTitle = ref('')
const createTag = () => {
	if (tagTitle.value) {
		TagCreate({
			title: tagTitle.value,
    }).then(res => {
      options.value.push(res.data)
      tagTitle.value = ''
      selectValue.value.push(res.data.id)
    })
  } else {
    tagInput.value?.focus()
  }
}
</script>
<template>
	<NSelect v-model:value="selectValue" filterable multiple  :options="options" label-field="title" value-field="id">
		<template #action>
			<div class="flex items-center">
				<NInput class="flex-1 mr-3" ref="tagInput" v-model:value="tagTitle"></NInput>
				<NButton type="primary" @click="createTag">添加</NButton>
			</div>
		</template>
	</NSelect>
</template>

<style scoped></style>
