import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useDiscrete } from '@/assets/utils/hooks'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue'),
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
