import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    this.props.logOut();
  }
  render() {
    let account = null;
    let logOut = null;
    let addWorkout = null;
    
    // show user if logged in.
    if (this.props.username) {
      account = <Link className={"navbar-item"} to={`/${this.props.username}`}>{this.props.username}</Link>;
      logOut = <div className={"navbar-item"} onClick={this.props.logOut}>Sign Out</div>;
      addWorkout = <Link className={"navbar-item"} to={`/${this.props.username}/add`}>ADD WORKOUT</Link>;
    } else {
      account = <a className={"navbar-item"} href="http://localhost:3000/auth/github">Sign In</a>;
    }


    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className={"navbar-item"} to="/">Home</Link>
          {addWorkout}
          {account}
          {logOut}
        </div>
      </nav>
    );
  }
}

export default Navigation;
