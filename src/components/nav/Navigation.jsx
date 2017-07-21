import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Home from '../../Home';
import UserPage from '../user/UserPage';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  componentDidMount() {
  }
  logOut() {
    this.props.logOut();
  }
  render() {
    let account = null;
    let logOut = null;
    let addWorkout = null;
    
    if (this.props.username) {
      account = <Link to={`/${this.props.username}`}>{this.props.username}</Link>;
      logOut = <button onClick={this.props.logOut}>Sign Out</button>;
      addWorkout = <Link to={`/${this.props.username}/add`}>ADD WORKOUT</Link>;
    } else {
      account = <a href="http://localhost:3000/auth/github">Sign In</a>;
    }


    return (
      <nav className="menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>{addWorkout}</li>
          <li>{account}</li>
          <li>{logOut}</li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;
