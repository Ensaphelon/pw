import React, { Component } from 'react';
import Panel from 'muicss/lib/react/panel';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';

class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: 'Date',
      sortType: 'asc',
      sortedTransactions: [],
    };
  }
  componentWillReceiveProps = () => {
    this.sortTransactions(this.props.transactions);
  }
  sortTransactions = (transactions) => {
    this.setState({
      sortedTransactions: transactions,
    });
  }
  render() {
    return (
      <div className="transactions">
        <Container>
          <Row>
            <Col md="6"><div className="mui--text-title">Transactions history</div></Col>
            <Col md="6">
              <Container>
                <Row>
                  <Col md="6">
                    <Select name="input" label="Sort by" defaultValue="Date" onChange={(event) => { this.sortTransactions(event, this); }}>
                      <Option value="date" label="Date" />
                      <Option value="username" label="Correspondent name" />
                      <Option value="amount" label="Amount" />
                    </Select>
                  </Col>
                  <Col md="6">
                    <Select
                      name="input"
                      label="Sorting type"
                      defaultValue="asc"
                      onChange={(event) => { this.sortTransactions(event, this); }}
                    >
                      <Option value="asc" label="asc" />
                      <Option value="desc" label="desc" />
                    </Select>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md="12">
              <ul className="transactions-list">
                {this.props.transactions.map((transaction) => {
                  const transactionType = transaction.amount < 0 ? 'Debit' : 'Credit';
                  const amount = transaction.amount < 0 ? -transaction.amount : transaction.amount;
                  return (
                    <li className="transactions-list__item" key={transaction.id}>
                      <Panel className="transaction">
                        <ul className="transaction-properties-list">
                          <li className="transaction-property">
                            <span className="transaction-property-title">Date: </span>
                            <span className="transaction-property-value">{transaction.date}</span>
                          </li>
                          <li className="transaction-property">
                            <span className="transaction-property-title">Recipient name: </span>
                            <span className="transaction-property-value">{transaction.username}</span>
                          </li>
                          <li className="transaction-property">
                            <span className="transaction-property-title">{`${transactionType} amount:`} </span>
                            <span className="transaction-property-value">{amount}</span>
                          </li>
                          <li className="transaction-property">
                            <span className="transaction-property-title">Balance: </span>
                            <span className="transaction-property-value">{transaction.balance}</span>
                          </li>
                        </ul>
                        <div className="transaction__repeat">
                          {transaction.amount < 0 ? <a onClick={() => { this.props.repeatTransaction(transaction); }} className="transaction__repeat-link" href="#!">Repeat</a> : ''}
                        </div>
                      </Panel>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default TransactionsList;
