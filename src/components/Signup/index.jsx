import React, {
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserContext } from 'contexts/User';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import authValidator from 'utils/user-validator';
import { registerUser } from 'actions/user';

const Signup = ({ from }) => {
  const [{ isLoading, errorMessage }, dispatch] = useContext(UserContext);
  const isComponentRendered = useRef();
  const formRefs = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
  };
  const [userDetails, setUserDetails] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  const updateUserDetails = (ev) => {
    const { target: { name, value } } = ev;

    setUserDetails({ ...userDetails, [name]: value });
  };
  const validateForm = (ev) => {
    ev.preventDefault();
    setInvalidFields(authValidator(userDetails, ['name', 'email', 'password']));
  };

  useEffect(() => {
    if (invalidFields.first) {
      formRefs[invalidFields.first].current.focus();
    } else if (isComponentRendered.current) {
      registerUser(dispatch)(userDetails);
    }
  }, [invalidFields]);
  useEffect(() => {
    formRefs.name.current.focus();
    isComponentRendered.current = true;
  }, []);

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
        <Form className="amz-form" onSubmit={validateForm}>
          <Form.Group>
            <h4>Create Account</h4>
          </Form.Group>
          <Form.Group>
            <Form.Label className="amz-text-sm font-weight-bold" htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              name="name"
              type="text"
              className="amz-text-sm amz-input--text-default  amz-input--text-default--xs"
              isInvalid={invalidFields.name}
              ref={formRefs.name}
              onChange={updateUserDetails}
            />
            <Form.Control.Feedback type="invalid">
              Ugh i don&apos;t know if human exist&apos;s with such name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="amz-text-sm font-weight-bold" htmlFor="email">Email</Form.Label>
            <Form.Control
              id="email"
              name="email"
              type="text"
              className="amz-text-sm amz-input--text-default  amz-input--text-default--xs"
              isInvalid={invalidFields.email}
              ref={formRefs.email}
              onChange={updateUserDetails}
            />
            <Form.Control.Feedback type="invalid">
              Enter a valid email address
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label className="amz-text-sm font-weight-bold" htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              name="password"
              type="password"
              className="amz-text-sm amz-input--text-default  amz-input--text-default--xs"
              isInvalid={invalidFields.password}
              ref={formRefs.password}
              onChange={updateUserDetails}
            />
            <Form.Control.Feedback type="invalid">
              Password should be at least 8 characters long
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Button
              block
              type="submit"
              variant="light"
              className="amz-text-sm amz-button--primary"
              disabled={isLoading}
            >
              {
                isLoading && (
                  <Spinner
                    className="mr-1"
                    as="span"
                    variant="dark"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )
              }
              Create you Amazon account
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
          <Form.Group className="mt-5">
            <Form.Text>
              Already have an account?
              {' '}
              <Link to={{
                pathname: '/sign-in',
                state: { from },
              }}
              >
                Sign-in
              </Link>
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </Row>
  );
};

Signup.defaultProps = {
  from: '/',
};
Signup.propTypes = {
  from: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
};

export default Signup;
