import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuList: any;
  chartType: string = "Barchart";
  constructor() { 
  }

  ngOnInit() {
    
  }

  @ViewChild('sidenav') sidenav : any;
  toggleNav(menu) {
    console.log(menu);
    let m = new Menu();
    this.menuList = m.getMenuList(menu);
    this.sidenav.toggle();
  };

  selectChartType(chartType: string) {
    console.log(chartType);
    chartType = this.chartType;
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
    console.log("menu item being delivered");
    console.log(this.menuList[menuItem]);
    
    return this.menuList[menuItem];
  }
}


