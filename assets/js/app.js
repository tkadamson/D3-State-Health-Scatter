//Assign width and height to full chart
const svgWidth = 960;
const svgHeight = 500;

const margin = {
    top: 25,
    bottom: 65, 
    right: 25, 
    left: 50
};

//Define inner width for data in the whole svg
const innerWidth = svgWidth - margin.left - margin.right;
const innerHeight = svgHeight - margin.top - margin.bottom;

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

    //Create scale functions
    const xScale = d3.scaleLinear()
        .domain([8, d3.max(stateData, d => d.poverty) +1])
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.smokes) +1])
        .range([innerHeight, 0])
        .nice();

    //Create axis functions
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    //Append axis to chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

    const circleGroup = chartGroup.selectAll("circle")
      .data(stateData)
      .join("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.smokes))
      .attr("r", "15")
      .attr("class", "stateCircle")

    const textGroup = chartGroup2.selectAll("text")
        .data(stateData)
        .join("text")
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.smokes)+5)
        .text(d => d.abbr)
        .attr("class", "stateText");

       // Create axes labels
    chartGroup.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - margin.left)
       .attr("x", 0 - (innerHeight / 2) -25)
       .attr("dy", "1em")
       .text("Poverty Rate");
 
     chartGroup.append("text")
       .attr("transform", `translate(${(innerWidth / 2) -40}, ${innerHeight + margin.top + 30})`)
       .text("Smoking Rate");

}).catch(error => console.log(error));

