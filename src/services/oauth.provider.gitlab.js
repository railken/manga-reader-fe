import { OAuthProvider } from './oauth.provider';
import { container } from './container';

export class OAuthGitlabProvider extends OAuthProvider
{


	constructor()
	{
		super();
		this.url = "https://gitlab.com/oauth";

		this.client_id = container.get('env').oauth.gitlab.client_id;
		this.client_secret = container.get('env').oauth.gitlab.client_secret;
		this.redirect_uri = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '') + "/oauth/gitlab/token";
	}

	getAuthorizeUrl()
	{

		return this.url+"/authorize"+this.obj_to_query({
			client_id: this.client_id,
			response_type: 'code',
			redirect_uri: this.redirect_uri,
			scope: 'read_user'
		})
	}

	getParamsAccessToken(vars)
	{
		return {
			client_id: this.client_id,
			client_secret: this.client_secret,
			redirect_uri: this.redirect_uri,
			code: vars.code
		};
	}


}