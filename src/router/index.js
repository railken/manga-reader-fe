import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import SignIn from '@/components/SignIn'
import SignInOauthToken from '@/components/SignInOauthToken'

import SignUp from '@/components/SignUp'
import SignUpEmailSent from '@/components/SignUpEmailSent'
import TokenConfirmEmail from '@/components/TokenConfirmEmail'
import SignUpEmailRequest from '@/components/SignUpEmailRequest'
import Manga from '@/components/Manga'
import MangaRequest from '@/components/MangaRequest'
import MangaChapter from '@/components/MangaChapter'
import Guard from '../middlewares/Guard'



Vue.use(Router);

export default new Router({
	mode: 'history',
	hashbang: false,
	history: true,
	routes: [
		{
			path: '/',
			name: 'main',
			component: Main,
			beforeEnter: Guard.auth
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
		{
			path: '/manga/:slug',
			name: 'manga',
			component: Manga,
			beforeEnter: Guard.auth
		},
		{
			path: '/manga/:slug/request',
			name: 'manga.request',
			component: MangaRequest,
			beforeEnter: Guard.auth
		},
		{
			path: '/manga/:slug/:chapter',
			name: 'manga.chapter',
			component: MangaChapter,
			beforeEnter: Guard.auth

		},
	]
})
