import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Container from 'react-bootstrap/Container';

const DefaultLayout = ({ component: Component }) => (
  <Route>
    <Header />
    <Container fluid>
      <Component />
    </Container>
    <Footer />
  </Route>
);

DefaultLayout.propTypes = {
  component: PropTypes.func.isRequired,
};

export default DefaultLayout;
