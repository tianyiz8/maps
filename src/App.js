import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Chord from './components/Chord';
import Flow from './components/Flow';
import Gdpmap from './components/Gdpmap';
import Treemap from './components/Treemap';
import About from './components/About'
import Nav from './subcomponents/Nav';
import Footer from './subcomponents/Footer';

class App extends Component {
  state = {  }
  render() {
    return (
      <Fragment>
        <Router>
        <Nav></Nav>     
          <Switch>
            <Route exact component={ Chord } path='/chord' />
            <Route exact component={ Flow } path='/flow' />
            <Route exact component={ Gdpmap } path='/gdpmap' />
            <Route exact component={ Treemap } path='/treemap' />
            <Route exact component={ About } path='/' />
          </Switch>
          <Footer></Footer>
        </Router>
      </Fragment>
    );
  }
}

export default App;