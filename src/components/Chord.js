import React, { useEffect, useState, useRef, Fragment } from 'react';
import * as d3 from 'd3';
import { Container, Row, Col } from 'react-bootstrap';
import M from 'materialize-css';
import * as datain from '../files/flows_chord.json';
import './Chord.css'


const Chord = () => {
  const [leftYear, setLeftYear] = useState('');
  const [leftCategory, setLeftCategory] = useState('');
  const [data, setData] = useState({});
  const svg1Ref = useRef();

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
    setData(datain.default);
    d3.select(svg1Ref.current).attr('height', 800);
  }, [])

  useEffect(() => {
    if (!leftYear || !leftCategory) {
      return;
    }
    const colors = data[leftYear][leftCategory]['colors']
    const matrix = data[leftYear][leftCategory]['matrix']
    const names = data[leftYear][leftCategory]['names']
    // console.log(data[leftYear][leftCategory])
    const res = d3.chord()
                  .padAngle(0.05)
                  .sortSubgroups(d3.descending)
                  (matrix)
    
    const groups = d3.select(svg1Ref.current)
      .datum(res)
      .append("g")
      .attr('transform', 'translate(300, 330)')
      .selectAll("g")
      .data(d => d.groups)
      .enter()
      .append("g")
        .on("mouseover", (d,i) => fade(d,i,0.1))
        .on("mouseout", (d,i) => fade(d,i,1))

    groups.append("path")
        .style("fill", (d,i) => colors[i])
        .style("stroke", (d,i) => colors[i])
        // .attr('stroke-width', )
        .attr("d", d3.arc()
          .innerRadius(210)
          .outerRadius(240)
        )

    groups.append('text')
          .each(d => d.angle = (d.startAngle + d.endAngle) / 2)
          .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
          .attr("transform", function (d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
              "translate(" + (250 + 0) + ")" +
              (d.angle > Math.PI ? "rotate(180)" : "");
          })
          .text((d, i) => names[i]);

    //links between arsc
    d3.select(svg1Ref.current)
      .datum(res)
      .append("g")
      .attr('transform', 'translate(300, 330)')
      .selectAll("path")
      .data(d => d)
      .enter()
      .append("path")
        .attr("d", d3.ribbon().radius(210))
        .style('fill', d => {
          console.log(d)
          if (d.source.value < 200) {
            return 'transparent';
          }
          return colors[d.source.index]
        })
        .style("stroke", d => {
          if (d.source.value < 200) {
            return 'transparent';
          }
          return colors[d.source.index]
        });

    
    return () => {
      d3.selectAll('g').remove()
    }
    
  }, [leftYear, leftCategory])

  const fade = (d, i, opacity) => {
    if (!d || !i) {
      return;
    }

    d3.selectAll('path').filter(d => {
      if (!d) {
        return;
      }
      if (!d.source || !d.target) {
        return;
      }
      return d.source.index !== i && d.target.index !== i
    }).transition().duration(300)
    .style('opacity', opacity)
      
    

    
  }

  const handleSelecLefttYear = e => {
    setLeftYear(e.target.value)
  }


  const handleSelectLeftCat = e => {
    setLeftCategory(e.target.value)
  }


  const renderOptions = () => {
    return (
      <Fragment>
        <option value="" disabled selected>Choose your option</option>
        <option value="1">Animals & fish (live)</option>
        <option value="2">Cereal grains and seed</option>
        <option value="3">Agricultural products (excl. feed, grains, and forage)</option>
        <option value="4">Animal feed, eggs, honey, other products of animal origin</option>
        <option value="5">Meat, poultry, fish, seafood, and preparations</option>
        <option value="6">Milled grain products and preparations and bakery products</option>
        <option value="7">Other prepared foodstuffs and preparations</option>
      </Fragment>
    )
  }

  const renderyears = () => {
    return (
      <Fragment>
        <option value="" disabled selected>Choose your option</option>
        <option value="2012">2012</option>
        <option value="2017">2017</option>
      </Fragment>
    )
  }

  return (
    <div className="container">
      <div className="row" style={{marginTop: '3%'}}>
          <div className="input-field col l6">
            <select id="year1" onChange={handleSelecLefttYear}>
            {renderyears()}
            </select> 
          <label htmlFor="">Please select year</label>
          </div>
          <div className="input-field col l6">
            <select id="sector1" onChange={handleSelectLeftCat}>
            {renderOptions()}
            </select>
            <label htmlFor="">Please select category</label>
          </div>
      </div>
          <div className="row" id="chord1">
            <div className="col l12 m12 s12 center">
              <svg id='first' ref={svg1Ref} style={{width: '100%', marginLeft: '20%'}}>
                
              </svg>
            </div>
          </div>
    </div>
  )
};

export default Chord;