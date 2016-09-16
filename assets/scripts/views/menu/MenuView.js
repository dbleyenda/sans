// Filename: views/menu/MenuView
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/menu/menuTemplate.html',
], function($, _, Backbone, menuTemplate){

	var MenuView = Backbone.View.extend({

		el: "#id_menu",

		isOpen: false, 
		widthTimeOut: null,

		events: {
			'click .logo a, .nav a': 'onToggleMenuClicked',
			'mouseenter .logo': 'onLogoMouseEnter',
			'mouseleave .logo': 'onLogoMouseLeave',
			'click a.unload': 'onUnloadPageClicked',
		},

		initialize: function(){

			// Render template
			this.render();

		},

		render: function(){

			// Compile template
			var compiledTemplate = _.template( menuTemplate );
			
			// Render template
			this.$el.html( compiledTemplate( {} ) );

			return this;

		},

		onToggleMenuClicked: function(){
			if( this.isOpen ){
				
				this.isOpen = false;
				this.$el.removeClass('opened');
				
				// Remove page class
				$('body').removeClass('menu-page');

			}else{

				this.isOpen = true;
				this.$el.addClass('opened');

				// Add page class
				$('body').addClass('menu-page');

			}
		},

		onLogoMouseEnter: function(){
			
			var self = this;

			this.$el.find('.menu').width('2vw');

			this.widthTimeOut = setTimeout(function(){
				self.$el.find('.menu').width('1.4vw');
			}, 550);

		},

		onLogoMouseLeave: function(){
			clearTimeout(this.widthTimeOut);
			this.$el.find('.menu').width(0);
		},

		onUnloadPageClicked: function(event){

			event.preventDefault();
			
			$('.layout section').addClass('loading');
			
			$('body > .grid').addClass('loading');

			setTimeout( function(){
				window.location.href = $( event.currentTarget ).attr('href');
			}, 550);

		},

	});

	return MenuView;

});