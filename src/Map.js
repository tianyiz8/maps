import React, { Component } from 'react';
import { scaleDiverging } from 'd3';
import Datamap from 'datamaps'
import fetchData from './csv'

export default class Maps extends Component {
  componentDidMount() {
    fetchData()
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
      data: {
          IL: {
              fillKey: 'LOW',
              numberOfThings: 2002
          },
      }
  });
// Draw a legend for this map
  map.legend(); 
  map.labels()
  
  }

  render() {
    return(
      <div>
        <div id="container" style={{width: 1000, height: 500}}></div>
      </div>
    )
  }
}