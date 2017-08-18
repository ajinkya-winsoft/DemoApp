import {BarChart} from './Barchart'
import {PieChart} from './Piechart'

export class Chart {
    chart: any;
    visualtizationType: String;
    htmlContent: string;
    constructor(visualtizationType: string, xData: any, yData: any, chartData: any) {
      this.visualtizationType = visualtizationType;

      if (this.visualtizationType == undefined) {
        throw new Error("Undefined chart type");
      } else if(this.visualtizationType == 'Barchart')  {      
        this.chart = new BarChart();
        this.chart.drawGraph(xData, yData, chartData);
      } else if(this.visualtizationType == 'Piechart') {
        console.log("pie chart selected");
        this.chart = new PieChart();
        this.chart.drawGraph(xData, yData, chartData);
      }
    }

    getChart(): any {
      return this.chart;
    }
  
    public sethtmlContent(content: string) {
      this.htmlContent = content;
    }
  }