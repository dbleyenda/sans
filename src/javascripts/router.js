// Filename: router.js
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import { HomeView } from './views/home/HomeView';
import { AboutView } from './views/about/AboutView';
import { ProjectsView } from './views/projects/ProjectsView';
import { ProjectDetailView } from './views/projects/ProjectDetailView';
import { MenuView } from './views/menu/MenuView';

// Router
var Router = Backbone.Router.extend({

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

export { Router };