import React, { Component } from 'react';
import serialize from 'form-serialize';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import api from '../api';

class TransactionForm extends Component {
  constructor(props) {
    super(props);
  }
  handleTransactionForm = (event, component) => {
    event.preventDefault();
    const confirmTransaction = confirm('Are you sure?');
    const { token } = this.props;
    if (token && confirmTransaction) {
      const form = event.target;
      const data = serialize(form, { hash: true });
      api.createTransaction(data.recipientName, data.amount, token)
        .then((response) => {
          if (response && response.status === 200) {
            component.props.updateUserInfo(token);
            alert(`You have transferred ${data.amount} to ${data.recipientName}`);
          }
        });
    }
  }
  showUsers = (event) => {
    const { value } = event.target;
    if (value) {
      setTimeout(() => {
        api.getUsers(value).then((response) => {
          console.log(response);
        });
      }, 300);
    }
  }
  render () {
    return (
      <div className="registration">
        <Form className={this.props.suggestionsActiveStatus ? '' : 'no-suggestions'} onSubmit={(event) => { this.handleTransactionForm(event, this); }}>
          <legend>Make a transaction</legend>
          <Input onChange={(event) => { this.props.updateTransactionForm(event); }} value={this.props.fieldsState.recipientName} name="recipientName" type="text" label="Recipient name" floatingLabel required />
          <ul className="suggestions-list">
            {this.props.suggestions.map((suggestion) => {
              return (
                <li key={suggestion.id} onClick={(event) => { this.props.updateTransactionForm(event); }} className="suggestion">{suggestion.name}</li>
              );
            })}
          </ul>
          <Input onChange={(event) => { this.props.updateTransactionForm(event); }} name="amount" value={this.props.fieldsState.amount} label="Transfer amount" min="1" type="number" floatingLabel required />
          <Button color="primary" variant="raised">Transfer money</Button>
        </Form>
      </div>
    );
  }
}

export default TransactionForm;
