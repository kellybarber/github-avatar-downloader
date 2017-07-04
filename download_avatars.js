
var request = require('request');
var fs = require('fs')

var args = process.argv.slice(2);

var GITHUB_USER = "kellybarber";
var GITHUB_TOKEN = "5285ac698dff71b208dd5a4edde0d46e55e261a4";
var repoOwner = args[0];
var repoName = args[1];

if ((repoOwner || repoName) == undefined) {
  console.log('Please enter a repository owner and repository');
  console.log('Ex: node download_avatars.js jquery jquery');
  return;
}


function getRepoContributors(repoOwner, repoName, callback) {

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
      callback(json);
    }

  });

}

getRepoContributors(repoOwner, repoName,
  function(json) {
    for (prop of json) {
      downloadImageByURL(prop['avatar_url'], `./avatars/${prop['login']}.jpg`);
    }
  });

function downloadImageByURL(url, filePath) {

  request.get(url)
         .on('error', function(err) {
           if (err) {
            throw err;
           }
         })
         .on('response', function(response) {
           console.log('Response Status Message: ', response.statusMessage);
           console.log('Response Status Headers: ', response.headers['content-type']);
         })

         .pipe(fs.createWriteStream(filePath));

}




//Alternative piping function

// request(url, function(err, response, body) {
//   if (err) {
//     console.log(`Error fetching: ${url}`, err);
//     return;
//   }
//
//   if (response.statusCode === 200) {
//     fs.createWriteStream(filePath).pipe(url);
//   }
//
// });

//Alternative get repo users function

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
