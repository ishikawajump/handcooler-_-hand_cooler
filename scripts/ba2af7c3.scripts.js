"use strict";angular.module("handCoolerApp",["ngCookies","ngResource","ngSanitize","ngRoute","mgcrea.ngStrap","angularytics","ngSocial"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/gem_detail.html",controller:"GemDetailCtrl"}).when("/search/:query/",{templateUrl:"views/search.html",controller:"GemsCtrl"}).when("/search/:query/:page",{templateUrl:"views/search.html",controller:"GemsCtrl"}).when("/gems/:gemName",{templateUrl:"views/gem_detail.html",controller:"GemDetailCtrl"}).otherwise({redirectTo:"/"})}]).controller("HeaderCtrl",["$scope","$location",function(a,b){a.doSearch=function(a){b.path("/search/"+a)}}]).factory("detectRepos",function(){return{uri:function(a){return a.source_code_uri&&"github.com"===URI(a.source_code_uri).hostname()?a.source_code_uri:a.homepage_uri&&"github.com"===URI(a.homepage_uri).hostname()?a.homepage_uri:!1}}}).config(["AngularyticsProvider",function(a){a.setEventHandlers(["Console","GoogleUniversal"])}]).run(["Angularytics",function(a){a.init()}]),angular.module("handCoolerApp").controller("GemsCtrl",["$scope","$http","$routeParams","detectRepos",function(a,b,c,d){a.pageCount=parseInt(c.page,10)||1,a.query=c.query,a.getReposUrl=function(a){return d.uri(a)},a.doSearch=function(){var c=new URI("http://api.handcooler.org/rubygems.org/api/v1/search.json");c.search({query:a.query,page:a.pageCount}),b.get(c).success(function(b,c){a.gems=b,a.status=c,a.pageCount>1&&(a.doesExistPrev=!0),30===a.gems.length&&(a.doesExistNext=!0)}).error(function(b,c){a.gems=b||"Request Failed",a.status=c})},a.doSearch()}]),angular.module("handCoolerApp").controller("GemDetailCtrl",["$scope","$http","$routeParams","$window","detectRepos",function(a,b,c,d,e){if(a.gemName=c.gemName,!a.gemName){a.siteDescription=!0;var f=["paperclip","appraisal","tachikoma","omniauth","pundit"];a.exampleGems=f,a.gemName=f[Math.floor(Math.random()*f.length)]}a.fetchReadme=function(c){var d=URI(c),e="http://api.handcooler.org/readme/github.com/"+d.segment(0)+"/"+d.segment(1);b.get(e).success(function(b){a.readme=b})},a.doCompare=function(b){var c=URI(a.sourceUrl);a.compareUrl="https://github.com/"+c.segment(0)+"/"+c.segment(1)+"/compare/"+b.base+"..."+b.compare,d.open(a.compareUrl)},a.fetchTags=function(c){var d=URI(c),e="http://api.handcooler.org/tags/github.com/"+d.segment(0)+"/"+d.segment(1)+".json";b.get(e).success(function(b){a.tags=b,a.tags.base=a.tags[1],a.tags.compare=a.tags[0]})};var g="http://api.handcooler.org/rubygems.org/api/v1/gems/"+a.gemName+".json";b.get(g).success(function(b){a.detail=b,a.sourceUrl=e.uri(b),a.fetchReadme(a.sourceUrl),a.fetchTags(a.sourceUrl)})}]);