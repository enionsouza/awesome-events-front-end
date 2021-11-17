import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './component/SignUpForm';
import SignInForm from './component/SignInForm';
import SignOutButton from './component/SignOutButton';

function App() {
  return (
    <div className="App container-fluid d-flex justify-content-center m-5">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignOutButton />} />
          <Route exact path="/sign_up" element={<SignUpForm />} />
          <Route exact path="/sign_in" element={<SignInForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
