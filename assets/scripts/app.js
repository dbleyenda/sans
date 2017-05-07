// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){
  
  var initialize = function(){
    new Router;
  }

  return {
    initialize: initialize
  };
  
});