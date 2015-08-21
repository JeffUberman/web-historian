var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites/'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  //fs.readfile
  //read the sites.txt file
  var urls ='';
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) {
      throw err;
    }

    if(callback){
      urls += data
      callback(urls.split('\n'));
       }

//return urls;

});


};

exports.isUrlInList = function(url, callback){
  //reads archives/sites.txt and checks for the url
  // exports.readListOfUrls(function(array){
  //   if(callback(array.indexOf(url) > -1)){
  //     return true;
  //   }
  //   if(callback){
  //     callback(url);
  //   }
  //   else{
  //     return false;
  //   }
  // });
var string='';
  fs.readFile(exports.paths.list, function (err, data) {
    if (err) {
      throw err;
    }
    if(callback){
      string += data;
      console.log('stringBeforeSplit: '+string)
     // string=string.split('\n');
     // console.log('stringAfterSplit:'+string)
     console.log('url:'+url)
      console.log('stringTest:'+string.indexOf(url))
      callback(string.indexOf(url) > -1)

     }
  })

};

exports.addUrlToList = function(url, callback){
//should write the url to the sites.txt file
  exports.isUrlInList(url,function(found){
    if(!found){
      fs. vbappendFile(exports.paths.list, url + '\n', function(err){
        if(err){
          throw err;
        }
      }
    )}
    if(callback){
      //console.log('url:'+ url)
      //console.log('callback:'+ callback)
      callback(url);
    }

  })


};

exports.isUrlArchived = function(url, callback){

  var createUrlPath = path.join(exports.paths.archivedSites, url);
  fs.exists(createUrlPath, function (exists) {
    if(callback){
    callback(exists);
    }
  })
};

exports.downloadUrls = function(urlArray){
//url = String(url);
var html = '<html>reagan finally</html>'

  urlArray.forEach(function(url){
   // console.log('isUrlArchived:'+exports.isUrlArchived(url))
    if(!exports.isUrlArchived(url)){
      // exports.addUrlToList(url)
      fs.writeFile(exports.paths.archivedSites + url, html);
    }
  });
} ;
