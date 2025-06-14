import { SVG_WIDTH, SVG_HEIGHT, MARGIN, COLUMN_LABELS, COLUMN_GAP, COLORS } from './constants.js';

export function setupSVG() {
  const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", SVG_WIDTH)
    .attr("height", SVG_HEIGHT);

  const chartWidth = SVG_WIDTH - MARGIN.left - MARGIN.right;
  const chartHeight = SVG_HEIGHT - MARGIN.top - MARGIN.bottom;

  const g = svg.append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

  const columnWidth = (chartWidth - (COLUMN_GAP * (COLUMN_LABELS.length - 1))) / COLUMN_LABELS.length;

  // Column Backgrounds and Labels
  COLUMN_LABELS.forEach((label, i) => {
    const xPos = i * (columnWidth + COLUMN_GAP);
    g.append("rect")
      .attr("class", `column-bg column-${label.toLowerCase()}`)
      .attr("x", xPos)
      .attr("y", 0)
      .attr("width", columnWidth)
      .attr("height", chartHeight)
      .attr("fill", COLORS.COLUMN_BG)
      .attr("stroke", COLORS.COLUMN_BORDER);

    g.append("text")
      .attr("class", `column-label column-label-${label.toLowerCase()}`)
      .attr("x", xPos + columnWidth / 2)
      .attr("y", chartHeight + MARGIN.bottom / 2 - 10) // Position labels below columns
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text(label);
  });

  // Placeholder for column text info

  COLUMN_LABELS.forEach((label, i) => {
    const xPos = i * (columnWidth + COLUMN_GAP);
    g.append("g")
      .attr("class", `column-text-group column-text-${label.toLowerCase()}`)
      .attr("transform", `translate(${xPos}, 0)`);
  });

  // Add a group for the sum equation display
  g.append("g").attr("class", "sum-equation-group");

  // Add right-click listeners to column backgrounds for composition
  g.select(".column-bg.column-ones")
    .on("contextmenu", function (event) {
      event.preventDefault();
      console.log("Right-clicked Ones column");
      if (window.handleColumnRightClick) {
        window.handleColumnRightClick('ones');
      }
    });

  g.select(".column-bg.column-tens")
    .on("contextmenu", function (event) {
      event.preventDefault();
      console.log("Right-clicked Tens column");
      if (window.handleColumnRightClick) {
        window.handleColumnRightClick('tens');
      }
    });

  return { svg, g, chartWidth, chartHeight, columnWidth };
}