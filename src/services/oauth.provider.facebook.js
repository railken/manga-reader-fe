import { OAuthProvider } from './oauth.provider';
import { container } from './container';

export class OAuthFacebookProvider extends OAuthProvider
{

	constructor()
	{
		super();
		this.url = "https://www.facebook.com/v2.9";

		this.client_id = container.get('env').oauth.facebook.client.id;
		this.client_secret = container.get('env').oauth.facebook.client.secret;
		this.redirect_uri = container.get('env').oauth.facebook.redirect;
	}

	getAuthorizeUrl()
	{
		return this.url+"/dialog/oauth"+this.obj_to_query({
			client_id: this.client_id,
			scope: 'email',
			redirect_uri: this.redirect_uri
		})
	}

	getParamsAccessToken(vars)
	{
		return {
			redirect_uri: this.redirect_uri,
			client_id: this.client_id,
			client_secret: this.client_secret,
			code: vars.code
		};
	}

}