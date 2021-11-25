import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchUser } from '../redux/user/user';
import logo from '../assets/images/awesome-events-logo-white.png';
import '../css/Home.css';

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchUserAction = bindActionCreators(fetchUser, dispatch);

  useEffect(async () => {
    if (localStorage.token) {
      await fetchUserAction();
    }
  }, []);

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center content-height bg-image">
      <Image src={logo} bg="transparent" className="image-size border-0 mb-3 shadowed" />
      {user?.name ? (
        <h3 className="light-font">
          Welcome back
          {' '}
          <span>{user.name}</span>
          !
        </h3>
      ) : (
        <h3 className="light-font">
          <Link to="/sign_in" className="light-font">Sign In</Link>
          {' '}
          or
          {' '}
          <Link to="/sign_up" className="light-font">Sign Up</Link>
          {' '}
          to access available events and
          create your own events
        </h3>
      )}
    </div>
  );
};

export default Home;
