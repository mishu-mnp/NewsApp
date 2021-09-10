import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={6} country='in' apiKey='e1841b7b047944d1b5462e3cb101e664' category='science' />
      </div>
    )
  }
}

