define(["jquery","underscore","backbone","text!templates/projects/details/01.html","text!templates/projects/details/02.html","text!templates/projects/details/03.html","text!templates/projects/details/04.html","text!templates/projects/details/05.html","text!templates/projects/details/06.html","text!templates/projects/details/07.html","text!templates/projects/details/08.html","text!templates/projects/details/09.html","text!templates/projects/details/10.html","text!templates/projects/details/11.html","text!templates/projects/details/12.html","text!templates/projects/details/13.html","text!templates/projects/details/14.html","text!templates/projects/details/15.html","text!templates/projects/details/16.html","precook"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){var t=c.View.extend({el:"#id_projectDetail",loaded:!1,projectID:null,templates:[d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s],events:{"click a.unload":"onUnloadPageClicked"},initialize:function(a){this.projectID=a.id,this.preloadImages("detail-"+this.projectID)},render:function(){var a=b.template(this.templates[parseInt(this.projectID)-1]);return this.$el.html(a({})),this.loaded||(this.$el.removeClass("loading"),this.loaded=!0),this},preloadImages:function(a){var b=this,c=new Precook;c.on("preloader:configLoaded",function(){c.load(a)}),c.on("preloader:completed",function(a){b.loadPage()}),c.setConfig(IMAGES_JSON)},loadPage:function(){a("body").removeClass("loader"),a(".layout section").addClass("loading"),a("body > .grid").removeClass("loading"),a("#id_menu").removeClass("hidden"),a("#id_menu").removeClass("opened"),a("body").css("overflow","auto"),this.setLogoColor(),a("body, html").scrollTop(0),a("body").removeClass("menu-page"),a("body").removeClass("home-page"),a("body").removeClass("about-page"),a("body").removeClass("projects-page"),a("body").addClass("detail-page"),this.render()},setLogoColor:function(){var b=parseInt(this.projectID);4==b||10==b||12==b||16==b?a("body").addClass("white-logo"):a("body").removeClass("white-logo")},onUnloadPageClicked:function(b){b.preventDefault(),this.$el.addClass("loading"),a("body > .grid").addClass("loading"),setTimeout(function(){window.location.href=a(b.currentTarget).attr("href")},550)},destroy:function(){var a=this;setTimeout(function(){a.undelegateEvents(),a.$el.removeData().unbind(),a.remove(),c.View.prototype.remove.call(a)},550)}});return t});