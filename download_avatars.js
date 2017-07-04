
var request = require('request');
var fs = require('fs')

var GITHUB_USER = "kellybarber";
var GITHUB_TOKEN = "5285ac698dff71b208dd5a4edde0d46e55e261a4";
var repoOwner = "jquery";
var repoName = "jquery";

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = {
    url: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  }

  request(requestURL, function(err, response, body) {
    if (err) {
      console.log(`Error fetching: ${requestURL}`, err);
      return;
    }

    if (response.statusCode === 200) {
      var json = JSON.parse(body);
      cb(json);
    }

  });

}

getRepoContributors("jquery", "jquery",
  function(json) {
    for (prop of json) {
      console.log(prop['login']);
      console.log(prop['avatar_url']);
    }
  });


// var contributors = '';
// var parsedJSON = '';

// request.get(requestURL)
//        .on('error', function(err) {
//           if (err) {
//             throw err;
//           }
//         })
//
//        .on('response', function(response) {
//          console.log(response.statusMessage);
//          console.log(response.headers);
//        })
//
//        .on('data', function(data) {
//          contributors += data;
//        })
//
//        .on('end', function() {
//          parsedJSON = (JSON.parse(contributors));
//          console.log(cb());
//        })
//
//
// }
