import Vue from 'vue';
import VueResource from 'vue-resource';
import { container } from '../services/container';
Vue.use(VueResource);

export class MangaApi
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
		return Vue.http.get(this.url+"/manga", { params: params, headers: { Authorization: "Bearer "+this.access_token }});
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
		return Vue.http.get(this.url+"/manga/"+key, { headers: { Authorization: "Bearer "+this.access_token }});
	}

	/**
	 * Get chaters
	 *
	 * @param {mixed} key
	 *
	 * @return {Promise}
	 */
	getChapters(key)
	{
		return Vue.http.get(this.url+"/manga/"+key+"/chapters", { params: { show: 9999, sort_direction: 'desc', sort_field: 'number' }, headers: { Authorization: "Bearer "+this.access_token }});
	}

	/**
	 * Get latest chaters
	 *
	 * @param {object} params
	 *
	 * @return {Promise}
	 */
	getLatestChapters(params)
	{
		return Vue.http.get(this.url+"/chapters", { params: { show: params.show, page: params.page, sort_direction: 'desc', sort_field: 'released_at' }, headers: { Authorization: "Bearer "+this.access_token }});
	}

	/**
	 * Get latest chaters
	 *
	 * @param {object} params
	 *
	 * @return {Promise}
	 */
	getLatestReleases(params)
	{
		return Vue.http.get(this.url+"/manga", { params: { show: params.show, page: params.page, sort_direction: 'desc', sort_field: 'last_chapter_released_at' }, headers: { Authorization: "Bearer "+this.access_token }});
	}

	/**
	 * Get chater
	 *
	 * @param {mixed} key
	 * @param {string} number
	 *
	 * @return {Promise}
	 */
	getChapter(key, number)
	{
		return Vue.http.get(this.url+"/manga/"+key+"/chapters/"+number, { headers: { Authorization: "Bearer "+this.access_token }});
	}

	/**
	 * Request chapters
	 *
	 * @param {mixed} key
	 *
	 * @return {Promise}
	 */
	requestChapters(key)
	{
		return Vue.http.post(this.url+"/manga/"+key+"/chapters", {}, { headers: { Authorization: "Bearer "+this.access_token }});
	}

};