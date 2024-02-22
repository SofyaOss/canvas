import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from "../components/pages/MainPage.vue"
import ImagePage from "../components/pages/ImagePage.vue"

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage
    },
    {
        path: '/image',
        name: 'image',
        component: ImagePage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router