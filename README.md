# Flickr Portfolio

## Application Overview
"Flickr Portfolio" is a photography portfolio which showcases photos I have taken which are stored in my Flick account.

### Major Features
* All photos are stored on Flickr, each it one or more albums; photos are not stored locally.
* Flickr API's were used to display photos in albums in the website.  Photo titles, defined in Flickr, are also shown below each photo.
* Photos added to Flickr for existing albums are automatically shown on my portfolio; neither adjustment to the HTML code nor manual uploading of photos is required.


## Technologies Used
* HTML5
* CSS3
* jQuery
* AngularJS
* Flickr API's
** One API is particularly useful; all uploaded photos are automatically converted to a collection of photos of varying dimensions; i.e., thumbnails, and small / medium / large photo dimensions.  A simple formula for the <img> source tag makes it each to select the desired photo dimensions.
* jQuery Version

## What I Learned
### Flickr API's
* There are dozens of Flickr API's to choose from.  I was not familiar with any of these when I started this project.  It would have been better to study the API's in more detail before defining the project requirements.
* Many of the API's require user authentication; many do not.  At first, I did not recognize this, and a lot of time was wasted trying to figure out how to code the authentication.  Ultimately, authentication was not needed since the required methods did not require authentication.
* Slide Show
* Originally, I intended to display photos in a slide show.  I have done this successfully using the carousel feature in Bootstrap, but this did not work in this application.  I was able to create a slideshow but it would not play automatically, and the forward and back buttons did not work because of how the Angular routing was defined.
* Next I tried a jQuery plugin called "fancybox" which provided similar functionality.  I ran into the same use; I could display thumbnails of each photo but the Angular routing also interfered.
* Next I tried Angular slideshow code I found on GitHub.  Installation of this code was straightforward; however, it did not work in my application either.  As time was running out, I abandoned additional of a slideshow and instead displayed photos as a collage.  Later, I will re-explore this Angular technique.
### Angular Factory Coding
* This is the first application I have created which uses an Angular Factory.
### jQuery Versions
* The fancybox plugin required a newer version of jQuery than I was using.  The error message was cryptic and provided no meaningful information regarding the source of the error.  Fortunately, I suspected this was a problem before investing too much time in debugging.  Going forward, I will consider using links to jQuery instead of using static jQuery.js files.

## Possible Future Updates
* Display photos in a slideshow instead of as a collage.  
* Display photos comments added by Flickr users.
* Create a page which shows the most-commonly viewed photos.

## Link to GutHub (https://github.com/tsanders30004/flickrApi)
