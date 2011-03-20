var http = require('http');  
var loggly = require('loggly');
var path = require('path');  
var paperboy = require('paperboy');
var url = require('url');

// connect up to loggly
var config = {
  subdomain: "geekceo",
  auth: {
    username: "kordless",
    password: "password"
  }
};
var lkey = 'a3e839e9-4827-49aa-9d28-e18e5ba5a818';
var lhandler = function (err, result) {}; 
var geekceo = loggly.createClient(config);

geekceo.log(lkey, 'loggly-node-chart: server starting up', lhandler);
console.log('starting up');

// serve static or API content
var server = http.createServer(function(req, resp){ 
  if (req.url.indexOf('/api') == 0) {
    geekceo.log(lkey, 'loggly-node-chart: serving /api/', lhandler);
    apiHandler(req, resp)
  } else {
    geekceo.log(lkey, 'loggly-node-chart: serving /static/', lhandler);
    paperboy.deliver(path.join(path.dirname(__filename), 'static'), req, resp);
  }
});

var apiHandler = function (req, resp) {
  // parse our parameters
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query['query'];

  // run a facet call to loggly for the search term
  geekceo.facet('date', query)
    .context({ buckets: 1, from: "NOW-7DAYS", until: "NOW" })
    .run(function (err, results) {
  	  for (key in results.data) {}
      var count = results.data[key]; 
      var stuff = {'query': query, 'count': count};  
      resp.writeHead(200, { 'content-type': 'application/json', });
      resp.write(JSON.stringify(stuff));
      resp.end();
      geekceo.log(lkey, 'loggly-node-chart: api request term='+query, lhandler);
    });
}

server.listen(80);

