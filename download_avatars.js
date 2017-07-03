
var request = require('request');

var GITHUB_USER = "kellybarber";
var GITHUB_TOKEN = "5285ac698dff71b208dd5a4edde0d46e55e261a4";
var repoOwner = "jquery";
var repoName = "jquery";

var requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
console.log(requestURL);

function getRepoContributors(repoOwner, repoName, cb) {
  // ...


}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
