import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'contexts/User';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import { authenticateUser } from 'actions/user';

const Signin = ({ from }) => {
  const [{ isLoading, errorMessage }, dispatch] = useContext(UserContext);
  const history = useHistory();
  const formRefs = {
    email: useRef(),
    password: useRef(),
  };
  const [showToast, setShowToast] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(null);
  const [isInvalidPassword, setIsInvalidPassword] = useState(null);
  const signInUser = (ev) => {
    ev.preventDefault();

    setIsInvalidEmail(!email);
    setIsInvalidPassword(!password);

    if (email && password) {
      authenticateUser(dispatch)({ email, password });
    } else {
      formRefs[email ? 'password' : 'email'].current.focus();
    }
  };

  useEffect(() => formRefs.email.current.focus(), []);

  return (
    <Row className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      {
        errorMessage && (
          <Alert variant="danger" className="w-350">
            <Alert.Heading>There was a problem</Alert.Heading>
            {errorMessage}
          </Alert>
        )
      }
      <div className="w-350">
        <Form className="amz-form" onSubmit={signInUser}>
          <Form.Group>
            <h4>Sign-in</h4>
          </Form.Group>
          <Form.Group>
            <Form.Label className="amz-text-xs font-weight-bold">Email (phone for mobile accounts)</Form.Label>
            <Form.Control
              type="text"
              className="amz-text-xs amz-input-text"
              isInvalid={isInvalidEmail}
              ref={formRefs.email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            {
              isInvalidEmail && (
                <Form.Control.Feedback type="invalid">
                  Enter your email address
                </Form.Control.Feedback>
              )
            }
          </Form.Group>
          <Form.Group>
            <Form.Label className="amz-text-xs font-weight-bold">Password</Form.Label>
            <Form.Control
              type="password"
              className="amz-text-xs amz-input-text"
              isInvalid={isInvalidPassword}
              ref={formRefs.password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {
              isInvalidPassword && (
                <Form.Control.Feedback type="invalid">
                  Enter your password
                </Form.Control.Feedback>
              )
            }
          </Form.Group>
          <Form.Group>
            <Button
              block
              type="submit"
              variant="light"
              className="amz-text-xs amz-button-primary"
              disabled={isLoading}
            >
              {
                isLoading && (
                  <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true" />
                )
              }
              Continue
            </Button>
          </Form.Group>
          <Form.Group>
            <Form.Text>
              By continuing, you agree to Amazon&apos;s
              {' '}
              <a href="https://generator.lorem-ipsum.info/terms-and-conditions" target="_blank" rel="noreferrer">Conditions of Use</a>
              {' '}
              and
              {' '}
              <a href="https://www.dummies.com/privacy-policy/" target="_blank" rel="noreferrer">Privacy Notice</a>
              .
            </Form.Text>
          </Form.Group>
        </Form>
        <div className="mt-3 text-center text-muted new-user amz-text-xs">
          <p>New to Amazon?</p>
          <Button
            block
            variant="light"
            className="amz-text-xs amz-button-secondary"
            onClick={() => history.push({
              pathname: '/sign-up',
              state: { from },
            })}
          >
            Create your Amazon account
          </Button>
        </div>
      </div>
      <Toast
        className="toast toast-top-right"
        show={showToast}
        autohide
        animation
        delay={5000}
        onClose={() => setShowToast(false)}
      >
        <Toast.Header closeButton={false}>Amazon</Toast.Header>
        <Toast.Body>
          Currently login using Phone is not supported.
        </Toast.Body>
      </Toast>
    </Row>
  );
};

Signin.defaultProps = {
  from: '/',
};
Signin.propTypes = {
  from: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
};

export default Signin;
