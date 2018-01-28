import Vue from 'vue';
import VueResource from 'vue-resource';
import { container } from '../services/container';
Vue.use(VueResource);

export class LibraryApi
{

	constructor()
	{
		this.url = container.get('env').api.url;
		this.access_token = container.get('services.oauth').getToken();
	}


	/**
	 * Get manga
	 *
	 * @param {mixed} key
	 *
	 * @return {Promise}
	 */
	index(params)
	{
		return Vue.http.get(this.url+"/library", { params: params, headers: { Authorization: "Bearer "+this.access_token }});
	}

	/**
	 * Get manga
	 *
	 * @param {mixed} key
	 *
	 * @return {Promise}
	 */
	get(key)
	{
		return Vue.http.get(this.url+"/library/"+key, { headers: { Authorization: "Bearer "+this.access_token }});
	}


	/**
	 * Get manga
	 *
	 * @param {mixed} key
	 *
	 * @return {Promise}
	 */
	add(key)
	{
		return Vue.http.post(this.url+"/library/"+key, {}, { headers: { Authorization: "Bearer "+this.access_token }});
	}

	/**
	 * Get manga
	 *
	 * @param {mixed} key
	 *
	 * @return {Promise}
	 */
	remove(key)
	{
		return Vue.http.delete(this.url+"/library/"+key, { headers: { Authorization: "Bearer "+this.access_token }});
	}

};