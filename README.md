# node-loggly-graph

Example of using [node-loggly](http://github.com/nodejitsu/node-loggly) with node.js and [Google Charts](http://code.google.com/apis/chart/).

## Installation
Node.js, node-loggly, and paperboy are required to run this demo.

### Installing 
You'll need the latest [node.js](http://nodejs.org), npm (node package manager), node-loggly, and paperboy (static server) to run the demo.  Leaving you to install node.js, here are the commands for installing the rest:

<pre>
  curl http://npmjs.org/install.sh | sh
  [sudo] npm install loggly
  [sudo] npm install paperboy
</pre>

Now grab the node-loggly-graph example project:

<pre>
  curl https://github.com/loggly/node-loggly-graphs/tarball/master
  tar xvfz loggly* 
  cd loggly*
</pre>

### Configuring
Edit the *chart.js* file and put in your Loggly subdomain, username and password:

<pre>
  // connect up to loggly
  var config = {
    subdomain: "geekceo",
    auth: {
      username: "kordless",
      password: "password"
    }
  };
</pre>

On Loggly, [create and copy a HTTP input key](http://wiki.loggly.com/send_events) and replace the one I have in the code (unless you want to send logs to our account):

<pre>
var lkey = 'a3e839e9-4827-49aa-9d28-e18e5ba5a818';
</pre>

You can also edit the terms list in *static/index.html* to search facets for other terms:

<pre>
  var terms = ['HTTP AND 200', 'HTTP AND 404', 'HTTP AND 302', 'HTTP AND 50*'];
</pre>

### Running
Start the server by doing a:

<pre>
  node chart.js
</pre>

Navigate to the page and check the APIs:

<pre>
  http://machine.yourdomain.com/
  http://machine.yourdomain.com/api?query=404
</pre>

### Caveats and TODO
The facet searches only look for the occurrence of a given string, such as 'safari', and then total all the instances of that over all requests.  Ideally you'd want to isolate and extract a sampling of user-agents over a shorter timeframe, dedup all the IP addresses and drop all the activty by bots.
