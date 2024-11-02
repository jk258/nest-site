export enum UserRole {
	admin = 0,
	user = 2,
	tourist = 4,
}

export const userRoles = [
  { label: '管理员', value: UserRole.admin },
  { label: '普通用户', value: UserRole.user },
  { label: '游客', value: UserRole.tourist },
]
