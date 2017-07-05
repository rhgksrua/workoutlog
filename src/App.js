import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Exercise from './components/exercise/Exercise';
import Date from './components/date/Date';
import AddExerciseButton from './components/exercise/AddExerciseButton';
import Navigation from './components/nav/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Header />
        <p>Sign up to start!</p>
        <button>Sign Up</button>
      </div>
    );
  }
}

export default App;
