import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signIn } from '../redux/user/user';

const SignInForm = () => {
  const dispatch = useDispatch();
  const signInAction = bindActionCreators(signIn, dispatch);
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await signInAction(email, password);
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignInForm;
