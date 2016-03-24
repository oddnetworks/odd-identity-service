const router = require('express').Router();

module.exports = (bus, options) => {
	router.get('/organizations/:id', (req, res) => {
		bus.query({role: 'identity', cmd: 'fetchOrganization'}, {id: req.params.id})
			.then(organization => {
				res.send(organization);
			});
	});

	router.get('/devices/:id', (req, res) => {
		bus.query({role: 'identity', cmd: 'fetchDevice'}, {id: req.params.id})
			.then(device => {
				res.send(device);
			});
	});

	return router;
};
