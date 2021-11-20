import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './component/SignUpForm';
import SignInForm from './component/SignInForm';
import NavPanel from './component/NavPanel';
import Home from './component/Home';
import CreateEventForm from './component/CreateEventForm';

function App() {
  return (
    <div className="App container-fluid d-flex justify-content-center flex-column">
      <Router>
        <NavPanel />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign_up" element={<SignUpForm />} />
          <Route exact path="/sign_in" element={<SignInForm />} />
          <Route exact path="/create_event" element={<CreateEventForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
