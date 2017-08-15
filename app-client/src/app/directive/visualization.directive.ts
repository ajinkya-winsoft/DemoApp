import { ElementRef, EventEmitter, Input, Component, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'appVisualization',
  //inputs: ['chartType'],
  templateUrl: './directive.appVisualization.html',
  styleUrls: ['./directive.appVisualization.css']
})
export class VisualizationDirective implements OnChanges{
  loadFunc = new EventEmitter();
  htmlContent: string;
  xData: any[];
  yData: any[];
  menu: any;
  hideInputContainer: boolean = true;
  constructor(private el: ElementRef) {
    console.log("directive loaded");
    let m = new Menu();
    this.menu = m.getMenuList('chart');
  }

  visualtizationType: string;

  @Input('chartType') chartType: string;

  ngOnChanges(changes: SimpleChanges) {
    console.log("change detected");
    
    //console.log(changes);
    
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
      chart.drawGraph(this.xData, this.yData);
    }
  }


  getVisualizationType(type: string): string {
    console.log(type)
    let visualtizationType: string;
    switch (type) {
      case "Barchart": {
        this.visualtizationType = "Barchart";
        //this.hideInputContainer = true;
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

  assignData (e: any, type:string) {
    console.log(e);
    console.log(type);
    if(type == 'x')
      this.xData = e.dragData;
    else if(type == 'y') {
      this.yData =  e.dragData
    }
    

    if(this.xData != undefined && this.yData != undefined ) {
      console.log("both variable set");
      let chart = new BarChart(this.visualtizationType);
      chart.drawGraph(this.xData, this.yData);
      
    }
    
   console.log(e.dragData)
    }

    makeInputContainerVisible(): void {
      this.hideInputContainer = false;
    }
}


export class Chart {
  visualtizationType: String;
  htmlContent:string;
  constructor(visualtizationType: string) {
    this.visualtizationType = visualtizationType;
  }

  public sethtmlContent(content:string) {
    this.htmlContent = content;
  }
}

export class BarChart extends Chart implements OnChanges{
  @Input('x-data') xData: any[];
  @Input('y-data') yData: any[];

  

  ngOnChanges(changes: SimpleChanges) {
    console.log("change detected");
    
    //console.log(changes);
    
    // const name: SimpleChange = changes.name;
    // console.log('prev value: ', name.previousValue);
    // console.log('got name: ', name.currentValue);
    //this._name = name.currentValue.toUpperCase(); 
  }
  drawGraph(xdata, ydata): void {

    console.log(xdata);
    
    if(xdata == undefined || ydata == undefined ) {
     
      
      var svg = d3.select("svg");

      console.log("check if image is present already");
      console.log(svg.select("image").empty());
      

      var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;
      
      svg.append("image")
          .attr('x',(width/2)-150)
          .attr('y',(height/2)-100)
          .attr('width', 300)
          .attr('height', 200)
          .attr("xlink:href","../../assets/images/bar-chart-1.png");
      return;
    }

    
    

    var svg = d3.select("svg");
    
    svg.remove('image');
        
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // d3.tsv("../assets/data/data.tsv", function (d) {
    //   //d.frequency = +d.frequency;
    //  // return d;
    // }, function (error, data) {
    //   if (error) throw error;

      // x.domain(xdata);
      // y.domain([0, d3.max(y, function (d) { return d.frequency; })]);

      x.domain(xdata);
      y.domain([0, d3.max(ydata)]);

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

        var  data  = [xdata,ydata];
        console.log("data");
        console.log(data);
        
        

      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) {console.log("d-x: %s,i : %s",d,i); console.log(d);return x(d[0]); })
        .attr("y", function (d, i) {console.log("d-y: %s, i: %s",d,i); console.log(d); return y(d[1]); })
        .attr("width",10)
        .attr("height", function (d,i) { return height - y(d[1]); });
    // });
      
  }

}

export class Menu {
  menuList: any = {
      'chart': [
        {
          "name": "Bar chart",
          "icon": "show_chart",
          "type": "Barchart"
        },
        {
          "name": "Pie chart",
          "icon": "pie_chart",
          "type": "Piechart"
        },
        {
          "name": "Bubble chart",
          "icon": "bubble_chart",
          "type": "Bubblechart"          
        }
      ],
      'storage': [
        {
          "name": "XYZ",
          "icon": "show_chart",
          "type": "Barchart"
        },
        {
          "name": "ABC",
          "icon": "pie_chart",
          "type": "Barchart"
        },
        {
          "name": "PQR",
          "icon": "bubble_chart",
          "type": "Barchart"
        }
      ]
    }

  getMenuList(menuItem): string[] {
    // console.log("menu item being delivered");
    // console.log(this.menuList[menuItem]);
    
    return this.menuList[menuItem];
  }
}