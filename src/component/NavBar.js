import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { FiUserPlus } from 'react-icons/fi';
import { FaSignInAlt } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import SignOutButton from './SignOutButton';
import { fetchUser } from '../redux/user/user';
import logo from '../assets/images/awesome-events-logo.png';
import '../css/NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchUserAction = bindActionCreators(fetchUser, dispatch);

  useEffect(async () => {
    await fetchUserAction();
  }, []);

  return (
    <Navbar expand="lg">
      <Container fluid className="d-flex justify-content-between">
        <Navbar.Brand href="/">
          <Image src={logo} className="image-size border-0" thumbnail />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end align-items-center">
          <Nav />
          {user.name ? (
            <>
              <p className="pe-1 m-0">
                Wellcome Again
                <span className="ms-2">{user.name}</span>
              </p>
              <SignOutButton />
            </>
          ) : (
            <>
              <Button className="mx-2">
                <a href="/sign_in" className="link-light">
                  <FaSignInAlt />
                  Sign In
                </a>
              </Button>
              <Button className="mx-1">
                <a href="/sign_up" className="link-light">
                  <FiUserPlus />
                  Sign Up
                </a>
              </Button>
            </>
          )}
          <Form className="d-flex ms-2">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">
              <AiOutlineSearch />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
