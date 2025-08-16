import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const StockChart = ({ symbol }) => {
  const svgRef = useRef();
  const [timeframe, setTimeframe] = useState("3m"); // Default: 3 months
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`https://stocks-backend-fdcd.onrender.com/stock/${symbol}?interval=${timeframe}`);
        if (response.data) {
          const formattedData = response.data.map((d) => ({
            date: new Date(d.date),
            price: d.close, // Closing price
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
  }, [symbol, timeframe]);

  useEffect(() => {
    if (data.length === 0) return;

    const width = 700;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };

    d3.select(svgRef.current).selectAll("*").remove(); // Clear previous chart

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Scales
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.price) * 0.95, d3.max(data, (d) => d.price) * 1.05])
      .range([height - margin.bottom, margin.top]);

    // Line Generator
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.price))
      .curve(d3.curveMonotoneX); // Smooth curve

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.timeFormat("%b %d")));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Line Path
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#E74C3C")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#fff")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("box-shadow", "0px 0px 5px rgba(0, 0, 0, 0.3)")
      .style("visibility", "hidden");

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.date))
      .attr("cy", (d) => yScale(d.price))
      .attr("r", 3)
      .attr("fill", "#E74C3C")
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .html(`<strong>${d.date.toDateString()}</strong>: $${d.price}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));
  }, [data]);

  return (
    <div className="p-4 border rounded-lg bg-black text-white shadow-md">
      <h2 className="text-lg font-bold">{symbol} Stock Chart</h2>
      <div className="flex gap-2 mb-3">
        {["3m", "2y"].map((t) => (
          <button key={t} onClick={() => setTimeframe(t)} className={`p-2 ${timeframe === t ? "bg-red-500" : "bg-gray-700"} rounded-md`}>
            {t === "3m" ? "3 Months" : "2 Years"}
          </button>
        ))}
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StockChart;
