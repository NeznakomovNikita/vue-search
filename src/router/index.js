import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/components/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: Search
  }

]

const router = new VueRouter({
  routes
})

export default router
