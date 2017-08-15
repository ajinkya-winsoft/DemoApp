import { Component, ViewChild, Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';

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
  chartType: string = "Barchart";
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
    
    let res:any;
    m.getMenuData()
    .subscribe(
        comments => this.comments = comments, //Bind to view
         err => {
             // Log errors if any
             console.log(err);
         });
    })
    

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
}

}

@Injectable()
export class Menu {

constructor(private http: Http) {}

  getMenuData(): Promise<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos')
    .toPromise()
    .then(response => response.json().data)
    .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
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