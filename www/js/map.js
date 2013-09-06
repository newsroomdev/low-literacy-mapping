var margin = {top: 10, left: 10, bottom: 10, right: 10}
  , width = parseInt(d3.select('#litmap').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .5
  , height = width * mapRatio;

// project and path setup
var projection = d3.geo.albersUsa()
  .scale(width)
  .translate([width / 2, height / 2]);

// select a range of > 90% of literacy data (0 to 30%)
// quantize into 9 buckets
var quantize = d3.scale.quantize()
  .domain([0, 30])
  .range(colorbrewer.YlOrBr[9]);

var path = d3.geo.path().projection(projection);

// add to litmap
var map = d3.select("#litmap").append("svg")
  .style('height', height + 'px')
  .style('width', width + 'px');

// unicorn magic! create SVGs of counties with quantized class q0 thru q9
// if the shape is also that of a state, label with state class for styling
d3.json("counties.json", function(error, counties) {
  map.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(counties, counties.objects.counties).features)
    .enter().append("path")
      .attr("d", path)
      .style('fill', function(d) {
        var value = d.properties.rate;
        return quantize(value);
      });

  map.append("path")
    .datum(topojson.mesh(counties, counties.objects.states, function(a, b) { return a !== b; }))
    .attr("class", "states")
    .attr("d", path);
});

// RESIZE FUNCTIONALITY NEEDS LAND FEATURES

// d3.select(window).on('resize', resize);

// var legend = d3.select('#legend')
//   .append('ul')
//   .attr('class', 'list-inline');

// var keys = legend.selectAll('li.key')
//   .data(quantize.range());

// keys.enter().append('li')
//   .attr('class', 'key')
//   .style('border-top-color', String)
//   .text(function(d) {
//       var r = quantize.(d);
//       return formats.percent(r[0]);
//   });

// function resize() {
//   // adjust things when the window size changes
//   width = parseInt(d3.select("#litmap").style("width"));
//   width = width - margin.left - margin.right;
//   height = width * mapRatio;

//   // update projection
//   projection.translate([width / 2, height / 2])
//     .scale(width);

//   // resize the map container
//   map.style("width", width + "px").style("height", height + "px");

//   // resize the map
//   map.select(".land").attr("d", path);
//   map.selectAll(".counties").attr("d", path);
//   map.selectAll(".states").attr("d", path);
// }

// test for MSIE x.x;
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
  // capture x.x portion and store as a number
  var IEversion = new Number(RegExp.$1);
  if (IEversion < 9) {
    var litmap_png = Pancake("litmap", {
      class: "litmap-png",
      alt: "A map of low literacy in the United States"
    });

    litmap_png.replace("litmap");
  }
}