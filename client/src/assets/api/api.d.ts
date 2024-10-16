

export interface TagType{
  id: number
  title: string
  status:number
}


export interface SiteType{
  id: number
  title: string
  url: string
  logo: string
  desc?:string
  tags: string
}
export interface SiteListType extends SiteType {
	tags: TagType[]
}
