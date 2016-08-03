var flickrApiKey = "aa4c54683b6e94d1adb818d9e9e0dea9";
var flickrUserName = "145777084@N04";

/* API Calls */
var photosetsGetList = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=" + flickrApiKey + "&user_id=" + flickrUserName + "&format=json&nojsoncallback=1";

var jsonAlbum = [
     {"id":"72157668907606883","title":"Inga and Cliff","numPhotos":"7","subtitle":"Inga and Cliff - Engagement Photos"},
     {"id":"72157671026829922","title":"one_photo","numPhotos":"1","subtitle":""},
     {"id":"72157668883134723","title":"still life","numPhotos":"2","subtitle":""},
     {"id":"72157671771967546","title":"Test","numPhotos":"3","subtitle":""},
     {"id":"72157671763550776","title":"Cigars","numPhotos":"18","subtitle":"Cigars and Cigar Events"}];

function double_quoted(s) {
     return '"' + s + '"';
}

function createAlbumLinks(list){
     var i;
     html = "";
     for (i=0; i<list.length; i++) {
          html += "<div><a id=" + double_quoted(list[i].id) + ">" + list[i].title + "</a></div>";
     }
     console.log(html);
     return html;
}


console.log("hello world");

// function getPhotosets(){
//      // var photosetsGetList = "https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=" + flickrApiKey + "&user_id=" + flickrUserName + "&format=json&nojsoncallback=1";
//      var list = [];
//      $.ajax({
//           method: 'GET',
//           url: photosetsGetList,
//           dataType: 'json',
//           success: function (data) {
//                console.log(data);
//                var i;
//                for (i=0; i<data.photosets.photoset.length; i++) {
//                     list.push({
//                          id:            data.photosets.photoset[i].id,
//                          title:         data.photosets.photoset[i].title._content,
//                          numPhotos:     data.photosets.photoset[i].photos,
//                          subtitle:      data.photosets.photoset[i].description._content
//                     });
//                }
//           }
//      });
// }

// function getPhotoIds(sets){
//      /* sets are being correctly received from getPhotosets */
//
//      var url = "";
//      var list = [];
//      var row;
//      var i;
//
//      for (i=0; i<sets.length; i++){
//           url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + flickrApiKey + "&photoset_id=" + sets[i].id + "&user_id=" + flickrUserName + "&format=json&nojsoncallback=1";
//           // console.log(i + ' / ' + url);
//           // console.log('----------------------------------------------------------------');
//           $.ajax({
//                method: 'GET',
//                url: url,
//                dataType: 'json',
//                success: function (data) {
//                     // console.log({id: data.photoset.id, photos: data.photoset.photo, title: data.photoset.title, num_photos: data.photoset.total});
//                     row = {id: data.photoset.id, photos: data.photoset.photo, title: data.photoset.title, num_photos: data.photoset.total};
//                     console.log(i);
//                     console.log(row);
//                     list.push(row);
//                     // list.push({id: data.photoset.id, photos: data.photoset.photo, title: data.photoset.title, num_photos: data.photoset.total});
//                     // console.log(list[i]);
//                     // console.log(list[i]);
//                }
//                // console.log('list = ...');
//                // console.log(list);
//           });
//      }
// }

/* ----------------------------------------------------------------------------------------------------- */

function getAlbums(callback){
     var i;
     var list=[];

     $.ajax({
          method: 'GET',
          url: photosetsGetList,
          dataType: 'json',
          success: function (data) {
               // console.log(data);
               for (i=0; i<data.photosets.photoset.length; i++) {
                    list.push({
                         id:            data.photosets.photoset[i].id,
                         title:         data.photosets.photoset[i].title._content,
                         numPhotos:     data.photosets.photoset[i].photos,
                         subtitle:      data.photosets.photoset[i].description._content
                    });
               }
               callback(list);
          }
     });
}

// function getPhotos(albums, callback){
//      var i;
//      var list=[];
//
//      for (i=0; i<albums.length; i++){
//
//           url = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + flickrApiKey + "&photoset_id=" + albums[i].id + "&user_id=" + flickrUserName + "&format=json&nojsoncallback=1";
//
//           $.ajax({
//                method: 'GET',
//                url: url,
//                dataType: 'json',
//                success: function (data) {
//                     callback(data);
//                }
//           });
//      }
// }

/* ----------------------------------------------------------------------------------------------------- */



function main(){
     /* get the list of albums from Flickr */
     getAlbums(function(albumList){
          console.log('albumList from getAlbums = ...');
          console.log(albumList);
          console.log(JSON.stringify(albumList));
          createAlbumLinks(albumList);
     });

}


main();

$(document).ready(function(){
    $('#album_container').append(createAlbumLinks(jsonAlbum));
});
