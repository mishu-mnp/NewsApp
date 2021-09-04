import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  name = 'Vaibhav'
  render() {
    return (
      <div>
        Hello! This is Class based React App <strong>{this.name}</strong>
      </div>
    )
  }
}

