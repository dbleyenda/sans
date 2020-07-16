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
			'click .tc': 'trackClicks'
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

		trackClicks: function(event){

			var element = $(event.currentTarget);

			//tc-email-bio
			if(element.hasClass('tc-email-bio')){
				mixpanel.track("Mobile - Email Bio clicked");
			}

			//tc-linkedin-bio
			if(element.hasClass('tc-linkedin-bio')){
				mixpanel.track("Mobile - LinkedIn Bio clicked");
			}

			//tc-email
			if(element.hasClass('tc-email')){
				mixpanel.track("Mobile - Email link clicked");
			}

			//tc-godesktop
			if(element.hasClass('tc-godesktop')){
				mixpanel.track("Mobile - Go to Desktop text clicked");
			}

			//tc-social-dribbble
			if(element.hasClass('tc-social-dribbble')){
				mixpanel.track("Mobile - Social - Dribbble link clicked");
			}

			//tc-social-behance
			if(element.hasClass('tc-social-behance')){
				mixpanel.track("Mobile - Social - Behance link clicked");
			}

			//tc-social-instagram
			if(element.hasClass('tc-social-instagram')){
				mixpanel.track("Mobile - Social - Instagram link clicked");
			}

			//tc-social-github
			if(element.hasClass('tc-social-github')){
				mixpanel.track("Mobile - Social - GitHub link clicked");
			}

			//tc-social-linkedin
			if(element.hasClass('tc-social-linkedin')){
				mixpanel.track("Mobile - Social - LinkedIn link clicked");
			}

		}

	});

	return PhoneView;

});