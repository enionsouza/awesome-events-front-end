import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signUp } from '../redux/user/user';
import '../css/SignUpForm.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const signUpAction = bindActionCreators(signUp, dispatch);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  return (
    <div className="row bg-image-sign-up mx-0 d-flex flex-column justify-content-center align-items-center">
      <div className="col-sm-6">
        <h2 className="light-font">Sign Up</h2>
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
              className="input-submit"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="User Name"
              className="input-submit"
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
              className="input-submit"
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
              className="input-submit"
            />
          </Form.Group>
          <Button type="submit" className="button-submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
