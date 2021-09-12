import './App.css';
// import LoadingBar from 'react-top-loading-bar';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



export default class App extends Component {
  pageSize = 9
  apiKey = process.env.REACT_APP_NEWS_API
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/"><News apiKey={this.apiKey} key='general' pageSize={this.pageSize} country='in' category='general' badgeColor='danger' /></Route>
            <Route exact path="/entertainment"><News apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country='in' category='entertainment' badgeColor='primary' /></Route>
            <Route exact path="/business"><News apiKey={this.apiKey} key='business' pageSize={this.pageSize} country='in' category='business' /></Route>
            <Route exact path="/sports"><News apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country='in' category='sports' /></Route>
            <Route exact path="/science"><News apiKey={this.apiKey} key='science' pageSize={this.pageSize} country='in' category='science' badgeColor='success' /></Route>
            <Route exact path="/health"><News apiKey={this.apiKey} key='health' pageSize={this.pageSize} country='in' category='health' badgeColor='dark' /></Route>
            <Route exact path="/technology"><News apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country='in' category='technology' /></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

