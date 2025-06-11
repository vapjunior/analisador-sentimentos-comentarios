import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'ProductView',
    component: () => import('@/views/ProductView.vue'),
    meta: {
      title: 'Produto - Análise de Sentimentos'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Atualiza o título da página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Análise de Sentimentos | Build With A.I.'
  next()
})

export default router 