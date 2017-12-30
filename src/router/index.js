import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import SignInOauthToken from '@/components/SignInOauthToken'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
          path: '/',
          name: 'main',
          component: Main
        },
        {
          path: '/sign-in',
          name: 'sign-in',
          component: SignIn
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: SignUp
        },
        {
            path: '/oauth/:provider/token',
            name: 'sign-in-token',
            component: SignInOauthToken
        },
    ]
})
