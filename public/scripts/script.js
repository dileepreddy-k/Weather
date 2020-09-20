(function(){

	'use strict';

	var app = window.app || new Object();

	var body = document.querySelector('body');
	var placeSearchHolder = document.querySelector('[data-placesearch]');
	var name = document.querySelector('[data-name]');
	var status = document.querySelector('[data-status]');
	var temperature = document.querySelector('[data-temperature]');
	var units = document.querySelector('[data-units]');

	app.placesInit = function(){

		return places({
			appId: 'pl4TXQLPIM8X',
			apiKey: 'ec2e32b2cd4e2f35ebfac22cfc9b9408',
			container: placeSearchHolder
		});
	}

	app.setWeather = function(data) {

		name.textContent = data.location.name;
		status.textContent = data.current.weather_descriptions;
		temperature.textContent = data.current.temperature;
	}

	app.fetchWeather = function(query){

		body.classList.add('loading');

		fetch('/current', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query: query
			})
		}).then( res => res.json()).then(data => {

			body.classList.remove('loading');
			if( data.error ){
				swal("Error!", "We couldn\'t able to find weather for selected city. Please search others", "error");
			}
			
			app.setWeather(data);
			
		})
	}

	app.triggerPlacesChange = function(placesField){

		placesField.on('change', function(e) {	
			placeSearchHolder.textContent = e.suggestion.value;
			app.fetchWeather(e.suggestion.name);			
		});
	}

	app.clearplaces = function(placesField){

		placesField.on('clear', function() {
			placeSearchHolder.textContent = 'none';
		});
	}

	app.init = function() {

		app.fetchWeather('fetch:ip');
		var placesAutocomplete = app.placesInit();
		app.triggerPlacesChange(placesAutocomplete);
		app.clearplaces(placesAutocomplete);
	}

	app.init();

}());
