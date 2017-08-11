import { Directive, ElementRef, EventEmitter } from '@angular/core';

@Directive({
  selector: 'appVisualization',
})
export class VisualizationDirective {
  loadFunc = new EventEmitter();
  constructor() {
      console.log("directive loaded");
      setInterval(() => this.loadFunc.emit("event"), 1000);
  }

  getProperty():void {
      console.log("directive function called")
  }

}
