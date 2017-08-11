import { Directive, ElementRef, EventEmitter, Input, Component, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'appVisualization',
  //inputs: ['chartType'],
  template: `
      <svg width="960" height="500"  class="draggable"></svg>
    `
})
export class VisualizationDirective implements OnChanges{
  loadFunc = new EventEmitter();

  constructor(private el: ElementRef) {
    console.log("directive loaded");
  }

  visualtizationType: string;

  @Input('chartType') chartType: string;

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    
    // const name: SimpleChange = changes.name;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    //this._name = name.currentValue.toUpperCase(); 
  }

  ngOnInit() {
    this.visualtizationType = this.getVisualizationType(this.chartType);
    if (this.visualtizationType == undefined) {
      throw new Error("Undefined chart type");
    } else {
      let chart = new BarChart(this.visualtizationType);
      chart.drawGraph();
    }
  }


  getVisualizationType(type: string): string {
    console.log(type)
    let visualtizationType: string;
    switch (type) {
      case "Barchart": {
        this.visualtizationType = "Barchart";
        break;
      }

      default: {
        this.visualtizationType = undefined;
        break;
      }
    }
    return this.visualtizationType;
  }

  getProperty(): void {
    console.log("directive function called");
  }

}

export class Chart {
  visualtizationType: String;
  constructor(visualtizationType: string) {
    this.visualtizationType = visualtizationType;
  }
}

export class BarChart extends Chart {
  drawGraph(): void {
    var svg = d3.select("svg");
    console.log(svg);

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("../assets/data/data.tsv", function (d) {
      d.frequency = +d.frequency;
      return d;
    }, function (error, data) {
      if (error) throw error;

      x.domain(data.map(function (d) { return d.letter; }));
      y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

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

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.letter); })
        .attr("y", function (d) { return y(d.frequency); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.frequency); });
    });
  }

}
