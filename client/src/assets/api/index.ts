import type { TagType } from '@/assets/api/api'
import request from '@/assets/utils/request'

//#region 标签
export function GetTagList() {
  return request.get('/tag/list')
}
export function TagCreate(data:Pick<TagType,"title">) {
  return request.post('/tag/create',data)
}
export function TagUpdate(data:Omit<TagType,"status">) {
  return request.post('/tag/update',data)
}
//#endregion
// region 网站
export function GetSiteInfo(data:{url:string}) {
  return request.get('/site/info', {
    params: data
  })
}
export function GetSiteList() {
  return request.get('/site/list')
}
export function SiteCreate() {
  return request.post('/site/create')
}
export function SiteUpdate() {
	return request.post('/site/Update')
}
export function SiteDelete() {
  return request.post('/site/delete')
}
//#endregion
