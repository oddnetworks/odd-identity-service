const _ = require('lodash');

module.exports = (bus, options) => {
	return (req, res, next) => {
		req.identity = req.identity || {};

		bus.query({role: 'identity', cmd: 'fetchDevice'}, {id: _.get(req, options.hash)})
			.then(device => {
				req.identity.device = device;

				return bus.query({role: 'identity', cmd: 'fetchOrganization'}, {id: req.identity.device.organization})
			})
			.then(organization => {
				req.identity.organization = organization;

				next();
			})
			.catch(err => {
				next(err);
			});
	};
};
