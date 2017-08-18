import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule, MdSidenavModule, MdIconModule, MdInputModule, MdCardModule, MdTooltipModule} from '@angular/material';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import * as d3 from "d3";
import { interact } from 'interact.js/interact';
import { AppComponent }  from './app.component'
import { HomeComponent } from './home/home.component';
import { VisualizationDirective } from './directive/visualization.directive';
import { HttpModule }    from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Chart} from './visualization/charts/Chart';
import {BarChart} from './visualization/charts/Barchart'
import {PieChart} from './visualization/charts/Piechart'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VisualizationDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    HttpModule,
    MdTooltipModule,
    FlexLayoutModule,
    Ng2DragDropModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
