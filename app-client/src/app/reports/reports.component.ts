import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-reports]',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  showVisualizationChart: boolean = false;
  chartType: string;
  constructor() {
    this.chartType = "Barchart";
   }

  ngOnInit() {
  }

}
