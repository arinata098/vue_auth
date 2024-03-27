import { createRouter, createWebHashHistory } from "vue-router";

import Home from '../components/Home.vue';

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/login', name: 'Login', component: () => import("../components/Login.vue")},
    { path: '/register', name: 'Register', component: () => import("../components/Register.vue")},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;