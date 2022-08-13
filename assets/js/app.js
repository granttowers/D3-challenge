// Part 1a - Setting Up the Graph Dimensions and adding to page
// Setting the width
var width = parseInt(d3.select("#scatter").style("width"));

// Setting the height and add spacing for margins around graph
var height = width - width / 4.5;
var margin = 20;

// Add space for the adding of labels and padding for text
var labelArea = 110;
var tPadBot = 40;
var tPadLeft = 40;

// Create the actual canvas for the graph on the page
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

// Setting up a variable and function so that each dot will appear. Also added function so that if screen resized, the radius will reduce. 
var dotradius;
function crGet() {
  if (width <= 600) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}
crGet();


// Part 1b - Setting Up the X Axis Labels for the Graph
// Create a group element to attach the bottom labels
svg.append("g").attr("class", "xTextLabels");
var xTextLabels = d3.select(".xTextLabels");

// Add a function to transform the labels so that they align at the bottom of the chart
// By nesting this attribute in a function, we can easily change the location of the label group
// whenever the width of the window changes.
function xTextRefresh() {
  xTextLabels.attr(
    "transform",
    "translate(" +
    ((width - labelArea) / 2 + labelArea) +
    ", " +
    (height - margin - tPadBot) +
    ")"
  );
}
xTextRefresh();

// The use xTextLabels to appent the SVG files,  with y coordinates specified to space out the values on the graph canvas itself
// First Variable - Poverty
xTextLabels
  .append("text")
  .attr("y", -20)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "aText active x")
  .text("In Poverty (%)");

// Second Variable - Age
xTextLabels
  .append("text")
  .attr("y", 0)
  .attr("data-name", "age")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Age (Median)");

// Third Variable - Income
xTextLabels
  .append("text")
  .attr("y", 20)
  .attr("data-name", "income")
  .attr("data-axis", "x")
  .attr("class", "aText inactive x")
  .text("Household Income (Median)");


// Part 1c - Setting Up the Y Axis Labels for the Graph

var leftTextX = margin + tPadLeft;
var leftTextY = (height + labelArea) / 2 - labelArea;

// Create a group element to attach the yaxis labels.
svg.append("g").attr("class", "yTextLabels");

// yText will allows us to select the group without excess code.
var yTextLabels = d3.select(".yTextLabels");

// Like before, we nest the group's transform attr in a function
// to make changing it on window change an easy operation.
function yTextRefresh() {
  yTextLabels.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );
}
yTextRefresh();

// The use yTextLabels to appent the SVG files
// First Variable - Obesity
yTextLabels
  .append("text")
  .attr("y", -20)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "aText active y")
  .text("Obese (%)");

// Second Variable - Smokes
yTextLabels
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Smokes (%)");

// Third Variable - Health Care
yTextLabels
  .append("text")
  .attr("y", 20)
  .attr("data-name", "healthcare")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Lacks Health Care (%)");


//====================================
// Part 2 - Import the data from the CSV file
d3.csv("assets/data/data.csv").then(function (data) {
  visualize(data);
});

//====================================
// Part 3 - Create Visualisation