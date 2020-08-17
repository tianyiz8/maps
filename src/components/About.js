import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'
import Chord from './img/city.jpg';
import Flow from './img/stars.jpg';
import GDP from './img/gdp.jpg';
import Tree from './img/tree.jpg';

const arr = [
  {src: Chord, link: '/chord', text: 'Chord Map'},
  {src: Flow, link: '/flow', text: 'Flow Map'},
  {src: GDP, link: '/gdpmap',text: 'GDP Map'},
  {src: Tree, link: '/treemap',text: 'Tree Map'}
]
const About = () => {
  const renderMaps = () => {
    return arr.map(diagram => {
      return (
          <div className="card" style={{marginTop:'3%'}}>
            <div className="card-image photo">
              <img src={diagram.src} alt=""/>
              <div className="overlay center-align">
                <Link to={`${diagram.link}`}>{diagram.text}</Link>
              </div>
            </div>
          </div>
      )
    })
  }
  return (
    <div className="whole">
      <div className="container">
        <div className="cards" style={{display: 'flex', justifyContent: 'space-evenly'}}>
          {renderMaps()}
        </div>
      </div>
    </div>
  );
}

export default About;