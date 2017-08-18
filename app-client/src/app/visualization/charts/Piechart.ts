import { ElementRef, EventEmitter, Input, Component, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Chart} from './Chart';
import * as d3 from "d3";

export class PieChart implements OnChanges {

      ngOnChanges(changes: SimpleChanges) {
        console.log("change detected");
      }
    
    
      drawGraph(value, category, data) {
    
        if (value == undefined || category == undefined) {
          
          
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
                  .attr("xlink:href", "../../assets/images/pie-chart.png");
                return;
              }
    
        var svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height"),
          radius = Math.min(width, height) / 2,
          g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
        var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    
        var pie = d3.pie()
          .sort(null)
          .value(function (d) { return d[value]; });
    
        var path = d3.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);
    
        var label = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 40);
    
      
          var arc = g.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
    
          arc.append("path")
            .attr("d", path)
            .attr("fill", function (d) { return color(d.data[category]); });
    
          arc.append("text")
            .attr("transform", function (d) { return "translate(" + label.centroid(d) + ")"; })
            .attr("dy", "0.35em")
            .text(function (d) { return d.data[category]; });
        }
    }