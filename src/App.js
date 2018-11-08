import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Route } from 'react-router'


import Home from './components/home/Home'
import HomePlayer from './components/homePlayer/HomePlayer'
import './App.css';


class App extends Component {

  HomePlayer1 = (props) => {
    return (
      <HomePlayer
        player="Jogador 1"
        code="1"
        {...props}
      />
    );
  }

  HomePlayer2 = (props) => {
    return (
      <HomePlayer
        player="Jogador 2"
        code="2"
        {...props}
      />
    );
  }
  

  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/" exact component={Home} /> 
            <Route path="/player1" component={this.HomePlayer1}/>
            <Route path="/player2" component={this.HomePlayer2}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
