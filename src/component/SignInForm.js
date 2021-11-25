import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { signIn } from '../redux/user/user';
import '../css/SignInForm.css';

const SignInForm = () => {
  const dispatch = useDispatch();
  const signInAction = bindActionCreators(signIn, dispatch);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInAction(email, password);
    setEmail('');
    setPassword('');
    navigate('/');
  };

  return (
    <div className="row bg-image-sign-in mx-0 d-flex flex-column justify-content-center align-items-center">
      <div className="col-sm-6">
        <h2 className="light-font">Sign In</h2>
        <Form
          onSubmit={handleSubmit}
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
          <Button type="submit" className="button-submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
