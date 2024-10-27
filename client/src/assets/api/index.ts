import type { SiteType, TagType } from '@/assets/api/api'
import request from '@/assets/utils/request'

/**
 * 登录
 */
export function Login(data: { username: string; password: string }) {
	return request.post('/auth/login', data)
}
/**获取用户信息 */
export function GetUserInfo() {
  return request.get('/auth/profile')
}
//#region 标签
/**获取标签列表 */
export function GetTagList() {
  return request.get('/tag/list')
}
/**创建标签 */
export function TagCreate(data:Pick<TagType,"title">) {
  return request.post('/tag/create',data)
}
/**修改标签 */
export function TagUpdate(data:Omit<TagType,"status">) {
  return request.post('/tag/update',data)
}
/**删除标签 */
export function TagDelete(data:Pick<TagType,"id">) {
  return request.post('/tag/delete',data)
}
//#endregion
// region 网站
/**根据网址获取网页信息 */
export function GetSiteInfo(data:{url:string}) {
  return request.get('/site/info', {
    params: data
  })
}
/**获取书签列表 */
export function GetSiteList() {
  return request.get('/site/list')
}
/**获取书签详情 */
export function GetSiteDetail(data:Pick<SiteType,'id'>) {
  return request.get('/site/detail', {
    params:data
  })
}
/**创建书签 */
export function SiteCreate(data: Omit<SiteType,'id'>) {
	return request.post('/site/create', data)
}
/**修改书签 */
export function SiteUpdate(data: SiteType) {
	return request.post('/site/Update',data)
}
/**删除书签 */
export function SiteDelete(data:Pick<SiteType,'id'>) {
  return request.post('/site/delete',data)
}
//#endregion
