import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { reserveEvent } from '../redux/event/event';

const ReservationForm = () => {
  const details = useSelector((state) => state.events.eventDetails);
  const dispatch = useDispatch();
  const reserveEventAction = bindActionCreators(reserveEvent, dispatch);
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('');
  const navigate = useNavigate();

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const reservationDetails = {
          event_id: details.id,
          date: eventDate,
          city: eventCity,
        };
        await reserveEventAction(reservationDetails);
        navigate('/attending_events');
      }}
      className="mt-3"
    >

      <Form.Group className="mb-3" controlId="formBasicEventDate">
        <Form.Control
          type="text"
          value={details.name}
          disabled
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEventDate">
        <Form.Control
          type="date"
          value={eventDate}
          onChange={(e) => {
            setEventDate(e.target.value);
          }}
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
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ReservationForm;
