import { createDiscreteApi,  type PaginationInfo } from 'naive-ui'
import {  ref } from 'vue'

export function useDiscrete() {
	return createDiscreteApi(['message', 'dialog', 'loadingBar'], {})
}

/**
 * 表格列表
 * @param getListData
 * @returns
 */
export function useTablePageLoad(getListData: () => void) {
	const loading = ref(false)
	const pagination = ref({
		itemCount: 0,
		pageSizes: [10, 20, 30, 40],
		page: 1,
		simple: false,
		pageSize: 10, //每页条数
		showQuickJumper: true, //快速条状
		showSizePicker: true, //显示每页条数的选择器
		prefix({ itemCount }: PaginationInfo) {
			return itemCount ? `共 ${itemCount} 条` : ''
		},
		//page 改变时触发的回调函数
		onUpdatePage(page: number) {
			if (loading.value) {
				return false
			}
			pagination.value.page = page
			getListData()
		},

		//page-size 改变时触发的回调函数
		onUpdatePageSize(pageSize: number) {
			if (loading.value) {
				return false
			}
			pagination.value.pageSize = pageSize
			getListData()
		},
	})
	return { loading, pagination }
}
