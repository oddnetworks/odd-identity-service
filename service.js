const cryo = require('cryo');
const Promise = require('bluebird');
const redis = require('redis');
Promise.promisifyAll(redis);

const ROLE = 'identity';

exports.initialize = (bus, options) => {
	const redisClient = redis.createClient(options.redis.uri);

	bus.queryHandler({role: ROLE, cmd: 'fetchOrganization'}, payload => {
		return redisClient.hgetAsync('identity_organization', payload.id)
			.then(organization => {
				return cryo.parse(organization);
			});
	});

	bus.queryHandler({role: ROLE, cmd: 'fetchDevice'}, payload => {
		return redisClient.hgetAsync('identity_device', payload.id)
			.then(device => {
				return cryo.parse(device);
			});
	});
};

exports.middleware = require('./middleware');
exports.router = require('./router');
