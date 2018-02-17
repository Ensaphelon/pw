import React from 'react';
import serialize from 'form-serialize';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import api from '../../api';

const Registration = () => {
  return {
    handleRegisterForm: (event) => {
      event.preventDefault();
      const form = event.target;
      const data = serialize(form, { hash: true });
      api.createAccount(data)
        .then((response) => {
          if (response) {
            alert('You have successfully created an account and are logged in to the system');
          }
        });
    },
    render () {
      return (
        <div className="registration">
          <Form onSubmit={this.handleRegisterForm}>
            <legend>Register your account!</legend>
            <Input name="name" label="Enter name" floatingLabel required />
            <Input name="email" label="Enter Email" type="email" floatingLabel required />
            <Input name="password" label="Enter password" type="password" pattern=".{5,}" title="5 characters minimum" floatingLabel required />
            <Button color="primary" variant="raised">Create account</Button>
          </Form>
        </div>
      );
    },
  };
};

export default Registration;
