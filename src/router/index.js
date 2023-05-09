import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/registration/Register.vue'
import Name from '../components/registration/Name.vue'
import Rules from '../components/registration/Rules.vue'
import Image from '../components/registration/Image.vue'
import Birthdate from '../components/registration/Birthdate.vue'
import Gender from '../components/registration/Gender.vue'
import Location from '../components/registration/Location.vue'
import School from '../components/registration/School.vue'
import Bio from '../components/registration/Bio.vue'
import GenderInterest from '../components/registration/GenderInterest.vue'
import Credentials from '../components/registration/Credentials.vue'
import Success from '../components/registration/SuccessPage.vue'
import UserPage from '../views/UserPage.vue'
import Feed from '../components/user-page/Feed.vue'
import Profile from '../components/user-page/Profile.vue'
import Chat from '../components/user-page/Chat.vue'
import Match from '../components/user-page/Match.vue'
import Message from '../components/user-page/Message.vue'
import Settings from '../components/user-page/Settings.vue'
import Admin from '../components/admin/Admin.vue'
import Dashboard from '../components/admin/Dashboard.vue'
import Login from '../components/admin/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      children: [
        { path: '', component: Rules, name: 'rules' },
        { path: 'name', component: Name, name: 'name' },
        { path: 'image', component: Image, name: 'image' },
        { path: 'birthdate', component: Birthdate, name: 'birthdate' },
        { path: 'gender', component: Gender, name: 'gender' },
        { path: 'location', component: Location, name: 'location' },
        { path: 'school', component: School, name: 'school' },
        { path: 'gender-interest', component: GenderInterest, name: 'gender-interest' },
        { path: 'bio', component: Bio, name: 'bio' },
        { path: 'credentials', component: Credentials, name: 'credentials' },
        { path: 'success', component: Success, name: 'success' }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: UserPage,
      children: [
        { path: 'feed', component: Feed, name: 'feed' },
        { path: 'profile', component: Profile, name: 'profile' },
        { path: 'chat', component: Chat, name: 'chat' },
        { path: 'matches', component: Match, name: 'matches' },
        { path: 'chat/:id', component: Message, name: 'message', props: true },
        { path: 'settings', component: Settings, name: 'settings'}
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'login', component: Login, name: 'login-admin'
        },
        {
          path: 'dashboard', component: Dashboard, name: 'dashboard'
        }
      ]
    }
  ]
})

export default router
