import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



const App = () => {
  let pageSize = 9
  const apiKey = process.env.REACT_APP_NEWS_API
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/"><News apiKey={apiKey} key='general' pageSize={pageSize} country='in' category='general' badgeColor='danger' /></Route>
          <Route exact path="/entertainment"><News apiKey={apiKey} key='entertainment' pageSize={pageSize} country='in' category='entertainment' badgeColor='primary' /></Route>
          <Route exact path="/business"><News apiKey={apiKey} key='business' pageSize={pageSize} country='in' category='business' /></Route>
          <Route exact path="/sports"><News apiKey={apiKey} key='sports' pageSize={pageSize} country='in' category='sports' /></Route>
          <Route exact path="/science"><News apiKey={apiKey} key='science' pageSize={pageSize} country='in' category='science' badgeColor='success' /></Route>
          <Route exact path="/health"><News apiKey={apiKey} key='health' pageSize={pageSize} country='in' category='health' badgeColor='dark' /></Route>
          <Route exact path="/technology"><News apiKey={apiKey} key='technology' pageSize={pageSize} country='in' category='technology' /></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
