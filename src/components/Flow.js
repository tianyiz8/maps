import React, { Component, createRef } from 'react';
import Datamap from 'datamaps';
import * as d3 from 'd3';

import * as data from '../files/gdp.json';


class Flow extends Component {
  currentRef = createRef();

  state = {  }
  componentDidMount() {
    let map = new Datamap({
      element: document.getElementById('container'),
      scope: 'usa',
  });
// Draw a legend for this map
  map.labels()
  // var colorScale = d3.scaleQuantile()
  //           .range(data['colors'])
  //           .domain(data['edges']);

  // var colorbar = d3.colorbarV(colorScale)
  //             .scale(scale3)
  //             .orient("horizontal")
  //             .title("GDP")
  //             .barlength(1000)
  //             .thickness(20);
  // var colorbarObject = d3.select('#mycolorbar').call()
  d3.select('#colorbar').append('rect')
  }


  render() {
    return (
      <div>
        <div id="container" style={{'height': 600}}></div>
        <div  id="colorbar" ref={this.currentRef}>
          <span class="mycolorbar" > GDP </span>
        </div>
      </div>
    );
  }
}

export default Flow;