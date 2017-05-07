// Filename: views/phone/PhoneView
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/phone/phoneTemplate.html',
	'precook',
], function($, _, Backbone, phoneTemplate){

	var PhoneView = Backbone.View.extend({

		el: "#id_phone",

		loaded: false,

		events: {
		},

		initialize: function(){

			// Preload Images
			this.preloadImages('phone');

		},

		render: function(){

			// Compile template
			var compiledTemplate = _.template( phoneTemplate );
			
			// Render template
			this.$el.html( compiledTemplate( {} ) );

			// Remove loading
			if( !this.loaded ){
				this.$el.removeClass();
				this.loaded = true;
			}

			return this;

		},

		preloadImages: function(imageGroup){

			var self = this,
				precook = new Precook();

			precook.on('preloader:configLoaded', function() {
				precook.load(imageGroup);
			});

			precook.on('preloader:completed', function(group) {
				// console.log('Completed preloading:', group);
				self.loadPage();
			});

			// Init preloader
			precook.setConfig(IMAGES_JSON);

		},

		loadPage: function(){

			// Remove general loader
			$('body').removeClass('loader');

			// Set loading to all sections
			$('.layout section').addClass('loading');
			
			// Add page class
			$('body').addClass('phone-page');

			// Render template
			this.render();

		},

	});

	return PhoneView;

});