import React, { Component, createRef } from 'react';
import Datamap from 'datamaps';
import * as d3 from 'd3';
import { geoPath } from 'd3';
import * as data from '../files/gdp.json';


class Gdpmap extends Component {
  currentRef = createRef();

  state = {  }
  componentDidMount() {
    let map = new Datamap({
      element: document.getElementById('container'),
      scope: 'usa',
      fills: {
          HIGH: '#afafaf',
          LOW: '#123456',
          MEDIUM: 'blue',
          UNKNOWN: 'rgb(0,0,0)',
          defaultFill: 'rgba(25,25,25,0.5)'
      },
      data: data.gdp,
  });
// Draw a legend for this map
  map.labels()


  // var colorbar = d3.colorbarV(colorScale)
  //             .scale(scale3)
  //             .orient("horizontal")
  //             .title("GDP")
  //             .barlength(1000)
  //             .thickness(20);
  // var colorbarObject = d3.select('#mycolorbar').call()
  // d3.select('#colorbar').append('rect')
  }


  render() {
    return (
      <div style={{marginTop: '2%', }}>
        <div id="container" style={{'height': 750}}>
        </div>
      </div>
    );
  }
}

export default Gdpmap;