import { ElementRef, EventEmitter, Input, Component, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as d3 from "d3";
import { Chart } from '../visualization/charts/Chart';

@Component({
  selector: 'appVisualization',
  //inputs: ['chartType'],
  templateUrl: './directive.appVisualization.html',
  styleUrls: ['./directive.appVisualization.css']
})
export class VisualizationDirective implements OnChanges {
  loadFunc = new EventEmitter();
  htmlContent: string;
  xData: any[];
  yData: any[];
  menu: any;
  hideInputContainer: boolean = true;
  constructor(private el: ElementRef) {
    console.log("directive loaded");
    // let m = new Menu();
    // this.menu = m.getMenuList('chart');
  }

  visualtizationType: string;

  @Input('chartType') chartType: string;
  @Input('chartData') chartData: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log("change detected");

     this.visualtizationType = this.getVisualizationType(this.chartType);
    // console.log("visulation type: %s", this.visualtizationType);

    let chart = new Chart(this.visualtizationType, this.xData, this.yData, this.chartData)
    
    // if (this.visualtizationType == undefined) {
    //   throw new Error("Undefined chart type");
    // } else if(this.visualtizationType == 'Barchart')  {      
    //   let chart = new BarChart(this.visualtizationType);
    //   chart.drawGraph(this.xData, this.yData, this.chartData);
    // } else if(this.visualtizationType == 'Piechart') {
    //   console.log("pie chart selected");
    //   let chart = new PieChart(this.visualtizationType);
    //   chart.drawGraph(this.xData, this.yData, this.chartData);
    // }
  }

  ngOnInit() {
    // this.visualtizationType = this.getVisualizationType(this.chartType);
    // console.log("visulation type: %s", this.visualtizationType);
    
    // if (this.visualtizationType == undefined) {
    //   throw new Error("Undefined chart type");
    // } else if(this.visualtizationType == 'Barchart')  {      
    //   let chart = new BarChart(this.visualtizationType);
    //   chart.drawGraph(this.xData, this.yData, this.chartData);
    // } else if(this.visualtizationType == 'Piechart') {
    //   let chart = new PieChart(this.visualtizationType);
    //   chart.drawGraph(this.xData, this.yData, this.chartData);
    // }
  }


  getVisualizationType(type: string): string {
    console.log(type)
    let visualtizationType: string;
    switch (type) {
      case "Barchart": {
        this.visualtizationType = "Barchart";
        break;
      }

      case "Piechart": {
        this.visualtizationType = "Piechart";
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

  assignData(e: any, type: string) {
    console.log(e);
    console.log(type);
    if (type == 'x')
      this.xData = e.dragData;
    else if (type == 'y') {
      this.yData = e.dragData
    }


    if (this.xData != undefined && this.yData != undefined) {


      let chart = new Chart(this.visualtizationType, this.xData, this.yData, this.chartData)
      //chart.getChart().drawGraph();
      // if(this.visualtizationType == "Barchart") {
      //   let chart = new BarChart(this.visualtizationType);
      //   chart.drawGraph(this.xData, this.yData, this.chartData);
      // }
  
      // if(this.visualtizationType == "Piechart") {
      //   let chart = new PieChart(this.visualtizationType);
      //   chart.drawGraph(this.xData, this.yData, this.chartData);
      // }


      // console.log("both variable set");
      // let chart = new BarChart(this.visualtizationType);
      // chart.drawGraph(this.xData, this.yData, this.chartData);

    }

    console.log(e.dragData)
  }

  makeInputContainerVisible(): void {
    this.hideInputContainer = !this.hideInputContainer;
  }
}


// export class Chart {
//   visualtizationType: String;
//   htmlContent: string;
//   constructor(visualtizationType: string) {
//     this.visualtizationType = visualtizationType;
//   }

//   public sethtmlContent(content: string) {
//     this.htmlContent = content;
//   }
// }

// export class BarChart extends Chart implements OnChanges {
//   @Input('x-data') xData: any[];
//   @Input('y-data') yData: any[];



//   ngOnChanges(changes: SimpleChanges) {
//     console.log("change detected");
//   }
//   drawGraph(xdata, ydata, data): void {
//     console.log("data");
//     console.log(data);

//     if (xdata == undefined || ydata == undefined) {


//       var svg = d3.select("svg");

//       console.log("check if image is present already");
//       console.log(svg.select("image").empty());


//       var margin = { top: 20, right: 20, bottom: 30, left: 40 },
//         width = +svg.attr("width") - margin.left - margin.right,
//         height = +svg.attr("height") - margin.top - margin.bottom;

//       svg.append("image")
//         .attr('x', (width / 2) - 150)
//         .attr('y', (height / 2) - 100)
//         .attr('width', 300)
//         .attr('height', 200)
//         .attr("xlink:href", "../../assets/images/bar-chart-1.png");
//       return;
//     }




//     var svg = d3.select("svg").select("image").remove();
//     var svg = d3.select("svg");
//     // svg.remove('image');

//     var margin = { top: 20, right: 20, bottom: 30, left: 40 },
//       width = +svg.attr("width") - margin.left - margin.right,
//       height = +svg.attr("height") - margin.top - margin.bottom;

//     var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
//       y = d3.scaleLinear().rangeRound([height, 0]);

//     var g = svg.append("g")
//       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//     x.domain(data.map(function (d) { return d[xdata]; }));
//     y.domain([0, d3.max(data, function (d) { return +d[ydata]; })]);

//     g.append("g")
//       .attr("class", "axis axis--x")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));

//     g.append("g")
//       .attr("class", "axis axis--y")
//       .call(d3.axisLeft(y).ticks(10, "%"))
//       .append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", "0.71em")
//       .attr("text-anchor", "end")
//       .text("Frequency");

//     // var  data  = [xdata,ydata];
//     // console.log("data");
//     // console.log(data);



//     g.selectAll(".bar")
//       .data(data)
//       .enter().append("rect")
//       .attr("class", "bar")
//       .attr("x", function (d, i) { console.log("d-x: %s,i : %s", d, i); console.log(d); return x(d[xdata]); })
//       .attr("y", function (d, i) { console.log("d-y: %s, i: %s", d, i); console.log(d); return y(+d[ydata]); })
//       .attr("width", 10)
//       .attr("height", function (d, i) { return height - y(d[ydata]); });
//     // });

//   }

// }

// export class PieChart extends Chart implements OnChanges {

//   @Input('x-data') category: any[];
//   @Input('y-data') value: any[];

//   ngOnChanges(changes: SimpleChanges) {
//     console.log("change detected");
//   }


//   drawGraph(value, category, data) {

//     if (value == undefined || category == undefined) {
      
      
//             var svg = d3.select("svg");
      
//             console.log("check if image is present already");
//             console.log(svg.select("image").empty());
      
      
//             var margin = { top: 20, right: 20, bottom: 30, left: 40 },
//               width = +svg.attr("width") - margin.left - margin.right,
//               height = +svg.attr("height") - margin.top - margin.bottom;
      
//             svg.append("image")
//               .attr('x', (width / 2) - 150)
//               .attr('y', (height / 2) - 100)
//               .attr('width', 300)
//               .attr('height', 200)
//               .attr("xlink:href", "../../assets/images/pie-chart.png");
//             return;
//           }

//     var svg = d3.select("svg"),
//       width = +svg.attr("width"),
//       height = +svg.attr("height"),
//       radius = Math.min(width, height) / 2,
//       g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

//     var pie = d3.pie()
//       .sort(null)
//       .value(function (d) { return d[value]; });

//     var path = d3.arc()
//       .outerRadius(radius - 10)
//       .innerRadius(0);

//     var label = d3.arc()
//       .outerRadius(radius - 40)
//       .innerRadius(radius - 40);

  
//       var arc = g.selectAll(".arc")
//         .data(pie(data))
//         .enter().append("g")
//         .attr("class", "arc");

//       arc.append("path")
//         .attr("d", path)
//         .attr("fill", function (d) { return color(d.data[category]); });

//       arc.append("text")
//         .attr("transform", function (d) { return "translate(" + label.centroid(d) + ")"; })
//         .attr("dy", "0.35em")
//         .text(function (d) { return d.data[category]; });
//     }
// }