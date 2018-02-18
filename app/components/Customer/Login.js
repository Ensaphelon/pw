import React, { Component } from 'react';
import serialize from 'form-serialize';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import api from '../../api';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  handleLogInForm = (event) => {
    event.preventDefault();
    const self = this;
    const form = event.target;
    const data = serialize(form, { hash: true });
    api.logIn(data)
      .then((response) => {
        if (response) {
          self.props.setCredentials(response.data.id_token);
        }
      });
  };
  render() {
    return (
      <div className="login">
        <Form onSubmit={(event) => { this.handleLogInForm(event); }}>
          <legend>Do you have an account?</legend>
          <Input name="email" label="Enter Email" floatingLabel required />
          <Input name="password" label="Enter password" type="password" floatingLabel required />
          <Button color="primary" variant="raised">Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
