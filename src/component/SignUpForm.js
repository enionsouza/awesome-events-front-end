import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signUp } from '../redux/user/user';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const signUpAction = bindActionCreators(signUp, dispatch);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await signUpAction(userName, email, password, passwordConfirmation);
        setEmail('');
        setPassword('');
        setUserName('');
        setPasswordConfirmation('');
        navigate('/');
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
          {' '}
          {user.name}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="User Name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          value={passwordConfirmation}
          onChange={(e) => {
            setPasswordConfirmation(e.target.value);
          }}
          placeholder="Password Confirmation"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUpForm;
