const width = 800;
const height = 400;
const margin = {top: 20, right: 30, bottom: 30, left: 40};

const svg = d3.select("#graph")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleLinear()
  .domain([-10, 10])
  .range([0, width - margin.left - margin.right]);

const y = d3.scaleLinear()
  .domain([-10, 10])
  .range([height - margin.top - margin.bottom, 0]);

svg.append("g")
  .attr("transform", `translate(0,${y(0)})`)
  .call(d3.axisBottom(x));

svg.append("g")
  .attr("transform", `translate(${x(0)},0)`)
  .call(d3.axisLeft(y));

function drawGraph() {
  const equation = document.getElementById("equation").value;
  if (!equation) return;

  try {
    const data = d3.range(-10, 10.1, 0.1).map(d => {
      let x = d;
      let y = eval(equation);
      return {x: x, y: y};
    });

    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);
  } catch (error) {
    alert("수식에 오류가 있습니다. 다시 입력해주세요.");
  }
}

