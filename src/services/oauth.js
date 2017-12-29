
import { OAuthGithubProvider } from './oauth.provider.github';
import { OAuthGitlabProvider } from './oauth.provider.gitlab';
import { OAuthGoogleProvider } from './oauth.provider.google';
import { OAuthFacebookProvider } from './oauth.provider.facebook';

import { container } from './container';


export class OAuth
{

	/**
	 * Sign in
	 *
	 * @param {User} user
	 *
	 * @return {Observable}
	 */
	providerSignIn(provider, vars)
	{


		provider = this.getProviderByName(provider);


		window.location.href = provider.getAuthorizeUrl();

	}

	providerSignInCode(provider_name, vars)
	{

		var provider = this.getProviderByName(provider_name);
		var params = provider.getParamsAccessToken(vars.params);


		var r = container.get('services.client');

		var r1 = function(params) {
			r.basicCall("GET", container.get('env').api.url+"/oauth/"+provider_name+"/access_token", {
				params: params , 
				success: function(response) {
					r2(params, response.access_token);
				},
				error: function(response) {
					vars.error(response);
				}
			});
		};


		var r2 = function(params, access_token) {
			params.access_token = access_token;
			r.basicCall("GET", container.get('env').api.url+"/oauth/"+provider_name+"/exchange_token", {
				params: params, 
				success: function(response) {
        			container.get('services.cookies').set(container.get('env').cookies.token, response.access_token);
					vars.success(response);
				},
				error: function(response) {
					vars.error(response);
				}
			});
		}

		params.access_token ? r2(params, params.access_token) : r1(params);

	}

	signIn(vars)
	{


		var r = container.get('services.client');

		r.basicCall("POST", container.get('env').api.url+"/sign-in", {
			params: vars.params , 
			success: function(response) {

    			container.get('services.cookies').set(container.get('env').cookies.token, response.data.access_token);
				vars.success(response);
			},
			error: function(response) {
				vars.error(response);
			}
		});

	}

	getProviderByName(provider)
	{	
		console.log(provider);
		
		var providers = {
			github: new OAuthGithubProvider(),
			gitlab: new OAuthGitlabProvider(),
			google: new OAuthGoogleProvider(),
			facebook: new OAuthFacebookProvider(),
		};

		return typeof providers[provider] !== "undefined" ? providers[provider] : null;
	}

	loadUser(vars)
	{
		var access_token = container.get('services.cookies').get(container.get('env').cookies.token);
		this.access_token = access_token;

		console.log(this.access_token);

        if (access_token) {

            // Verify access_token

            container.get('services.client').basicCall("GET", container.get('env').api.url+"/user", {
                headers: {
                    Authorization: "Bearer "+access_token
                },
                success: function(response) {
                	vars.success(response);
                },
                error: function(response) {
                	vars.error(response);
                }
            });

            return;

        }
        vars.error();
	}

	logout()
	{
		container.get('services.cookies').remove(container.get('env').cookies.token);
	}
	
}