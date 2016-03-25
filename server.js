require('dotenv').config({silent: true});

const oddcast = require('oddcast');
const express = require('express');

const service = require('./service');

const bus = oddcast.bus();
const server = express();

bus.requests.use({}, oddcast.inprocessTransport());

service.initialize(bus, {
	redis: {
		uri: process.env.REDIS_URI
	}
});

server.use(service.router(bus));

if (!module.parent) {
	server.listen(process.env.PORT, (err) => {
		console.log('Identity Server running on port ' + process.env.PORT);
	});
};

module.export = server;
