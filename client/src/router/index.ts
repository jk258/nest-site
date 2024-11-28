import { createRouter, createWebHistory } from 'vue-router'
import { useDiscrete } from '@/assets/utils/hooks'


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/HomeView.vue'),
		},
		{
			path: '/set',
			name: 'set',
			component: () => import('@/views/set/Set.vue'),
		},
		{
			path: '/sitedetail',
			name: 'site',
			component: () => import('@/views/SiteDetail.vue'),
		},
		{
			path: '/userlist',
			name: '用户管理',
			component: () => import('@/views/userlist/UserList.vue'),
		},
		{
			path: '/login',
			name: '登录',
			component: () => import('@/views/Login.vue'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: () => import('@/views/HomeView.vue'),
		},
	],
})
const discrete = useDiscrete()
router.beforeEach((to, from, next) => {
	if (discrete.loadingBar) {
		discrete.loadingBar.start()
	}
	next()
})
router.afterEach((to, from) => {
	if (discrete.loadingBar) {
		discrete.loadingBar.finish()
	}
})
export default router
