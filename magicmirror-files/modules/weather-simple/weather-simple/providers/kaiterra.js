/* global WeatherProvider, WeatherObject */

/* Magic Mirror
 * Module: Weather
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * This class is the blueprint for a weather provider.
 */
WeatherProvider.register("kaiterra", {
	// Set the name of the provider.
	// This isn't strictly necessary, since it will fallback to the provider identifier
	// But for debugging (and future alerts) it would be nice to have the real name.
	providerName: "kaiterra",

	// Set the default config properties that is specific to this provider
	defaults: {
		apiVersion: "v1",
		apiBase: "https://api.kaiterra.com/",
		endpoint: "lasereggs",
		deviceId: "",
		apiKey: ""
	},

	// Overwrite the fetchCurrentWeather method.
	fetchCurrentWeather() {
		this.fetchData(this.getUrl())
			.then((data) => {
                console.log(data)
				if (!data || !data["info.aqi"] || !data.id) {
					// Did not receive usable new data.
					// Maybe this needs a better check?
					return;
				}

				this.setFetchedLocation(`${data.id}`);
                console.log(this.config.type, data);
				const currentWeather = this.generateWeatherObjectFromCurrentWeather(data);
                console.log(this.config.type, currentWeather);
				this.setCurrentWeather(currentWeather);
			})
			.catch(function (request) {
				Log.error("Could not load data ... ", request);
			})
			.finally(() => this.updateAvailable());
	},

	/**
	 * Overrides method for setting config to check if endpoint is correct for hourly
	 *
	 * @param config
	 */
	setConfig(config) {
		this.config = config;
	},

	/** OpenWeatherMap Specific Methods - These are not part of the default provider methods */
	/*
	 * Gets the complete url for the request
	 */
	getUrl() {
        console.log('fetching url', this.config.type, this.config.apiBase + this.config.apiVersion + '/' + this.config.endpoint + '/' + this.config.deviceId + this.getParams());
		return this.config.apiBase + this.config.apiVersion + '/' + this.config.endpoint + '/' + this.config.deviceId + this.getParams();
	},

	/*
	 * Generate a WeatherObject based on currentWeatherInformation
	 */
	generateWeatherObjectFromCurrentWeather(currentWeatherData) {
		const currentWeather = new WeatherObject(this.config.units, this.config.tempUnits, this.config.windUnits, this.config.useKmh);

        const info = currentWeatherData["info.aqi"];

		currentWeather.humidity = info.data.humidity;
        currentWeather.pm10 = info.data.pm10;
        currentWeather.pm25 = info.data.pm25;
        currentWeather.co2 = info.data.rco2;
        currentWeather.temperature = info.data.temp;

		return currentWeather;
	},

	/*
	 * Convert the OpenWeatherMap icons to a more usable name.
	 */
	convertWeatherType(weatherType) {
		const weatherTypes = {
			"01d": "day-sunny",
			"02d": "day-cloudy",
			"03d": "cloudy",
			"04d": "cloudy-windy",
			"09d": "showers",
			"10d": "rain",
			"11d": "thunderstorm",
			"13d": "snow",
			"50d": "fog",
			"01n": "night-clear",
			"02n": "night-cloudy",
			"03n": "night-cloudy",
			"04n": "night-cloudy",
			"09n": "night-showers",
			"10n": "night-rain",
			"11n": "night-thunderstorm",
			"13n": "night-snow",
			"50n": "night-alt-cloudy-windy"
		};

		return weatherTypes.hasOwnProperty(weatherType) ? weatherTypes[weatherType] : null;
	},

	/* getParams(compliments)
	 * Generates an url with api parameters based on the config.
	 *
	 * return String - URL params.
	 */
	getParams() {
		let params = "?";
        params += "key=" + this.config.apiKey;
		return params;
	}
});
