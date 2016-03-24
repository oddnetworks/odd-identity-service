# Odd Identity Service

## Service

Attaching the service into a pre-existing Oddcast network.

```js
const oddcast = require('oddcast');
const identityService = require('odd-identity-service');

const bus = oddcast.bus();

bus.requests.use({}, oddcast.inprocessTransport());

identityService.initialize(bus, {
	redis: {
		uri: process.env.REDIS_URI
	}
});
```

## Middleware

Attaching middleware to a pre-existing Express app. This will create a `req.identity` object with `organization` and `device` properties.

**options**
* hash: the path off the `req` object to the device ID to begin the lookup

```js
const oddcast = require('oddcast');
const identityService = require('odd-identity-service');

const bus = oddcast.bus();

bus.requests.use({}, oddcast.inprocessTransport());

identityService.initialize(bus, {
	redis: {
		uri: process.env.REDIS_URI
	}
});

app.use(identityService.middleware(bus, {hash: 'headers.accessToken.deviceId'}));
```

## Router

If you would like to expose REST routes for organizations and devices the service also offers an Express router you can attach to an existing Express app.

* /organizations/:id
* /devices/:id

```js
const oddcast = require('oddcast');
const express = require('express');

const identityService = require('odd-identity-service');

const bus = oddcast.bus();
const app = express();

bus.requests.use({}, oddcast.inprocessTransport());

identityService.initialize(bus, {
	redis: {
		uri: process.env.REDIS_URI
	}
});

// Attach the service router to /identity
app.use('/identity', identityService.router(bus));

app.get('/', (req, res) => {
	res.send('Server online!');
});

app.listen(3000);
```

## API

There is also a fully Express app you can just run without writing any code.

**Environment Variables**
* PORT: the port to run the server on
* REDIS_URI: the URI of your Redis server where the data lives

```
node api.js
```
