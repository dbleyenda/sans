// Filename: app.js
import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import { Router } from './router.js';
  
var initializeApp = function(){
  new Router;
}

export { initializeApp };