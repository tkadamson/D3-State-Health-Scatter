//Assign width and height to full chart
const svgWidth = 960;
const svgHeight = 500;

const margin = {
    top: 25,
    bottom: 25, 
    right: 25, 
    left: 25
};

//Define inner width for data in the whole svg
const innerWidth = svgWidth - margin.left - margin.right;
const innerHeight = svgHeight - margin.top - margin.bootom;

//Create svg wrapper
const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Define a chart group where data points will live

const chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Define a second group where the abbreviations will live over the top of the scatter circles
const chartGroup2 = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Grab data from data.csv
d3.csv("assets/data/data.csv").then(stateData => {

    //Get relevant data in numeric format
    stateData.forEach(data => {
        data.poverty = +data.poverty
        data.smokes = +data.smokes
    });

    console.log(stateData);

}).catch(error => console.log(error));

