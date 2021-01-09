# Node MQTT Demo

This is a very basic demo of using the [MQTT package](https://www.npmjs.com/package/mqtt) with Node.js to send messages between a set of fake sensors, and a server.

This demo uses the free [HiveMQ MQTT broker](http://www.mqtt-dashboard.com/).  You can read more about how MQTT works [here](http://www.hivemq.com/blog/mqtt-essentials-part-1-introducing-mqtt).

Alternatively you could install your own MQTT broker, for example [Mosquitto](https://test.mosquitto.org/).

## Setup

* Install [Node.js](https://nodejs.org)
* Clone this repo, then:

```
cd nodemqtt
npm install
```

## Starting the Components

There are two components, the "server" (see `server.js`), and the "sensor" (see `sensor.js`).  You should start one server and one or more sensor instances.

### Starting the Server

Start the server first, with:

```
npm start
```

If all goes well it should connect to the MQTT broker, and output something similar to:

```
$ npm start

> nodemqtt@0.0.1 start /Users/simon/source/projects/nodemqtt
> node server.js

Server is waiting for messages.
```

Nothing else will happen until you start at least one sensor.

### Starting Sensor(s)

Each sensor has an ID number.  The one provided has ID 0 and is configured in `package.json`:

```
"scripts": {
  "sensor": "node sensor.js 0"
},
```

To start this, simply use:

```
npm run sensor
```

Once started the sensor should push MQTT messages into the broker every 5 seconds, each message containing the sensor ID number and the current date and time.  If running successfully, output from the sensor should look like:

```
$ npm run sensor

> nodemqtt@0.0.1 sensor /Users/simon/source/projects/nodemqtt
> node sensor.js 0

Started sensor 0
Sending data: 0|Thu Apr 20 2017 09:55:02 GMT-0700 (PDT)
Sending data: 0|Thu Apr 20 2017 09:55:07 GMT-0700 (PDT)
```

And if the server is running, it should start receiving messages and logging those:

```
$ npm start

> nodemqtt@0.0.1 start /Users/simon/source/projects/nodemqtt
> node server.js

Server is waiting for messages.
Registering sensor ID: 0
Received sensor message: 0|Thu Apr 20 2017 09:55:02 GMT-0700 (PDT)
Received sensor message: 0|Thu Apr 20 2017 09:55:07 GMT-0700 (PDT)
Received sensor message: 0|Thu Apr 20 2017 09:55:12 GMT-0700 (PDT)
Received sensor message: 0|Thu Apr 20 2017 09:55:17 GMT-0700 (PDT)
Received sensor message: 0|Thu Apr 20 2017 09:55:22 GMT-0700 (PDT)
Received sensor message: 0|Thu Apr 20 2017 09:55:27 GMT-0700 (PDT)
```

To start more than one instance of the sensor, add more lines to the `scripts` section of `package.json` and invoke `npm` to run them e.g.:

```
"scripts": {
  "sensor": "node sensor.js 0",
  "sensor1": "node sensor.js 1"
},
```

Then start sensor1:

```
npm run sensor1
```

The server should then start reporting output from both sensors:

```
Received sensor message: 0|Thu Apr 20 2017 09:58:22 GMT-0700 (PDT)
Registering sensor ID: 1
Received sensor message: 0|Thu Apr 20 2017 09:58:27 GMT-0700 (PDT)
Received sensor message: 1|Thu Apr 20 2017 09:58:29 GMT-0700 (PDT)
Received sensor message: 0|Thu Apr 20 2017 09:58:32 GMT-0700 (PDT)
Received sensor message: 1|Thu Apr 20 2017 09:58:34 GMT-0700 (PDT)
```

## Configuration

Basic configuration information is contained in `common.js` which exposes an object containing topic names and broker URL:

```
module.exports = {
  MQTT_BROKER: 'broker.hivemq.com',
  REGISTER_TOPIC: 'sensor/register',
  DATA_TOPIC: 'sensor/data'
};
```
