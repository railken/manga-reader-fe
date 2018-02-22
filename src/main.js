

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { OAuth } from './services/oauth';
import { container } from './services/container';
import { ProviderLoader } from './bootstrap/ProviderLoader';
import * as Cookies from "js-cookie";
import Notifications from 'vue-notification';
import VueLocalStorage from 'vue-localstorage';
import BootstrapVue from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import Logo from './components/Logo.vue'


Vue.use(BootstrapVue);
Vue.use(VueLocalStorage);
Vue.use(Notifications);
Vue.use(VueI18n);
    


Vue.config.productionTip = false;
window.moment = require('moment');
window.Tether = require('tether');


var Cropper = require('cropperjs');
require('cropperjs/dist/cropper.min.css');


/* eslint-disable no-new */
container.set('router', router);

const queryString = require('query-string');

container.set('env', require('./../config/local.env'));

container.set('request', {
	route: window.location.pathname,
	query: queryString.parse(location.search)
});

container.set('services.oauth', new OAuth());
container.set('services.cookies', Cookies);

container.set('date', require('moment'));
container.get('date').locale('en', {
  week: { dow: 1 } // Monday is the first day of the week
});



var UserProvider = function(next) {

	container.get('services.oauth').authenticate().then(response => {
       	container.set('user', response.body.data.resource);
       	window.user = container.get('user');
       	next();

    }).catch(error => {
       	next();
    });

}

var VueProvider = function(next) {
	new Vue({
		i18n: new VueI18n({
		    locale: 'en',
		    messages: {
		      en: require('./lang/en.json'),
		    }
		}),
	  	el: '#app',
	  	router,
	  	template: '<App/>',
	  	components: { App },
	  	data: {
	  		container: container,
	  		user: container.get('user')
	  	}
	});

	next();
}
Vue.component('logo', Logo);


var pl = new ProviderLoader();
pl.addProviders([
	UserProvider,
	VueProvider,
]);
pl.execute(0);

