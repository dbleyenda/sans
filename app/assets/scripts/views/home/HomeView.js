// Filename: views/home/HomeView
define([
	'jquery',
	'underscore',
	'backbone',
	'youTubeIFrame',
	'text!templates/home/homeTemplate.html',
	'precook',
], function($, _, Backbone, YT, homeTemplate){

	var HomeView = Backbone.View.extend({

		el: "#id_home",

		featuredSelected: 0,
		featuredTotal: 4,
		loaded: false,
		videoIDs: ['g0ddeyzl8go', 'v4Uv2j1rRKU','tbByZdoeo1Y','0_l4kyW9aD0'],
		timeToStart: [915, 34, 188, 24],
		player: null,
		scrolling: false,
		videoTimeout: null,

		events: {
			'click a.unload': 'onUnloadPageClicked',
			'click #id_prev, #id_next': 'onNavFeaturedClicked',
			'mousewheel': 'onMouseWheel',
			'click #id_sound li': 'onToggleSoundClicked',
		},

		initialize: function(){

			// Set volume for the first time
			if( _.isUndefined(window.videoVolumeStatus) ){
				window.videoVolumeStatus = 'unMuted';
			}

			// Preload Images
			this.preloadImages('home');

		},

		render: function(){

			// Compile template
			var compiledTemplate = _.template( homeTemplate );
			
			// Render template
			this.$el.append( compiledTemplate( {} ) );

			if( window.videoVolumeStatus == 'muted' ){
				this.$el.find('#id_sound li').addClass('muted');
			}

			// Remove loading
			if( !this.loaded ){
				this.$el.removeClass('loading');
				this.loaded = true;
			}

			// Load YouTube player
			this.loadYouTubePlayer();

			return this;

		},

		preloadImages: function(imageGroup){

			var self = this,
				precook = new Precook();

			precook.on('preloader:configLoaded', function() {
				precook.load(imageGroup);
			});

			precook.on('preloader:completed', function(group) {
				//console.log('Completed preloading:', group);
				self.loadPage();
			});

			// Init preloader
			precook.setConfig(IMAGES_JSON);

		},

		loadPage: function(){

			// Reset logo color
			$('body').removeClass('white-logo');

			// Set first featured class
			this.$el.addClass('featured-0');

			// Set loading to all sections
			$('body').removeClass('loader');

			// Set loading to all sections
			$('.layout section').addClass('loading');

			// Remove loading from grid
			$('body > .grid').removeClass('loading');
			
			/* Hide menu */
			$('#id_menu').addClass('hidden');

			// If opened, close Menu
			$('#id_menu').removeClass('opened');

			// Set overflow hidden
			$('body').css('overflow','hidden');

			// Remove other page classes
			$('body').removeClass('menu-page');
			$('body').removeClass('about-page');
			$('body').removeClass('projects-page');
			$('body').removeClass('detail-page');
			
			// Add page class
			$('body').addClass('home-page');

			// Render template
			this.render();
		},

		loadYouTubePlayer: function(){

			var self = this;

			// Detiene el setTimeout de 10 segundos si se hizo click en la navegacion
			if(this.videoTimeout != null){
				clearTimeout(this.videoTimeout);
			}

			// Si no esta creado, creamos el player por primera vez
			if( this.player == null ){

				// Creo player
				this.player = new YT.Player('player', {
					height: '100%',
					width: '100%',
					videoId: this.videoIDs[ this.featuredSelected ],
					playerVars: {
						'controls': 0,
						'showinfo': 0,
						'rel': 0,
						'start': this.timeToStart[ this.featuredSelected ],
					},
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					}
				});

				// TODO: Ver como aislar estas dos funciones. No lo pude hacer andar si las aislo.

				// Solo entra la primera vez que crea el player
				function onPlayerReady(event) {
					if( window.videoVolumeStatus == 'unMuted' ){
						event.target.unMute();
					}else{
						event.target.mute();
					}
					event.target.setVolume(10);
					event.target.playVideo();
				}
				
				// Entra en cada cambio de estado
				function onPlayerStateChange(event) {

					// Logueo el cambio de status del video.
					//console.log('STATE CHANGED', event.data)

					// UNSTARTED
					if (event.data == YT.PlayerState.UNSTARTED){

						// Como no empezo, remuevo class loaded
						self.$el.find('.video-bg').removeClass('loaded');

						// Seteo el tiempo que debe empezar
						event.target.seekTo( self.timeToStart[ self.featuredSelected ] );

					}

					// PLAYING
					if (event.data == YT.PlayerState.PLAYING){

						// Agrego class loaded
						self.$el.find('.video-bg').addClass('loaded');

						// Chequeo cual es el video que viene
						var featuredActual;
						if( ( self.featuredSelected + 1 ) >= ( self.featuredTotal ) ){
							featuredActual = 0;
						}else{
							featuredActual = self.featuredSelected + 1;
						}

						// Dejo reproducir 10 segundos y lo cambio al siguiente video.
						self.videoTimeout = setTimeout(function(){
							self.changeSlide(featuredActual);
						}, 10000);

					}

				}

			// Si ya esta creado, elijo el video que debe cargarse.
			}else{
				this.player.loadVideoById( this.videoIDs[ this.featuredSelected ] );
			}
		
		},

		onMouseWheel: function(event){

			if (!this.scrolling){

				// Check that is not a minimun touch od the scroll
				if( Math.abs(event.originalEvent.wheelDelta / 120) > 0.1){

					this.scrolling = true;

					var featuredActual;

					// Check if scrolling up or down
					if(event.originalEvent.wheelDelta / 120 > 0) {

						//console.log('scrolling up !');

						if( this.featuredSelected - 1 < 0 ){
							featuredActual = 3;
						}else{
							featuredActual = this.featuredSelected - 1;
						}

					}else{
						
						//console.log('scrolling down !');

						if( ( this.featuredSelected + 1 ) >= ( this.featuredTotal ) ){
							featuredActual = 0;
						}else{
							featuredActual = this.featuredSelected + 1;
						}

					}

					this.changeSlide(featuredActual);

					var self = this;
					setTimeout(function(){
						self.scrolling = false;
					}, 1500);

				}

			}

		},

		onNavFeaturedClicked: function(event){

			var featuredActual = parseInt(this.$el.attr('class').split('-')[1]);

			if( $(event.currentTarget).hasClass('prev') ){
				
				if( featuredActual - 1 < 0 ){
					featuredActual = 3;
				}else{
					featuredActual--;
				}

			}else if( $(event.currentTarget).hasClass('next') ){
				
				if( ( featuredActual + 1 ) >= ( this.featuredTotal ) ){
					featuredActual = 0;
				}else{
					featuredActual++;
				}

			}

			this.changeSlide(featuredActual);

		},

		changeSlide: function( position ){

			var self = this;

			setTimeout(function(){

				self.$el.removeClass('featured-'+self.featuredSelected);
				self.$el.addClass('featured-'+position);

				self.featuredSelected = position;

				self.loadYouTubePlayer();

			}, 550);

		},

		onToggleSoundClicked: function(event){

			var element = $(event.currentTarget);
			
			if( this.player ){
				
				if( window.videoVolumeStatus == 'unMuted' ){
					this.player.mute();
					window.videoVolumeStatus = 'muted';
					element.addClass('muted');
				}else{
					this.player.unMute();
					window.videoVolumeStatus = 'unMuted';
					element.removeClass('muted');
				}

			}

		},

		pauseVideo: function(){

			if(this.videoTimeout != null){
				clearTimeout(this.videoTimeout);
				this.player.pauseVideo();
			}

		},

		onUnloadPageClicked: function(event){

			event.preventDefault();

			this.$el.addClass('loading');

			this.pauseVideo();

			$('body > .grid').addClass('loading');

			$('#id_menu').removeClass('hidden');

			window.location.href = $( event.currentTarget ).attr('href');

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

	return HomeView;

});