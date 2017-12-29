export class ApiResource
{
	
	constructor(container, token)
	{	
		this.token = token;
		this.container = container;
	}

	common(method, url, vars) {
		this.container.get('services.api').basicCall(method, this.container.get('env').api.url+url, {
			params: vars.params , 
			headers: {
				Authorization: "Bearer "+this.token
			},
			success: function(response) {
				vars.success(response);
			},
			error: function(response) {
				vars.error(response);
			}
		});
	}

	all(vars)
	{
		this.common('GET', this.url, vars);
	}
	
	create(vars)
	{
		this.common('POST', this.url, vars);
	}
	
	update(id, vars)
	{
		this.common('PUT', this.url + "/" + id, vars);
	}
	
	show(id, vars)
	{
		this.common('GET', this.url + "/" + id, vars);
	}
	
	remove(id, vars)
	{
		this.common('GET', this.url + "/" + id, vars);
	}
}