import React, {
  useContext, useState, useEffect, useRef,
} from 'react';
import { AiOutlineAmazon, AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { RiGhostFill } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import { UserContext } from 'contexts/User';
import { CartContext } from 'contexts/Cart';
import { signOutUser } from 'actions/user';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './style.css';

const Header = () => {
  const [{ selectedProducts, availableProducts }] = useContext(CartContext);
  const [{ user }, dispatch] = useContext(UserContext);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const searchBoxRef = useRef();
  const history = useHistory();

  useEffect(() => {
    searchBoxRef.current.focus();
  }, []);
  useEffect(() => {
    if (searchText.length > 2) {
      setSearchResult(
        Object.values(availableProducts)
          .filter((product) => new RegExp(searchText, 'gi').test(product.title)),
      );
    } else {
      setSearchResult([]);
    }
  }, [searchText]);

  return (
    <div className="nav-bar h-60 d-flex mb-5">
      <Button
        aria-label="Back to Home"
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
            ref={searchBoxRef}
            placeholder="Start typing... (min 3 characters)"
            onChange={(ev) => setSearchText(ev.target.value)}
          />
          <InputGroup.Append>
            <Button className="amz-button-primary" aria-label="Search Amazon">
              <AiOutlineSearch />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        {
          searchResult.length !== 0 && (
            <div className="search-bar--result border">
              {
                searchResult.map((product) => (
                  <div className="search-bar--result-product pb-3" key={product.sku}>
                    <Image src={product.imageUrl} className="img-thumbnail search-result--thumbnail" />
                    <span className="ml-2">{product.title}</span>
                  </div>
                ))
              }
              <div className="search-bar--result-footer text-center amz-text-xs text-info">
                <RiGhostFill />
                {' '}
                Boo, you can&apos;t click on any result
              </div>
            </div>
          )
        }
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
