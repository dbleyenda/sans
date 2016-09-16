// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/HomeView',
  'views/projects/ProjectsView',
  'views/projects/ProjectDetailView',
  'views/menu/MenuView',
], function($, _, Backbone, HomeView, ProjectsView, ProjectDetailView, MenuView){

  var AppRouter = Backbone.Router.extend({

    burger: 0,

    routes: {

      // Project detail
      'projects/:id': 'projectDetailPage',

      // Projects
      'projects': 'projectsPage',
      
      // Default - Game
      '*actions': 'defaultAction'
    },

    initialize: function(){

      var self = this;

       // Menu
      var menuView = new MenuView();

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

  return AppRouter;

});