import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import SignInOauthToken from '@/components/SignInOauthToken'

import SignUp from '@/components/SignUp'
import SignUpEmailSent from '@/components/SignUpEmailSent'
import TokenConfirmEmail from '@/components/TokenConfirmEmail'
import SignUpEmailRequest from '@/components/SignUpEmailRequest'

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
			path: '/oauth/:provider/token',
			name: 'sign-in-token',
			component: SignInOauthToken
		},
		
		{
			path: '/sign-up',
			name: 'sign-up',
			component: SignUp
		},
		{
			path: '/sign-up/email-sent',
			name: 'sign-up.email-sent',
			component: SignUpEmailSent
		},
		{
			path: '/request-confirmation-email',
			name: 'sign-up.email-request',
			component: SignUpEmailRequest
		},
		{
			path: '/confirm-email/:token',
			component: TokenConfirmEmail
		},
	]
})
