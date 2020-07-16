// Filename: views/projects/ProjectsView
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import projectsTemplate from '../../../templates/projects/projectsTemplate.txt';
//import { Precook } from '../../../vendor/precook-backbone/dist/precook-backbone.min';

var ProjectsView = Backbone.View.extend({

	el: "#id_projects",

	loaded: false,

	events: {
		'click a.unload': 'onUnloadPageClicked',
		'mouseenter .item > a': 'onProjectMouseEnter',
		'mouseleave .item > a': 'onProjectMouseLeave',
		//'click .tc': 'trackClicks'
	},

	initialize: function(){

		// Preload Images
		//this.preloadImages('projects');
		this.loadPage();

	},

	render: function(){

		// Compile template
		var compiledTemplate = projectsTemplate;
		
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
		$('body').removeClass('about-page');
		$('body').removeClass('detail-page');
		
		// Add page class
		$('body').addClass('projects-page');

		// Render template
		this.render();

	},

	onProjectMouseEnter: function(event){
		var workID = $( event.currentTarget ).attr('href').split('#/projects/')[1];
		this.$el.addClass('work-'+workID);
	},

	onProjectMouseLeave: function(event){
		var workID = $( event.currentTarget ).attr('href').split('#/projects/')[1];
		this.$el.removeClass('work-'+workID);
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

	},

	// trackClicks: function(event){

	// 	var element = $(event.currentTarget);

	// 	//tc-projects-1
	// 	if(element.hasClass('tc-projects-1')){
	// 		mixpanel.track("Projects - Junar link clicked");
	// 	}

	// 	//tc-projects-2
	// 	if(element.hasClass('tc-projects-2')){
	// 		mixpanel.track("Projects - Patin+Calle link clicked");
	// 	}

	// 	//tc-projects-3
	// 	if(element.hasClass('tc-projects-3')){
	// 		mixpanel.track("Projects - The Rocket link clicked");
	// 	}

	// 	//tc-projects-4
	// 	if(element.hasClass('tc-projects-4')){
	// 		mixpanel.track("Projects - Anne Frank link clicked");
	// 	}

	// 	//tc-projects-5
	// 	if(element.hasClass('tc-projects-5')){
	// 		mixpanel.track("Projects - Logistics Observatory link clicked");
	// 	}

	// 	//tc-projects-6
	// 	if(element.hasClass('tc-projects-6')){
	// 		mixpanel.track("Projects - By Pass Infographics link clicked");
	// 	}

	// 	//tc-projects-7
	// 	if(element.hasClass('tc-projects-7')){
	// 		mixpanel.track("Projects - Toches link clicked");
	// 	}

	// 	//tc-projects-8
	// 	if(element.hasClass('tc-projects-8')){
	// 		mixpanel.track("Projects - Memorize This link clicked");
	// 	}

	// 	//tc-projects-9
	// 	if(element.hasClass('tc-projects-9')){
	// 		mixpanel.track("Projects - Gargabe Time App link clicked");
	// 	}

	// 	//tc-projects-10
	// 	if(element.hasClass('tc-projects-10')){
	// 		mixpanel.track("Projects - Explorer TV link clicked");
	// 	}

	// 	//tc-projects-11
	// 	if(element.hasClass('tc-projects-11')){
	// 		mixpanel.track("Projects - Tablon Mag link clicked");
	// 	}

	// 	//tc-projects-12
	// 	if(element.hasClass('tc-projects-12')){
	// 		mixpanel.track("Projects - Whasher Machine link clicked");
	// 	}

	// 	//tc-projects-13
	// 	if(element.hasClass('tc-projects-13')){
	// 		mixpanel.track("Projects - Logo Compilation link clicked");
	// 	}

	// 	//tc-projects-14
	// 	if(element.hasClass('tc-projects-14')){
	// 		mixpanel.track("Projects - Signoseis link clicked");
	// 	}

	// 	//tc-projects-15
	// 	if(element.hasClass('tc-projects-14')){
	// 		mixpanel.track("Projects - TuMadre Films link clicked");
	// 	}

	// 	//tc-projects-16
	// 	if(element.hasClass('tc-projects-16')){
	// 		mixpanel.track("Projects - Vinolta link clicked");
	// 	}

	// }

});

export { ProjectsView };