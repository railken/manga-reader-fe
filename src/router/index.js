import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import SignInOauthToken from '@/components/SignInOauthToken'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'Main',
          component: Main
        },
        {
          path: '/sign-in',
          name: 'SignIn',
          component: SignIn
        },
        {
            path: '/oauth/:provider/token',
            name: 'SignInOauthToken',
            component: SignInOauthToken
        },
    ]
})
