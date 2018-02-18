import React, { Component } from 'react';
import Appbar from 'muicss/lib/react/appbar';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Customer from './Customer';
import TransactionForm from './TransactionForm';
import TransactionsList from './TransactionsList';
import api from '../api';

const emptyUser = {
  balance: 0,
  email: null,
  id: null,
  name: '',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('credential') || null,
      authorized: !!localStorage.getItem('credential') || false,
      user: emptyUser,
      transactions: [],
      suggestionsActiveStatus: false,
      suggestions: [],
      transactionFormFields: {
        recipientName: '',
        amount: 1,
      },
    };
  }
  componentDidMount = () => {
    const credential = localStorage.getItem('credential') || null;
    if (credential) {
      this.updateUserInfo(credential);
    }
  }
  setCredentials = (credential) => {
    localStorage.setItem('credential', credential);
    this.setState({ token: credential, authorized: true });
    this.updateUserInfo(credential);
  }
  logOut = () => {
    this.setState({
      user: emptyUser,
      token: null,
      authorized: false,
      transactions: [],
    });
  }
  updateTransactionForm = (event) => {
    const self = this;
    let { name, value } = event.target;
    let targetIsuggestion = false;
    if (event.target.className === 'suggestion') {
      targetIsuggestion = true;
      name = 'recipientName';
      value = event.target.innerHTML;
      self.setState({
        suggestionsActiveStatus: false,
      });
    }
    switch (name) {
      case 'recipientName':
        if (value) {
          api.getUsers(value, this.state.token).then((response) => {
            self.setState({
              suggestionsActiveStatus: !targetIsuggestion,
              suggestions: response.data,
            });
          });
        } else {
          self.setState({
            suggestionsActiveStatus: false,
            suggestions: [],
          });
        }
        this.setState({
          transactionFormFields: {
            recipientName: value,
            amount: self.state.transactionFormFields.amount,
          },
        });
        break;
      case 'amount':
        this.setState({
          transactionFormFields: {
            amount: value,
            recipientName: self.state.transactionFormFields.recipientName,
          },
        });
        break;
      default:
        break;
    }
  }
  updateUserInfo = (credential) => {
    const self = this;
    api.getCurrentUserInfo(credential).then((response) => {
      api.getTransactions(credential).then((trResponse) => {
        self.setState({
          transactions: trResponse.data.trans_token,
          user: response.data.user_info_token,
        });
      });
    }).catch(() => {
      self.logOut();
    });
  }
  repeatTransaction = (transaction) => {
    this.setState({
      transactionFormFields: {
        recipientName: transaction.username,
        amount: -transaction.amount,
      },
    });
    window.scrollTo(0, 0);
    alert(`Copy of transaction with id: ${transaction.id} created, now the page will be scrolled to the prefilled transaction form`);
  }
  render() {
    return (
      <div className="app-container">
        {this.state.authorized ? (
          <div>
            <Appbar>
              <div className="user">
                <div className="user-name">
                  Welcome, {this.state.user.name} <a className="user-name-logout" href="#!" onClick={this.logOut}>(Log out)</a>
                </div>
                <div className="user-balance">Balance: {this.state.user.balance}</div>
              </div>
            </Appbar>
            <Container>
              <Row>
                <Col md="12"><TransactionForm
                  fieldsState={this.state.transactionFormFields}
                  token={this.state.token}
                  updateUserInfo={this.updateUserInfo}
                  updateTransactionForm={this.updateTransactionForm}
                  suggestions={this.state.suggestions}
                  suggestionsActiveStatus={this.state.suggestionsActiveStatus}
                />
                </Col>
              </Row>
              <Row>
                <TransactionsList
                  repeatTransaction={this.repeatTransaction}
                  transactions={this.state.transactions}
                />
              </Row>
            </Container>
          </div>
        ) : (
          <Customer setCredentials={this.setCredentials} />
        )}
      </div>
    );
  }
}

export default App;
