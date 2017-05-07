// Filename: views/about/AboutView
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/about/aboutTemplate.html',
	'precook',
], function($, _, Backbone, aboutTemplate){

	var AboutView = Backbone.View.extend({

		el: "#id_about",

		loaded: false,

		events: {
			'click a.unload': 'onUnloadPageClicked',
		},

		initialize: function(){

			// Preload Images
			this.preloadImages('about');

		},

		render: function(){

			// Compile template
			var compiledTemplate = _.template( aboutTemplate );
			
			// Render template
			this.$el.html( compiledTemplate( {} ) );

			// Remove loading
			if( !this.loaded ){
				//this.$el.removeClass('loading');
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

			// Reset logo color
			$('body').removeClass('white-logo');

			// Set loading to all sections
			$('body').removeClass('loader');

			// Set loading to all sections
			$('.layout section').addClass('loading');

			// Remove loading from grid
			$('body > .grid').removeClass('loading');

			// Let menu be visible
			$('#id_menu').removeClass('hidden');

			// If opened, close Menu
			$('#id_menu').removeClass('opened');

			// Set overflow hidden
			$('body').css('overflow','hidden');

			// Remove other page classes
			$('body').removeClass('menu-page');
			$('body').removeClass('home-page');
			$('body').removeClass('projects-page');
			$('body').removeClass('detail-page');
			
			// Add page class
			$('body').addClass('about-page');

			// Render template
			this.render();

		},

		onUnloadPageClicked: function(event){

			event.preventDefault();

			this.$el.addClass('loading');

			$('body > .grid').addClass('loading');

			setTimeout( function(){
				window.location.href = $( event.currentTarget ).attr('href');
			}, 550);

		},

		destroy: function(){

			var self = this;
			setTimeout(function(){

				// UndelegateEvents
				self.undelegateEvents();

				self.$el.removeData().unbind(); 

				// Remove view from DOM
				self.remove();  
				Backbone.View.prototype.remove.call(self);

			}, 550);

		}

	});

	return AboutView;

});