import React, { useEffect, useState, useRef, Fragment } from 'react';
import * as d3 from 'd3';
import d3Tip from "d3-tip";
import { Container, Row, Col } from 'react-bootstrap';
import * as datain from '../files/flows_chord.json';
import './Chord.css'


const Chord = () => {
  const [leftYear, setLeftYear] = useState('');
  const [rightYear, setRightYear] = useState('');
  const [leftCategory, setLeftCategory] = useState('');
  const [rightCategory, setRightCategory] = useState('');
  const [data, setData] = useState({});
  const svg1Ref = useRef();
  const svg2Ref = useRef();
  const group1Ref = useRef();
  const group2Ref = useRef();

  useEffect(() => {
    setData(datain.default);
    const svg1 = d3.select(svg1Ref.current).attr('width', 580).attr('height', 800);
    const svg2 = d3.select(svg2Ref.current).attr('width', 580).attr('height', 800);
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
    
    console.log(res)
    d3.select(svg1Ref.current)
      .datum(res)
      .append("g")
      .attr('transform', 'translate(240, 330)')
      .selectAll("g")
      .data(d => d.groups)
      .enter()
      .append("g")
      .on("mouseover", (d,i) => fade(d,i,0.1))
      .on("mouseout", (d,i) => fade(d,i,1))
      .append("path")
        .style("fill", (d,i) => colors[i])
        .style("stroke", (d,i) => colors[i])
        // .attr('stroke-width', )
        .attr("d", d3.arc()
          .innerRadius(210)
          .outerRadius(240)
        )
      
    d3.select(svg1Ref.current)
      .datum(res)
      .append("g")
      .attr('transform', 'translate(240, 330)')
      .selectAll("path")
      .data(d => d)
      .enter()
      .append("path")
        .attr("d", d3.ribbon().radius(210))
        .style('fill', d => colors[d.source.index])
        .style("stroke", d => colors[d.source.index]);

    
    return () => {
      d3.selectAll('g').remove()
    }
    
  }, [leftYear, leftCategory])

  const fade = (d, i, opacity) => {
    if (!d || !i) {
      return;
    }
    console.log(d, i)
    d3.selectAll('path').filter(d => {
      console.log(d)
      if (!d.source || !d.target) {
        return;
      }
      return d.source.index !== i && d.target.index !== i
    })
      .transition().duration(500)
      .style("stroke-opacity", opacity)
      .style("fill-opacity", opacity);
  }

  const handleSelecLefttYear = e => {
    setLeftYear(e.target.value)
  }

  const handleSelectRightYear = e => {
    setRightYear(e.target.value)
  }

  const handleSelectLeftCat = e => {
    setLeftCategory(e.target.value)
  }

  const handleSelectRightCat = e => {
    setRightCategory(e.target.value)
  }

  const renderOptions = () => {
    return (
      <Fragment>
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
        <option value="">--Please select year--</option>
        <option value="2012">2012</option>
        <option value="2017">2017</option>
      </Fragment>
    )
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <select id="year1" onChange={handleSelecLefttYear}>
              {renderyears()}
            </select> 
            <select id="sector1" onChange={handleSelectLeftCat}>
              <option value="">--Please select one category--</option>
              {renderOptions()}
            </select> 
          </Col>
          <Col>
            <select id="year1" onChange={handleSelectRightYear}>
              {renderyears()}
            </select> 

            <select id="sector1" onChange={handleSelectRightCat}>
              <option value="">--Please select one category--</option>
              {renderOptions()}
            </select> 
          </Col>
      </Row>
      <Row>
        <Col>
          <div className="chords" id="chord1">
            <svg id='first' ref={svg1Ref} >
              
            </svg>
          </div>
        </Col>
        <Col>
          <div className="chords" id="chord2">
            <svg id="second" ref={svg2Ref} >
              
            </svg>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
  )
};

export default Chord;