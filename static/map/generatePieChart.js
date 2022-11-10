/**
 * Calculates percentage of underserved and unserved results for the community
 * @param {*} data Multitest data object containing served/underserved/unserved counts
 * @returns a percentage
 */
function calculatePercentage(data) {
  const total = data?.served + data?.underserved + data?.unserved
  const percentage = ((data?.underserved + data?.unserved) / total) * 100
  if (isNaN(percentage)) {
    return 0
  } else {
    return Number.isInteger(percentage) ? percentage : percentage.toFixed(1)
  }
}

/**
* Generates the pie chart to display multitest performance ranks
*/
function generatePieChart ({
  data = {}
}) {
  const width = 280
  const height = 280
  const margin = 20
  const radius = Math.min(width, height) / 2 - margin
  
  const svg = d3.select(".pie-chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

  const pie = d3.pie()
    .sort(null)
    .value(d => d.value);

  const arc = d3.arc()
    .innerRadius(85)    
    .outerRadius(radius)
    .cornerRadius(8)

  const arcs = pie(d3.entries(data?.multitestPerformanceRank))

  const colorScale = d3.scaleOrdinal()
    .domain(["served", "unserved", "underserved"])
    .range(["var(--color-served)", "var(--color-unserved)", "var(--color-underserved)"])

  svg.append("text")
    .attr("class", "pie-chart-percentage")
    .attr("text-anchor", "middle")
    .text(`${calculatePercentage(data?.multitestPerformanceRank)}%`);
  
  svg.append("text")
    .attr("class", "pie-chart-text")
    .attr("dy", "2em")
    .attr("text-anchor", "middle")
    .text('Unserved and underserved')

  svg.append("g")
    .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .enter().append("path")
    .attr("fill", d => colorScale(d.data.key))
    .attr("d", arc)
    .on("mouseenter", function(d) {
      d3.select('.pie-chart-percentage').text(d.data.value)
      d3.select('.pie-chart-text').text(d.data.key)
    })
    .on("mouseout", function() {
      d3.select('.pie-chart-percentage').text(`${calculatePercentage(data?.multitestPerformanceRank)}%`)
      d3.select('.pie-chart-text').text('Unserved and Underserved')
    })
}

export { generatePieChart }