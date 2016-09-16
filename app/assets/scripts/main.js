// Filename: main.js

require.config({
	paths: {
		jquery: '../../bower_components/jquery/dist/jquery.min',
		underscore: '../../bower_components/underscore/underscore-min',
		backbone: '../../bower_components/backbone/backbone-min',
		templates: '../../templates',
		text: "../../bower_components/text/text",
		precook: '../../vendor/precook-backbone/dist/precook-backbone.min',
		youTubeIFrame: 'https://www.youtube.com/iframe_api?noext'
	},
	shim: {
		youTubeIFrame: {
			// Now requirejs expects a YT global variable to be initialized
			// http://requirejs.org/docs/api.html#config-shim
			exports: 'YT'
		}
	}
});

require([

	// Load our app module and pass it to our definition function
	'app',
], function(App){
	// The "app" dependency is passed in as "App"
	App.initialize();
});