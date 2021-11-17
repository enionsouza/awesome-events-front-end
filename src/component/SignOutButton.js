import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/Button';
import { signOut } from '../redux/user/user';

const SignOutButton = () => {
  const dispatch = useDispatch();
  const signInAction = bindActionCreators(signOut, dispatch);

  return (
    <Button type="button" onClick={() => signInAction()}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
