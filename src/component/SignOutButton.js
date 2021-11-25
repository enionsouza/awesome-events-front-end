import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import { FaSignOutAlt } from 'react-icons/fa';
import { signOut } from '../redux/user/user';
import '../css/NavPanel.css';

const SignOutButton = () => {
  const dispatch = useDispatch();
  const signOutAction = bindActionCreators(signOut, dispatch);

  return (
    <Button type="button" onClick={async () => signOutAction()} className="mx-2 d-flex align-items-center justify-content-center gray-btn">
      <FaSignOutAlt />
      <span className="ms-2">Sign Out</span>
    </Button>
  );
};

export default SignOutButton;
