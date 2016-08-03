var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
     $routeProvider.when('/', {
          templateUrl:   '../home.html',
          controller:    'linksController'
     })
     .when('/album/:id', {
          templateUrl:   '../album2.html',
          controller:    'albumController'
     })
     // .when('/album/:id', {
     //      templateUrl:   '../fb.html',
     //      controller:    'albumController'
     // })
     .otherwise({
          redirectTo: '/'
     });
}]);

myApp.factory('flickrApi', function($http){
     var someObj = {};
     var flickrApiKey = "aa4c54683b6e94d1adb818d9e9e0dea9";
     var flickrUserName = "145777084@N04";

     var photosetsGetList = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=" + flickrApiKey + "&user_id=" + flickrUserName + "&format=json&nojsoncallback=1";

     /* this gets the list of albums from Flickr */
     someObj.getAlbums = function(callback){
          var list=[];
          $http.get(photosetsGetList)
          .success(function(data){
               for (i=0; i<data.photosets.photoset.length; i++) {
                    list.push({
                         id:            data.photosets.photoset[i].id,
                         title:         data.photosets.photoset[i].title._content,
                         numPhotos:     data.photosets.photoset[i].photos,
                         subtitle:      data.photosets.photoset[i].description._content
                    });
               }
               callback(list);
          });
     };

     /* this function creates a source image filename that can be used inside an IMG tag.  The function is part of the Flickr API. */
     function imageSrc (size, photo_id, server_id, farm_id, secret){
          /* size is a one-letter code that defines the size of the photo:
          s	small square 75x75
          q	large square 150x150
          t	thumbnail, 100 on longest side
          m	small, 240 on longest side
          n	small, 320 on longest side
          -	medium, 500 on longest side
          z	medium 640, 640 on longest side
          c	medium 800, 800 on longest side†
          b	large, 1024 on longest side*
          h	large 1600, 1600 on longest side†
          k	large 2048, 2048 on longest side†
          o	original image, either a jpg, gif or png, depending on source format */
          return "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + photo_id + "_" + secret + "_" + size + ".jpg";
     }

     /* need another function to return a list of photos for a specific album */
     someObj.getPhotos = function(alb_id, callback){
          var list=[];
          var photoGetList="https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + flickrApiKey + "&photoset_id=" + alb_id + "&user_id=" + flickrUserName + "&format=json&nojsoncallback=1";
          console.log(photoGetList);
          $http.get(photoGetList)
          .success(function(data){
               console.log(data);
               console.log(data.photoset);
               console.log(data.photoset.id);
               console.log(data.photoset.title);
               console.log(data.photoset.total);
               console.log(data.photoset.photo);
               console.log(data.photoset.photo[0].id);
               console.log(data.photoset.photo[0].title);
               for (i=0; i<data.photoset.total; i++){
                    console.log(data.photoset.photo[i].id);
                    list.push({
                         id: data.photoset.photo[i].id,
                         title: data.photoset.photo[i].title,
                         farm: data.photoset.photo[i].farm,
                         server: data.photoset.photo[i].server,
                         secret: data.photoset.photo[i].secret,
                         thumbnail : imageSrc("s", data.photoset.photo[i].id, data.photoset.photo[i].server, data.photoset.photo[i].farm, data.photoset.photo[i].secret),
                         photo_src : imageSrc("z", data.photoset.photo[i].id, data.photoset.photo[i].server, data.photoset.photo[i].farm, data.photoset.photo[i].secret)
                    });
                    console.log(list[i]);
               }
               callback(list);     /* need to change this */
          });
     };

     return someObj;
});

myApp.controller('linksController', function($scope, flickrApi){
     $scope.jsonAlbum = {};
     flickrApi.getAlbums(function(albumList){
          $scope.jsonAlbum = albumList;
     });
});

myApp.controller('albumController', function($scope, $routeParams, flickrApi){
     $scope.myAlbumId = $routeParams.id;
     $scope.jsonAlbum = {};

     flickrApi.getPhotos($scope.myAlbumId, function(photoList){
          $scope.jsonPhotos= photoList;
     });
});
