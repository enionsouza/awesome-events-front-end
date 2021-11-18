import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './component/SignUpForm';
import SignInForm from './component/SignInForm';
import NavBar from './component/NavBar';

function App() {
  return (
    <div className="App container-fluid d-flex justify-content-center flex-column">
      <Router>
        <NavBar className="" />
        <Routes>
          <Route exact path="/" element={<h1>Hello</h1>} />
          <Route exact path="/sign_up" element={<SignUpForm />} />
          <Route exact path="/sign_in" element={<SignInForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
