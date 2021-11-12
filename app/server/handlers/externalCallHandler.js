'use strict'

const logger = require("./logger");
var request = require('request'),
	format = require('format'),
	mqtt = require('mqtt'),
	mqttHostUrl,
	mqttClientId,
	mqttUser,
	mqttPassword;

var APP_CONFIG;

module.exports = function (app) {

	const handlersFactory = require('./handlersFactory')(app);

	var methods = {};

	methods.init = function () {
		APP_CONFIG = handlersFactory.getCacheHandler().get("APP_CONFIG");
		mqttHostUrl = APP_CONFIG.MQTT_HOST_URL;
		mqttClientId = APP_CONFIG.MQTT_CLIENT_ID;
		mqttUser = APP_CONFIG.MQTT_USER;
		mqttPassword = APP_CONFIG.MQTT_PASSWORD;
		// console.log(APP_CONFIG);
	}

	methods.handleResponse = function (response, cb) {
		var next_action = response.context.skills["main skill"]["user_defined"]["next_action"];
		if (next_action && next_action.constructor === Object
			&& next_action.hasOwnProperty('action') && next_action.action == "external_call") {
			logger.log("info", "IN externalCallHandler with next_action: %s ", next_action);

			if (next_action.service == 'google_search') {
				methods.searchGoogle(response, function (err, resp) {
					if (resp) {
						resp.context.skills["main skill"]["user_defined"]["next_action"] = "append";
					}
					return cb(null, resp);
				});
			}

			if (next_action.service == "weather_service") {
				methods.getWeather(response).then(resp => {
					if (resp) {
						resp.context.skills["main skill"]["user_defined"]["next_action"] = "append";
					}
					return cb(null, resp);
				}).catch(e => {
					console.error(e);
					return cb(e, response);
				});				
			}

			if (next_action.service == "news_service") {
				methods.getNewsFeeds(response, function (err, resp) {
					if (resp) {
						resp.context.skills["main skill"]["user_defined"]["next_action"] = "append";
					}
					cb(err, resp);
				});
			}

			if (next_action.service == 'device_action') {
				methods.deviceAction(response, function (err, resp) {
					if (resp) {
						resp.context.skills["main skill"]["user_defined"]["next_action"] = "append";
						// resp.output.generic = [];
					}
					return cb(null, resp);
				});
			}

		}
	};

	methods.getWeather = function (response) {
		return new Promise((resolve, reject) => {
				var geo;
				var location = response.context.skills["main skill"]["user_defined"]["location"];
				console.log('In getWeather for: >> ', location);
				if (!location) {
					return reject(new Error("Please provide the location "));
				}
				logger.log("info", "fetching weather for : >>> %s ", location);
				const options = {};
				const googleHandler = handlersFactory.getGoogleHandler();
				googleHandler.getLatNLong({options, 'address': location}).then(data => {
					if(data) {
						const resp = JSON.parse(data);
						console.log('Geo Resp: >> ', resp);
						if(resp && resp['results'] && resp['results'][0] && resp['results'][0]['geometry'] && resp['results'][0]['geometry']['location']){
							geo = resp['results'][0]['geometry']['location'];
						}
					}						
					methods.callWeatherAPI(geo).then(weather => {
						// console.log(weather);
						var temperature = Number((weather.temp - 32) * 5 / 9).toFixed(2);
						var respText = format('The current temperature in ' + location + ' is %s degrees celsius', temperature);
						if(weather.wx_phrase) {
							respText += ' and its ' +weather.wx_phrase;
						}
						if (response.output["generic"]) {
							response.output["generic"].push({ "response_type": "text", "text": respText });
						} else {
							response.output["generic"] = [{ "response_type": "text", "text": respText }];
						}

						return resolve(response);

					}).catch(e => {
						return reject(e);
					});			
				}).catch(e => {
					console.error(e);
					return reject(e);		
				});
		});		
	};

	methods.callWeatherAPI = function(geo) {
		console.log('In callWeatherAPI with geo: >> ', geo);
		return new Promise((resolve, reject) => {
				if(!geo || !geo.lat || !geo.lng) {
					geo = {'lat': 28.6139391, 'lng': 77.2090212}; // Hardcoded for Delhi location
				}
				var APP_CONFIG = handlersFactory.getCacheHandler().get('APP_CONFIG');
				var url = 'https://twcservice.mybluemix.net/api/weather/v1/geocode/' + geo.lat + '/' + geo.lng + '/observations.json?language=en-US';
				request({
					url: url,
					json: true,
					auth: {
						"user": APP_CONFIG.WEATHER_USERNAME,
						"pass": APP_CONFIG.WEATHER_PASSWORD,
						"sendImmediately": false
					}
				}, function (err, resp, body) {
					if (err) {
						return reject(err);
					}

					if (resp && resp.statusCode != 200) {
						return reject(new Error(format("Unexpected status code %s from %s\n%s", resp.statusCode, url, body)));
					}
					if (body) {
						try {
							var weather = body.observation;
							return resolve(weather);
						} catch (ex) {
							ex.message = format("Unexpected response format from %s - %s", url, ex.message);
							return reject(ex);
						}
					}
				});
		});
	}

	methods.searchGoogle = function (response, cb) {
		logger.log("info", "IN searchHandler.searchGoogle: >>> %s ", response.input.text);
		var searchResults = [];
		const options = {
			'limit': 5,
			'only-urls': false,
			'no-display': false			
		};

		const googleHandler = handlersFactory.getGoogleHandler();

		googleHandler.search({options, 'query': response.input.text}).then(results => {
			for (var i = 0; i < results.length; ++i) {
			  var result = results[i];
			  if(result){
				searchResults.push({"title": result.title, "body": result.snippet, "url": result.link});        			
			  }        
			}
			if (response.output["generic"]) {
				response.output["generic"].push({ "response_type": "search", "results": searchResults });
			} else {
				response.output["generic"] = [{ "response_type": "search", "results": searchResults }];
			}

			cb(null, response);

		  }).catch(e => {
			// console.error(e);
			cb(e, response);
		  }); 
	};

	methods.getNewsFeeds = function (response, cb) {
		logger.info('fetching News Feeds');
		var params = { "feedURL": "http://feeds.feedburner.com/ndtvnews-latest" };
		handlersFactory.getFeedsHandler().fetchFeedsData(params, function (err, feedsResp) {
			if (err) {
				cb(err, null);
			} else {
				logger.log("info", "Feeds Response: >>> %s ", feedsResp);
				if (feedsResp && feedsResp.length > 0) {
					if (response.output["generic"]) {
						response.output["generic"].push({ "response_type": "text", "text": feedsResp });
					} else {
						response.output["generic"] = [{ "response_type": "text", "text": feedsResp }];
					}
				} else {
					// delete response.output["text"];
					response.context.next_action == "DO_NOTHING";
				}
				cb(null, response);
			}
		});
	};

	methods.deviceAction = function (response, cb) {
		// logger.log("info", "IN deviceAction : >>> %s ", response.intents[0].intent);
		// console.log('IN deviceAction: >>>  ', response.output);
		if(!response.output || !response.output["entities"]) {
			return cb(null, response);
		}
		var publishData = { "type": "SB_MICRO", "uniqueId": "SB_MICRO-3C71BF1E1390", "deviceIndex": 1, "deviceValue": 0 };
		for (var ent of response.output.entities) {
			if (ent.entity == 'actions') {
				if (ent.value == 'SwitchOn') {
					publishData.deviceValue = 0;
				} else {
					publishData.deviceValue = 1;
				}
			}
			if (ent.entity == 'appliance') {
				if (ent.value == 'light') {
					publishData.deviceIndex = 1;
				}
				if (ent.value == 'fan') {
					publishData.deviceIndex = 2;
				}
				if (ent.value == 'ac') {
					publishData.deviceIndex = 3;
				}
				if (ent.value == 'cooler') {
					publishData.deviceIndex = 4;
				}
			}
		}
		publishToIoTPlatform(publishData);
		cb(null, response);
	};

	function publishToIoTPlatform(payload) {
		console.log(payload);
		if (!mqttHostUrl || !mqttClientId || !mqttUser || !mqttPassword) {
			console.log("Can't publish as IoT configurations are not set properly...", mqttHostUrl);
			console.log("mqttHostUrl: ", mqttHostUrl);
			console.log("mqttClientId: ", mqttClientId);
			console.log("mqttUser: ", mqttUser);
			console.log("mqttPassword: ", mqttPassword);
			return false;
		}
		var client = mqtt.connect(mqttHostUrl, { "clientId": mqttClientId, "username": mqttUser, "password": mqttPassword, clean: true });
		client.on("connect", function () {
			console.log("MQTT Connected...");
			var topic = "iot-2/type/SB_MICRO/id/SB_MICRO-3C71BF1E1390/cmd/device/fmt/json";
			client.publish(topic, JSON.stringify(payload), { retain: true, qos: 1 });
			client.end();
		});

		client.on("error", function (error) {
			console.log("Can't connect to MQTT:  " + error);
		});
	}

	return methods;

}
