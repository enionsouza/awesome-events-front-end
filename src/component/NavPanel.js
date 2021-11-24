import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Offcanvas,
  Nav,
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
          <Offcanvas.Body classsName="px-0">
            {user.name ? (
              <>
                <p className="pe-1 m-0 text-center">
                  Welcome Again
                  <span className="ms-2">{user.name}</span>
                </p>
                <div className="d-flex justify-content-center mb-4">
                  <SignOutButton />
                </div>
                <Nav className="justify-content-start flex-grow-1">
                  <Nav.Link
                    href="/all_events"
                    className="text-uppercase fw-bold py-3 ps-5 menu-link"
                  >
                    Events

                  </Nav.Link>
                  <Nav.Link href="/create_event" className="text-uppercase fw-bold py-3 ps-5 menu-link">Create Events</Nav.Link>
                  <Nav.Link href="/attending_events" className="text-uppercase fw-bold py-3 ps-5 menu-link">My Reservations</Nav.Link>
                </Nav>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                <Link
                  to="/sign_in"
                  className="mx-2 gray-btn gray-text link-light d-flex align-items-center justify-content-center gray-text text-decoration-none
"
                >
                  <FaSignInAlt />
                  <span className="ms-2">Sign In</span>
                </Link>
                <Link
                  to="/sign_up"
                  className="mx-1 gray-btn link-light d-flex align-items-center justify-content-center gray-text text-decoration-none
"
                >
                  <FiUserPlus />
                  <span className="ms-2">Sign Up</span>
                </Link>
              </div>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavPanel;
