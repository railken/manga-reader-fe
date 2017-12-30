import Vue from 'vue';
import VueResource from 'vue-resource';
import { container } from '../services/container';
Vue.use(VueResource);

export class UserApi
{

	constructor()
	{
		this.url = container.get('env').api.url;
	}

	/**
	 * Sign in 
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	signIn(params)
	{
		return Vue.http.post(this.url+"/sign-in", params);
	}

	/**
	 * Request the provider access_token from code
	 *
	 * @param {string} provider_name
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	oauthProviderRequestToken(provider_name, params)
	{
		return Vue.http.post(this.url+"/oauth/"+provider_name+"/access_token", params).then(response => {
			params.access_token = response.body.access_token;
			return this.oauthProviderExchangeToken(provider_name, params);
		});
	}

	/**
	 * Convert an external access_token to internal access_token
	 *
	 * @param {string} provider_name
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	oauthProviderExchangeToken(provider_name, params)
	{
		return Vue.http.post(this.url+"/oauth/"+provider_name+"/exchange_token", params);
	}

	/**
	 * Sign up 
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	signUp(params)
	{
		return Vue.http.post(this.url+"/sign-up", params);
	}

	/**
	 * Get user
	 *
	 * @param {String} access_token
	 *
	 * @return {Promise}
	 */
	getUser(access_token)
	{
		return Vue.http.get(this.url+"/user", { headers: {
            Authorization: "Bearer "+access_token
        }});
	}

};