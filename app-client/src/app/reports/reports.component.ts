import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: '[app-reports]',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  hideVisualizationChart: boolean = false;
  chartType: string;
  myAttr: boolean = false;
  activeSiveNav: string;
  constructor() {
    this.chartType = "Barchart";
   }

   @ViewChild('sidenav') sidenav : any;
   toggleNav(sidenav) {
     if(this.activeSiveNav == sidenav) {
      this.sidenav.close(); 
      this.activeSiveNav = "";
     }
     else {
      this.activeSiveNav = sidenav;
      this.sidenav.close();
      this.sidenav.toggle();
     }
    console.log("hi");
    
   };

   setVisualization(chartType: string): void {
    this.chartType = chartType;
    this.hideVisualizationChart = true;
   }

  ngOnInit() {
  }

}
