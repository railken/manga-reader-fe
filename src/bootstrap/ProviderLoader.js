export class ProviderLoader
{

	constructor()
	{

	}

	addProviders (providers) {
		this.providers = providers
	}
	
	execute (i)
	{

		if (typeof this.providers[i] === "undefined")
			return;

		var self = this;

		this.providers[i](function() {
			self.execute(i+1)
		})
	}
};