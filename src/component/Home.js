import { useSelector } from 'react-redux';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/awesome-events-logo.png';
import '../css/Home.css';

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center content-height">
      <Image src={logo} className="image-size border-0 mb-3" thumbnail />
      {user.name ? (
        <p>
          Welcome back&nbsp;
          {user.name}
          !
        </p>
      ) : (
        <p>
          <Link to="/sign_in">Sign In</Link>
          {' '}
          or&nbsp;
          <Link to="/sign_up">Sign Up</Link>
          {' '}
          to access available events and
          create your own events
        </p>
      )}
    </div>
  );
};

export default Home;
