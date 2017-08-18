import { ElementRef, EventEmitter, Input, Component, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Chart} from './Chart';
import * as d3 from "d3";

export class BarChart implements OnChanges {
  
    ngOnChanges(changes: SimpleChanges) {
      console.log("change detected");
    }
    drawGraph(xdata, ydata, data): void {
      console.log("data");
      console.log(data);
  
      if (xdata == undefined || ydata == undefined) {
  
  
        var svg = d3.select("svg");
  
        console.log("check if image is present already");
        console.log(svg.select("image").empty());
  
  
        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;
  
        svg.append("image")
          .attr('x', (width / 2) - 150)
          .attr('y', (height / 2) - 100)
          .attr('width', 300)
          .attr('height', 200)
          .attr("xlink:href", "../../assets/images/bar-chart-1.png");
        return;
      }
  
  
  
  
      var svg = d3.select("svg").select("image").remove();
      var svg = d3.select("svg");
      // svg.remove('image');
  
      var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
  
      var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);
  
      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
      x.domain(data.map(function (d) { return d[xdata]; }));
      y.domain([0, d3.max(data, function (d) { return +d[ydata]; })]);
  
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");
  
      // var  data  = [xdata,ydata];
      // console.log("data");
      // console.log(data);
  
  
  
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) { console.log("d-x: %s,i : %s", d, i); console.log(d); return x(d[xdata]); })
        .attr("y", function (d, i) { console.log("d-y: %s, i: %s", d, i); console.log(d); return y(+d[ydata]); })
        .attr("width", 10)
        .attr("height", function (d, i) { return height - y(d[ydata]); });
      // });
  
    }
  
  }