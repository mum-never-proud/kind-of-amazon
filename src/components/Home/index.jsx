import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Products from 'components/Products';

const Home = () => (
  <>
    <Row>
      <Col>
        <Products />
      </Col>
    </Row>
  </>
);

export default Home;
