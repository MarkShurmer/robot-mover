import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainBoard from './components/main-board/main-board-container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Robot</h1>
        </header>
        <MainBoard />
      </div>
    );
  }
}

export default App;
