import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const Chart = ({ symbol }) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState("5y"); // default timeframe

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://stocks-backend-fdcd.onrender.com/fictional-stock/${symbol}?interval=${interval}`);
        const formattedData = res.data.map((d) => ({
          date: new Date(d.date),
          price: d.price,
        }));
        setData(formattedData);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchData();
  }, [symbol, interval]);

  useEffect(() => {
    if (!data.length) return;

    const width = 700;
    const height = 350;
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.price) * 0.95, d3.max(data, d => d.price) * 1.05])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.price))
      .curve(d3.curveLinear);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(6).tickFormat(d3.timeFormat("%b %d")))
      .selectAll("text").style("fill", "#aaa");

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text").style("fill", "#aaa");

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#00ffcc")
      .attr("stroke-width", 2)
      .attr("d", line);

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#111")
      .style("color", "#fff")
      .style("padding", "5px 10px")
      .style("border-radius", "5px")
      .style("font-size", "14px")
      .style("visibility", "hidden")
      .style("z-index", 10);

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.price))
      .attr("r", 3)
      .attr("fill", "#00ffcc")
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .html(`<strong>${d.date.toDateString()}</strong><br/>$${d.price.toFixed(2)}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));
  }, [data]);

  return (
    <div className="p-4  rounded-lg bg-transparent text-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">{symbol}</h2>

      <div className="flex gap-2 mb-4">
        {["1d", "1m", "3m", "6m", "1y", "5y"].map((range) => (
          <button
            key={range}
            onClick={() => setInterval(range)}
            className={`px-3 py-1 rounded-md text-xs text-teal-300 bg-cyan-900 bg-opacity-50 transition ${
              interval === range ? "bg-teal-500 text-black" : "bg-cyan-500"
            }`}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>

      {data.length ? (
        <svg ref={svgRef}></svg>
      ) : (
        <p className="text-gray-400">No data available.</p>
      )}
    </div>
  );
};

export default Chart;
