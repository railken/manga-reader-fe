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
import Dashboard from '@/components/Dashboard'
import Searcher from '@/components/Searcher'
import Library from '@/components/Library'
import LatestReleases from '@/components/LatestReleases'
import PageNotFound from '@/components/PageNotFound'
import UserSettings from '@/components/UserSettings'
import UserSettingsProfile from '@/components/UserSettingsProfile'
import UserSettingsEmail from '@/components/UserSettingsEmail'
import UserSettingsAccount from '@/components/UserSettingsAccount'
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
			children: [
				{
					path: '/',
					name: 'dashboard',
					component: Dashboard,
				},
				{
					path: '/search',
					name: 'searcher',
					component: Searcher,
				},
				{
					path: '/library',
					name: 'library',
					component: Library,
					beforeEnter: Guard.auth,
				},
				{
					path: '/latest-releases',
					name: 'latest-releases',
					component: LatestReleases,
				},
				{
					path: '/manga/:slug',
					name: 'manga',
					component: Manga,
				},
				{
					path: '/manga/:slug/request',
					name: 'manga.request',
					component: MangaRequest,
				},
				{
					path: '/manga/:slug/:chapter',
					name: 'manga.chapter',
					component: MangaChapter,

				},
				{
					path: '/user/settings',
					name: 'user.settings',
					component: UserSettings,
					beforeEnter: Guard.auth,
					children: [
						{
							path: 'profile',
							name: 'user.settings.profile',
							component: UserSettingsProfile,
						},
						{
							path: 'email',
							name: 'user.settings.email',
							component: UserSettingsEmail,
						},
						{
							path: 'account',
							name: 'user.settings.account',
							component: UserSettingsAccount,
						},
					]
				},

			]
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
        	path: "*", 
        	name: "404",
        	component: PageNotFound
        }
	]
})
