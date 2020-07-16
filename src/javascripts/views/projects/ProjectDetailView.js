// Filename: views/projects/ProjectDetail
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import detailTemplate01 from '../../../templates/projects/details/01.txt';
import detailTemplate02 from '../../../templates/projects/details/02.txt';
import detailTemplate03 from '../../../templates/projects/details/03.txt';
import detailTemplate04 from '../../../templates/projects/details/04.txt';
import detailTemplate05 from '../../../templates/projects/details/05.txt';
import detailTemplate06 from '../../../templates/projects/details/06.txt';
import detailTemplate07 from '../../../templates/projects/details/07.txt';
import detailTemplate08 from '../../../templates/projects/details/08.txt';
import detailTemplate09 from '../../../templates/projects/details/09.txt';
import detailTemplate10 from '../../../templates/projects/details/10.txt';
import detailTemplate11 from '../../../templates/projects/details/11.txt';
import detailTemplate12 from '../../../templates/projects/details/12.txt';
import detailTemplate13 from '../../../templates/projects/details/13.txt';
import detailTemplate14 from '../../../templates/projects/details/14.txt';
import detailTemplate15 from '../../../templates/projects/details/15.txt';
import detailTemplate16 from '../../../templates/projects/details/16.txt';
//import { Precook } from '../../../vendor/precook-backbone/dist/precook-backbone.min';

var ProjectDetailView = Backbone.View.extend({

	el: "#id_projectDetail",

	loaded: false,

	projectID: null,

	templates: [detailTemplate01, detailTemplate02, detailTemplate03, detailTemplate04, detailTemplate05, detailTemplate06, detailTemplate07, detailTemplate08, detailTemplate09, detailTemplate10, detailTemplate11, detailTemplate12, detailTemplate13, detailTemplate14, detailTemplate15, detailTemplate16],

	events: {
		'click a.unload': 'onUnloadPageClicked',
		//'click .tc': 'trackClicks'
	},

	initialize: function(options){

		this.projectID = options.id;

		// Preload Images
		//this.preloadImages( 'detail-'+this.projectID );
		this.loadPage();

	},

	render: function(){

		// Compile template
		var compiledTemplate = this.templates[ parseInt(this.projectID) - 1 ];
		
		// Render template
		this.$el.html( compiledTemplate( {} ) );

		// Remove loading
		if( !this.loaded ){
			this.$el.removeClass('loading');
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

		// Set overflow auto
		$('body').css('overflow','auto');

		// Set color of logo
		this.setLogoColor();

		// Scroll to top
		$('body, html').scrollTop(0);

		// Remove other page classes
		$('body').removeClass('menu-page');
		$('body').removeClass('home-page');
		$('body').removeClass('about-page');
		$('body').removeClass('projects-page');
		
		// Add page class
		$('body').addClass('detail-page');

		// Render template
		this.render();

	},

	setLogoColor: function(){

		var pID = parseInt(this.projectID);

		if( 
			pID == 3 ||
			pID == 4 || 
			pID == 6 || 
			pID == 10 ||
			pID == 12 ||
			pID == 16
		){
			$('body').addClass('white-logo');
		}else{
			$('body').removeClass('white-logo');
		}

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

	// 	var element = $(event.currentTarget),
	// 		projectName = $('#projectName').html();

	// 	//tc-project-close
	// 	if(element.hasClass('tc-project-close')){
	// 		mixpanel.track("Project "+this.projectID+" - Close link clicked");
	// 	}

	// 	//tc-project-prev
	// 	if(element.hasClass('tc-project-prev')){
	// 		prev = element.attr('title');
	// 		mixpanel.track("Project "+this.projectID+" ("+projectName+") - Prev link clicked - Going to "+prev);
	// 	}

	// 	//tc-project-next
	// 	if(element.hasClass('tc-project-next')){
	// 		next = element.attr('title');
	// 		mixpanel.track("Project "+this.projectID+" ("+projectName+") - Next link clicked - Going to "+next);
	// 	}

	// 	//tc-home
	// 	if(element.hasClass('tc-home')){
	// 		mixpanel.track("Project "+this.projectID+" - Home link clicked");
	// 	}

	// 	//tc-about
	// 	if(element.hasClass('tc-about')){
	// 		mixpanel.track("Project "+this.projectID+" - About link clicked");
	// 	}

	// 	//tc-projects
	// 	if(element.hasClass('tc-projects')){
	// 		mixpanel.track("Project "+this.projectID+" - Projects link clicked");
	// 	}

	// }

});

export { ProjectDetailView };