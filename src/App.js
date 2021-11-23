import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './component/SignUpForm';
import SignInForm from './component/SignInForm';
import NavPanel from './component/NavPanel';
import Home from './component/Home';
import CreateEventForm from './component/CreateEventForm';
import AllEvents from './component/AllEvents';
import AttendingEvents from './component/AttendingEvents';
import EventDetails from './component/EventDetails';
import ReservationForm from './component/ReservationForm';

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
          <Route exact path="/all_events" element={<AllEvents />} />
          <Route exact path="/attending_events" element={<AttendingEvents />} />
          <Route exact path="/event_details" element={<EventDetails />} />
          <Route exact path="/reservation_form" element={<ReservationForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
