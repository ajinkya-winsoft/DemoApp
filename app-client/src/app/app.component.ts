import { Component } from '@angular/core';
import { interact } from 'interact.js/interact';
// import {VisualizationDirective} from './directive/visualization.directive';
import * as d3 from "d3";
export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Sample Application';

    ngAfterViewInit() {
      this.drawGraph();
    }

    drawGraph():void {
        var svg = d3.select("svg");
        console.log(svg);

         var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;

      var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          y = d3.scaleLinear().rangeRound([height, 0]);

      var g = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.tsv("../assets/data/data.tsv", function(d) {
        d.frequency = +d.frequency;
        return d;
      }, function(error, data) {
        if (error) throw error;

        x.domain(data.map(function(d) { return d.letter; }));
        y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

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

        g.selectAll(".bar")
          .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.letter); })
            .attr("y", function(d) { return y(d.frequency); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.frequency); });
      });
    }

    loadFunc(): void {
        console.log("hello")
    };
}
var  a:AppComponent = new AppComponent();


interact('.draggable').draggable({
    // enable inertial throwing
    inertia: false,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent = 'moved a distance of ' + a.title + (Math.sqrt(event.dx * event.dx +  event.dy * event.dy)|0) + 'px');
    }


  })
  .resizable({
   preserveAspectRatio: true,
   edges: { left: true, right: true, bottom: true, top: true }
 })
 .on('resizemove', function (event) {
   var target = event.target,
       x = (parseFloat(target.getAttribute('data-x')) || 0),
       y = (parseFloat(target.getAttribute('data-y')) || 0);

   // update the element's style
   target.style.width  = event.rect.width + 'px';
   target.style.height = event.rect.height + 'px';

   // translate when resizing from top or left edges
   x += event.deltaRect.left;
   y += event.deltaRect.top;

   target.style.webkitTransform = target.style.transform =
       'translate(' + x + 'px,' + y + 'px)';

   target.setAttribute('data-x', x);
   target.setAttribute('data-y', y);
   target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
 });


  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  //window.dragMoveListener = dragMoveListener;
