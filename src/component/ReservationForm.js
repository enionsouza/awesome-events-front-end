import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { reserveEvent } from '../redux/event/event';
import '../css/ReservationForm.css';

const ReservationForm = () => {
  const details = useSelector((state) => state.events.eventDetails);
  const dispatch = useDispatch();
  const reserveEventAction = bindActionCreators(reserveEvent, dispatch);
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date(eventDate);
    date.setHours(date.getHours() + 12);
    const reservationDetails = {
      event_id: details.id,
      date,
      city: eventCity,
    };
    await reserveEventAction(reservationDetails);
    navigate('/attending_events');
  };

  return (
    <div className="row bg-image-reservation mx-0 d-flex flex-column justify-content-center align-items-center">
      <div className="col-sm-6">
        <h2 className="light-font">Reserve an Event</h2>
        <Form
          onSubmit={handleSubmit}
          className="mt-3"
        >

          <Form.Group className="mb-3" controlId="formBasicEventDate">
            <Form.Control
              type="text"
              value={details.name}
              disabled
              className="input-submit"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEventDate">
            <Form.Control
              type="date"
              value={eventDate}
              onChange={(e) => {
                setEventDate(e.target.value);
              }}
              className="input-submit"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEventCity">
            <Form.Control
              type="text"
              value={eventCity}
              onChange={(e) => {
                setEventCity(e.target.value);
              }}
              placeholder="Enter city"
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

export default ReservationForm;
