import { Component, ViewChild, Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menuList: any;
  dataListX: any;
  dataListY: any;
  dataItems: any;
  data: any;
  chartType: string;// = "Barchart";
  showVisualizationChart: boolean = true;
  droppedItems : Array<any> ;
  constructor(private http: Http) { 
    this.droppedItems = new Array<any>();
  }

  // ngOnInit() {
    
  // }

  @ViewChild('sidenav') sidenav : any;
  toggleNav(menu) {
    //console.log(menu);
    let m = new Menu(this.http);
    this.menuList = m.getMenuList(menu);
    this.sidenav.toggle();

    let d = new DataItems();
    this.dataListX = d.getXData();
    this.dataListY = d.getYData();

    console.log("data from http service");
    m.getMenuData()
        .then( result => {
          this.data = result;
          this.dataItems = Object.keys(this.data[0]);
        });
    
  };

  selectChartType(visualType: string) {
    //console.log(visualType);
    this.chartType = visualType;
  };

  changed(newValue) {
    console.log("value changed");
    
    console.log('newValue', newValue);
    //this.selectedId = newValue;
  }

  onItemDrop(e: any) {
    console.log(e);
    
    this.droppedItems.push(e.dragData);
    if(e.dragData.type == "Barchart") {
      this.chartType = e.dragData.type;
      this.showVisualizationChart = false;
    }

    if(e.dragData.type == "Piechart") {
      this.chartType = e.dragData.type;
      this.showVisualizationChart = false;
    }
}

}

@Injectable()
export class Menu {

  public dataList: string[];

constructor(private http: Http) {}

  getMenuData(): Promise<any> {
   let url = 'https://jsonplaceholder.typicode.com/todos';
   url = '../../assets/data/data.json'
   //url = '../../assets/data/data2.json'
   return this.http.get(url)
    .map(res => res.json())
    .toPromise()
    .then(
      (res: Response) => {
        // console.log(res);
        // console.log(Object.keys(res[0]));
        return res;
        //console.log("Data fetch successfull");
      }
      
    ).catch(this.handleError);
};

      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }

  // getMenuData(): string[] {
  
  //   this.getData().then(
  //     result => this.dataList = result
      
  //   )
  //   return this.dataList;
  // }
  
  
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

  getDataList(menuItem): string[] {
    return this.dataList;
  }
}

export class DataItems {
  constructor() { }

  dataX: any[] = ['Jan', 'Feb', 'March'];
  dataY: any[] = [1, 3,5];
  

  getXData(): any {
    return this.dataX;
  }

  getYData(): any {
    return this.dataY;
  }
}