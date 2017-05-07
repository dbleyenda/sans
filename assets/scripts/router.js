// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'mobileDetect',
  'views/home/HomeView',
  'views/about/AboutView',
  'views/projects/ProjectsView',
  'views/projects/ProjectDetailView',
  'views/menu/MenuView',
  'views/phone/PhoneView',
], function($, _, Backbone, MobileDetect, HomeView, AboutView, ProjectsView, ProjectDetailView, MenuView, PhoneView){

  // Desktop Router
  var DesktopRouter = Backbone.Router.extend({

    burger: 0,

    routes: {

      // About
      'wtf': 'aboutPage',
      'about': 'aboutPage',

      // Project detail
      'projects/:id': 'projectDetailPage',

      // Projects
      'projects': 'projectsPage',
      
      // Default
      '*actions': 'defaultAction'
    },

    initialize: function(){

      var self = this;

       // Menu
      var menuView = new MenuView();

      // Projects
      this.on('route:aboutPage', function(actions){
        this.destroyView();
        setTimeout(function(){
          $('.layout').append('<section id="id_about" class="loading"></section>');
          var aboutView = self.showView( new AboutView() );
        }, 600);
      });

      // Project Detail
      this.on('route:projectDetailPage', function(id){
        this.destroyView();
        setTimeout(function(){
          $('.layout').append('<section  id="id_projectDetail" class="loading"></section>');
          var projectDetailView = self.showView( new ProjectDetailView({ 
            id: id
          }) );
        }, 600);
      });

      // Projects
      this.on('route:projectsPage', function(actions){
        this.destroyView();
        setTimeout(function(){
          $('.layout').append('<section id="id_projects" class="loading"></section>');
          var projectsView = self.showView( new ProjectsView() );
        }, 600);
      });

      // Default
      this.on('route:defaultAction', function(actions){
        this.destroyView();
        setTimeout(function(){
          $('.layout').append('<section id="id_home" class="featured-0 loading"></section>');
          var homeView = self.showView( new HomeView() );
        }, 600);
      });

      // Change burger icon. 
      // TODO: Ugly to be here, change to another place
      this.on('route', function(route, params) {

        $('#id_menu').addClass('hidden');

        setTimeout(function(){

          if( $('#id_menu .logo') ){

            $('#id_menu .logo').removeClass('burger0 burger1 burger2 burger3');

            if( (self.burger + 1) < 3 ){
              self.burger++;
            }else{
              self.burger = 0;
            }

            $('#id_menu .logo').addClass('burger'+self.burger);
            
          }

        }, 600);

      });

      Backbone.history.start();

    },

    showView: function(view) {
      this.currentView = view;      
      return view;
    },

    destroyView: function(){
      if(this.currentView != null){
        this.currentView.destroy();
      }
    }

  });

  // Phone Router
  var PhoneRouter = Backbone.Router.extend({

    routes: {

      // Default
      '*actions': 'defaultAction'
    },

    initialize: function(){

      var self = this;

      // Default
      this.on('route:defaultAction', function(actions){
        $('.layout').append('<section id="id_phone" class="loading"></section>');
        var phoneView = self.showView( new PhoneView() );
      });

      Backbone.history.start();

    },

    showView: function(view) {
      return view;
    },

  });

  // Check device and return router  
  var md = new MobileDetect(window.navigator.userAgent);

  // console.log( md.mobile() );
  // console.log( md.phone() );
  // console.log( md.tablet() ); 

  // If is mobile
  if( !_.isNull( md.mobile() ) ){

    // If is phone or tablet
    if( !_.isNull( md.phone() ) || !_.isNull( md.tablet() ) ){
      return PhoneRouter;

    // Else
    }else{
      return DesktopRouter;
    }

  // Else, Desktop
  }else{
    return DesktopRouter;
  }


});