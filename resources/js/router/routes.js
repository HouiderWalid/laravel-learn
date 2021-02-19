import Vue from "vue"
import VueRouter from "vue-router"
import LoginPage from "../components/login_page"
import RegisterPage from "../components/register_page"
import HomePage from "../components/home_page"
import RootPage from "../components/root_page"
import ProviderPage from "../components/auth-provider/provider_page"
import ProfilePage from "../components/profile_page"
import DashboardPage from "../components/dashboard_page"
import EmailSendFeedBack from "../components/EmailSendFeedBack";
import ResetPasswordPage from "../components/reset_password_page"
import ResetPasswordCallbackPage from "../components/reset_password_callback_page"
import NotFoundPage from "../components/not_found_page"
import store from '../store'
import { checkAuth, preventAuth } from './middlewares'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: RootPage,
        children: [
            {
                name: 'test',
                path: 'test',
                component: () => import(/* webpackChunkName: "testPage" */ '../components/test_page'),
                children: [
                    {
                        path: '',
                        component: () => import(/* webpackChunkName: "testPage" */ '../components/main_page'),
                    },
                    {
                        name: 'laptop',
                        path: '/laptop',
                        component: () => import(/* webpackChunkName: "laptopPage" */ '../components/laptop_page')
                    },
                    {
                        name: 'desktop',
                        path: '/desktop',
                        component: () => import(/* webpackChunkName: "desktopPage" */ '../components/desktop_page')
                    },
                    {
                        name: 'accessory',
                        path: '/accessory',
                        component: () => import(/* webpackChunkName: "accessoryPage" */ '../components/accessory_page')
                    },
                    {
                        name: 'contact',
                        path: '/contact',
                        component: () => import(/* webpackChunkName: "contactPage" */ '../components/contact_page')
                    }
                ]
            },
            {
                name:'login',
                path: 'login',
                component: LoginPage,
                meta: {
                    middleware: [
                        preventAuth
                    ]
                }
            },
            {
                name:'reset-password',
                path: 'reset/password',
                props: true,
                component: ResetPasswordPage,
                meta: {
                    middleware: [
                        preventAuth
                    ]
                }
            },
            {
                name:'reset-password-callback',
                path: 'reset/password/callback',
                component: ResetPasswordCallbackPage,
                meta: {
                    middleware: [
                        preventAuth
                    ]
                }
            },
            {
                name:'register',
                path: 'register',
                component: RegisterPage,
                meta: {
                    middleware: [
                        preventAuth
                    ]
                }
            },
            {
                name:'login_provider',
                path: 'login/:provider',
                component: ProviderPage,
                meta: {
                    middleware: [
                        preventAuth
                    ]
                }
            },
            {
                path: '',
                component: HomePage,
                meta: {
                    middleware: [
                        checkAuth
                    ]
                },
                children: [
                    {
                        path: '',
                        component: DashboardPage,
                        meta: {
                            middleware: [
                                checkAuth
                            ]
                        }
                    },
                    {
                        name:'dashboard',
                        path: 'dashboard',
                        component: DashboardPage,
                        meta: {
                            middleware: [
                                checkAuth
                            ]
                        }
                    },
                    {
                        name:'profile',
                        path: 'profile',
                        component: ProfilePage,
                        meta: {
                            middleware: [
                                checkAuth
                            ]
                        }
                    }
                ]
            },
            {
                name: 'reset_password_message',
                path: 'reset/password/message',
                component: EmailSendFeedBack,
                props: true,
                meta: {
                    middleware: [

                    ]
                },
            }
        ]
    },
    {
        name: 'not_found',
        path: '*',
        component: NotFoundPage
    }
]

const appRoutes = new VueRouter({
    mode: 'history',
    routes
});

appRoutes.beforeEach((to, from, next) => {
    if (to.meta.middleware && to.meta.middleware.length > 0) {
        to.meta.middleware[0]({store, next})
    }
    next()
})

export default appRoutes
