import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import Logout from '@/pages/Logout'
import Signup from '@/pages/Signup'
import RecordList from '@/pages/RecordList'
import RecordAdd from '@/pages/RecordAdd'
import Record from '@/pages/Record'
import UserList from '@/pages/UserList'
import UserAdd from '@/pages/UserAdd'
import User from '@/pages/User'
import UserConfig from '@/pages/UserConfig'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { skipAuth: true} },
    { path: '/logout', name: 'logout', component: Logout, meta: { skipAuth: true} },
    { path: '/signup', name: 'signup', component: Signup, meta: { skipAuth: true} },
    { path: '/', component: Layout, children: [
      { path: '', redirect: { name: 'record-list' }, name: 'index' },
      { path: 'records', name: 'record-list', component: RecordList },
      { path: 'records/add', name: 'record-add', component: RecordAdd },
      { path: 'records/:id', name: 'record-view', component: Record, props: true },
      { path: 'users', name: 'user-list', component: UserList, meta: { manager: true } },
      { path: 'users/add', name: 'user-add', component: UserAdd, meta: { manager: true } },
      { path: 'users/:id', name: 'user-view', component: User, meta: { manager: true }, props: true },
      { path: 'config', name: 'user-config', component: UserConfig },
    ]}
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.skipAuth)) {
    if (!localStorage.getItem('calorie-token')) {
      next({
        name: 'login',
      })
      return
    }
  }
  if (to.matched.some(record => record.meta.manage)) {
    const userRole = parseInt(localStorage.setItem('user-role'))
    if (!userRole) {
      next({
        name: 'record-list',
      })
      return
    }
  }
  next()
})

export default router
