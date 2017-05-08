// Filename: views/projects/ProjectDetail
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/projects/details/01.html',
	'text!templates/projects/details/02.html',
	'text!templates/projects/details/03.html',
	'text!templates/projects/details/04.html',
	'text!templates/projects/details/05.html',
	'text!templates/projects/details/06.html',
	'text!templates/projects/details/07.html',
	'text!templates/projects/details/08.html',
	'text!templates/projects/details/09.html',
	'text!templates/projects/details/10.html',
	'text!templates/projects/details/11.html',
	'text!templates/projects/details/12.html',
	'text!templates/projects/details/13.html',
	'text!templates/projects/details/14.html',
	'text!templates/projects/details/15.html',
	'text!templates/projects/details/16.html',
	'precook',
], function($, _, Backbone, detailTemplate01, detailTemplate02, detailTemplate03, detailTemplate04, detailTemplate05, detailTemplate06, detailTemplate07, detailTemplate08, detailTemplate09, detailTemplate10, detailTemplate11, detailTemplate12, detailTemplate13, detailTemplate14, detailTemplate15, detailTemplate16){

	var ProjectDetailView = Backbone.View.extend({

		el: "#id_projectDetail",

		loaded: false,

		projectID: null,

		templates: [detailTemplate01, detailTemplate02, detailTemplate03, detailTemplate04, detailTemplate05, detailTemplate06, detailTemplate07, detailTemplate08, detailTemplate09, detailTemplate10, detailTemplate11, detailTemplate12, detailTemplate13, detailTemplate14, detailTemplate15, detailTemplate16],

		events: {
			'click a.unload': 'onUnloadPageClicked',
		},

		initialize: function(options){

			this.projectID = options.id;

			// Preload Images
			this.preloadImages( 'detail-'+this.projectID );

		},

		render: function(){

			// Compile template
			var compiledTemplate = _.template( this.templates[ parseInt(this.projectID) - 1 ] );
			
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

		}

	});

	return ProjectDetailView;

});