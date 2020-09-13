import React, { useContext } from 'react';
import { AiOutlineAmazon, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'contexts/User';
import { CartContext } from 'contexts/Cart';
import { signOutUser } from 'actions/user';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './style.css';

const Header = () => {
  const [{ selectedProducts }] = useContext(CartContext);
  const [{ user }, dispatch] = useContext(UserContext);
  const history = useHistory();

  return (
    <div className="nav-bar h-60 d-flex mb-5">
      <Button
        variant="link"
        className="nav-bar--logo nav-bar--anchor text-center"
        onClick={() => history.push('/')}
      >
        <AiOutlineAmazon />
      </Button>
      <div className="nav-bar--search">
        <InputGroup>
          <Form.Control
            className="amz-input-text"
            name="search"
            type="text"
          />
          <InputGroup.Append>
            <Button className="amz-button-primary">
              <AiOutlineSearch />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <Button
        variant="link"
        className="nav-bar--user-details nav-bar--anchor"
        onClick={() => (user ? signOutUser(dispatch)() : history.push('/sign-in'))}
      >
        <div className="amz-text-xs color-grey">
          Hello,
          {' '}
          {user ? user.name : 'Guest'}
        </div>
        <div>
          {user ? 'Sign Out' : 'Sign In'}
        </div>
      </Button>
      <Button
        variant="link"
        className="nav-bar--orders nav-bar--anchor"
        onClick={() => history.push('/orders')}
      >
        <div className="amz-text-xs color-grey">Returns</div>
        <div>& Orders</div>
      </Button>
      <Button
        className="nav-bar--cart d-flex flex-column align-items-center justify-content-center nav-bar--anchor"
        variant="link"
        role="button"
        tabIndex={0}
        onClick={() => history.push('/cart')}
      >
        <span className="amz-text-xs">
          {Object.values(selectedProducts).reduce((a, b) => a + b, 0)}
        </span>
        <AiOutlineShoppingCart />
      </Button>
    </div>
  );
};

export default Header;
