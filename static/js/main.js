// Graphing with node-loggly and google charts
// Hacked by: kord@loggly.com
// Date: 3/18/11

var chartData = [];

var updateChart = function() {
  var chl = "";
  var chd = "t:"
  var total = 0;
  $.each(chartData, function(key, val) {
    total = total + val.count;
  });
  $.each(chartData, function(key, val) {
    var dp = Math.round(val.count/total*1000)/10;   
    chd = chd + dp + ","; 
    chl = chl + val.query + " (" + dp + ")|";  
  });
  chd = chd.slice(0, -1)
  chl = chl.slice(0, -1)
  chartURL = "https://chart.googleapis.com/chart?cht=p&chd="+chd+"&chs=500x300&chl="+chl;
  $('#pie').html("<img src='"+chartURL+"'/>");
}

var gotime = function(terms) {
  $.each(terms, function(key, val) {
    $.getJSON('/api?query='+val, function(data) {
      chartData.push({'query': data.query, 'count': data.count}); 
      updateChart();
    });
  });
}

