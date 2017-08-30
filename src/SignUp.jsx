import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <div className="section">
        <p>
          <span>Sign up using github</span>
          <a href="http://localhost:3000/auth/github">GitHub</a>
        </p>
      </div>
    );
  }
}

export default SignUp;
