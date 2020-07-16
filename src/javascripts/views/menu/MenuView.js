// Filename: views/menu/MenuView
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import menuTemplate from '../../../templates/menu/menuTemplate.txt';

var MenuView = Backbone.View.extend({

	el: "#id_menu",

	isOpen: false, 
	widthTimeOut: null,

	events: {
		'click .logo a, .nav a': 'onToggleMenuClicked',
		'mouseenter .logo': 'onLogoMouseEnter',
		'mouseleave .logo': 'onLogoMouseLeave',
		'click a.unload': 'onUnloadPageClicked',
		//'click .tc': 'trackClicks'
	},

	initialize: function(){

		// Render template
		this.render();

	},

	render: function(){

		// Compile template
		var compiledTemplate = menuTemplate;
		
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

	// trackClicks: function(event){

	// 	var element = $(event.currentTarget);

	// 	//tc-home
	// 	if(element.hasClass('tc-home')){
	// 		mixpanel.track("Menu - Home link clicked");
	// 	}
		
	// 	//tc-close-menu
	// 	if(element.hasClass('tc-close-menu')){
	// 		mixpanel.track("Menu - Close Menu link clicked");
	// 	}

	// 	//tc-about
	// 	if(element.hasClass('tc-about')){
	// 		mixpanel.track("Menu - About link clicked");
	// 	}

	// 	//tc-projects
	// 	if(element.hasClass('tc-projects')){
	// 		mixpanel.track("Menu - Projects link clicked");
	// 	}

	// 	//tc-email
	// 	if(element.hasClass('tc-email')){
	// 		mixpanel.track("Menu - Email link clicked");
	// 	}

	// 	//tc-social-dribbble
	// 	if(element.hasClass('tc-social-dribbble')){
	// 		mixpanel.track("Menu - Social - Dribbble link clicked");
	// 	}

	// 	//tc-social-behance
	// 	if(element.hasClass('tc-social-behance')){
	// 		mixpanel.track("Menu - Social - Behance link clicked");
	// 	}

	// 	//tc-social-instagram
	// 	if(element.hasClass('tc-social-instagram')){
	// 		mixpanel.track("Menu - Social - Instagram link clicked");
	// 	}

	// 	//tc-social-github
	// 	if(element.hasClass('tc-social-github')){
	// 		mixpanel.track("Menu - Social - GitHub link clicked");
	// 	}

	// 	//tc-social-linkedin
	// 	if(element.hasClass('tc-social-linkedin')){
	// 		mixpanel.track("Menu - Social - LinkedIn link clicked");
	// 	}

	// }

});

export { MenuView };