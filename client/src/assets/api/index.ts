import type { Tag } from '@/assets/api/api'
import request from '@/assets/utils/request'

//#region 标签
export function GetTagList() {
  return request.get('/tag/list')
}
export function TagCreate(data:Pick<Tag,"title">) {
  return request.post('/tag/create',data)
}
export function TagUpdate(data:Omit<Tag,"status">) {
  return request.post('/tag/update',data)
}
//#endregion
// region 网站
export function GetSiteInfo(data:{url:string}) {
  return request.get('/site/info', {
    params: data
  })
}
//#endregion
