import React, { Component } from 'react';
import Customer from './Customer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('credential') || null,
      authorized: !!localStorage.getItem('credential') || false
    };
  }
  setCredentials = (credential) => {
    this.setState(() => {
      if (localStorage) {
        localStorage.setItem('credential', credential);
      }
      return { token: credential, authorized: true };
    });
  }
  render() {
    return (
      <div className="app-container">
        {this.state.authorized ? (
          123
        ) : (
          <Customer setCredentials={this.setCredentials} />
        )}
      </div>
    );
  }
}

export default App;
