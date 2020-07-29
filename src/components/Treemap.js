import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import d3Tip from "d3-tip";
import * as datain from '../files/trade.csv';
import dataProcess from '../dataprocess';
import './Treemap.css'

const stateArr = [ 'AL', 'AK', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO','MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY','OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];


const Treemap = () => {
  const [data, setData] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [arrState, setArrState] = useState([]);
  const svgRef = useRef();
  const graphRef = useRef();
  let nodes = undefined
  const tip = d3Tip()
                .attr('class', 'tipcard')
                .html(d => {
                  let content = `<div class="year">Year: ${d.data.year}</div>`;
                  content += `<div class="product">Product: ${d.data.sctg2_description}</div>`
                  if (!d.data.value) {
                    return content;
                  } else {
                    content += `<div class="balance">Trade Balance: ${d.data.value.toFixed(2)}</div>`;
                  }
                  return content;
                });
  useEffect(() => {
    d3.csv(datain).then(res => {
      setData(res);
    });
    const svg = d3.select(svgRef.current).attr('width', 1060).attr('height', 800);
    const graph = d3.select(graphRef.current).attr('transform', 'translate(50, 50)');
  }, [])

  useEffect(() => {
    if (arrState.length !== 0) {
      console.log(arrState);
      const graph = d3.select(graphRef.current)
      graph.call(tip)
      const stratify = d3.stratify().id(d => d.sctg2).parentId(d => d.year);
      const rootNode = stratify(arrState).sum(d => Math.abs(d.value));
      const treemap = d3.treemap().size([960, 700]).padding(2);
      const treeData = treemap(rootNode).descendants();
      const nodes = graph.selectAll('g')
                  .data(treeData)
                  // .enter()
                  .join('g')
                  .attr('transform', d => `translate(${d.x0}, ${d.y0})`);
      // nodes.remove.exit()
      nodes.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .style('stroke-width', 2.5)
            .style('stroke', 'white')
            .attr('fill', d => d.data.value < 0 ? 'red' : 'green');
      nodes.filter(d => !d.children)
            .append('text')
              .attr('text-anchor', 'middle')
              .attr('dy','1rem')
              .attr('fill', 'white')
              .text(d => d.data.sctg2_description)
              .attr('x', d => (d.x1 - d.x0)/2)
              .attr('y', d => (d.y1 - d.y0)/2)
              }
      d3.selectAll('rect')
           .on('mouseover', (d, i, n) => {
            tip.show(d, n[i])
           })
           .on('mouseout', (d, i, n ) => {
             tip.hide()
           })
      return () => {
        d3.selectAll('rect').remove();
        d3.selectAll('text').remove();
      }
      
  }, [arrState])

  useEffect(() => {
    if (selectedState) {
      const arr = dataProcess(selectedState, data)
      setArrState([{ year: '', sctg2: 'year' }, { year: 'year', sctg2: '2012' }, { year: 'year', sctg2: '2017'}, ...arr])
    }
  }, [selectedState])

  const handleselect = (e) => {
    // e.preventDefault();

    setSelectedState(e.target.value)
  }

  const renderSelect = (arr) => {
    return arr.map(element => {
        return <option value={element} key={element}>{element}</option>
      }
    )
  }

  return (
    <div>
      <div className="intro">
        <select name="state" id="state" onChange={handleselect}>
          <option value="">--Please select one state--</option>
          {renderSelect(stateArr)}
        </select>
        <p>Notes: Red means trade deficit, Green means trade surplus</p>
      </div>
      <div className="canvas">
        <svg ref={svgRef}>
          <g ref={graphRef}></g>
        </svg>
      </div>
    </div>
  );
}

export default Treemap;