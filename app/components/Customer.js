import React, { Component } from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Registration from './Customer/Registration';
import Login from './Customer/Login';

class Customer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="registration">
        <Container>
          <Row>
            <Col md="6"><Registration setCredentials={this.props.setCredentials} /></Col>
            <Col md="6"><Login setCredentials={this.props.setCredentials} /></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Customer;
