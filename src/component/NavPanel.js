import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Offcanvas,
  Nav,
  Button,
  Container,
  Image,
} from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';
import { FaSignInAlt } from 'react-icons/fa';
import logo from '../assets/images/awesome-events-logo.png';
import { fetchUser } from '../redux/user/user';
import SignOutButton from './SignOutButton';
import '../css/NavPanel.css';

const NavPanel = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchUserAction = bindActionCreators(fetchUser, dispatch);

  useEffect(async () => {
    await fetchUserAction();
  }, []);
  return (
    <Navbar bg="transparent" className="sticky-top position-absolute" expand={false}>
      <Container fluid className="d-flex justify-between">
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="border border-4 bg-green shadowed-white" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <Link to="/">
                <Image src={logo} className="image-size border-0" thumbnail />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {user.name ? (
              <>
                <p className="pe-1 m-0">
                  Welcome Again
                  <span className="ms-2">{user.name}</span>
                </p>
                <SignOutButton />
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link href="/all_events">Events</Nav.Link>
                  <Nav.Link href="/create_event">Create Events</Nav.Link>
                  <Nav.Link href="/attending_events">My Reservations</Nav.Link>
                </Nav>
              </>
            ) : (
              <>
                <Button className="mx-2">
                  <Link to="/sign_in" className="link-light">
                    <FaSignInAlt />
                    Sign In
                  </Link>
                </Button>
                <Button className="mx-1">
                  <Link to="/sign_up" className="link-light">
                    <FiUserPlus />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavPanel;
