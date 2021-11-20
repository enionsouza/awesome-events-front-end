import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createEvent } from '../redux/event/event';

const CreateEventForm = () => {
  console.log(JSON.parse(localStorage.getItem('token')));
  const dispatch = useDispatch();
  const createEventAction = bindActionCreators(createEvent, dispatch);

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventCountry, setEventCountry] = useState('');

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', eventName);
        formData.append('description', eventDescription);
        formData.append('image', eventImage);
        formData.append('date_of_event', eventDate);
        formData.append('city', eventCity);
        formData.append('country', eventCountry);
        await createEventAction(formData);
      }}
      className="mt-3"
    >
      <Form.Group className="mb-3" controlId="formBasicEventName">
        <Form.Control
          type="text"
          value={eventName}
          onChange={(e) => {
            setEventName(e.target.value);
          }}
          placeholder="Enter event name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEventDescription">
        <Form.Control
          as="textarea"
          rows={3}
          value={eventDescription}
          onChange={(e) => {
            setEventDescription(e.target.value);
          }}
          placeholder="Enter event Description"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEventImage">
        <Form.Control
          type="file"
          onChange={(e) => {
            setEventImage(e.target.files[0]);
          }}
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

      <Form.Group className="mb-3" controlId="formBasicEventCountry">
        <Form.Control
          type="text"
          value={eventCountry}
          onChange={(e) => {
            setEventCountry(e.target.value);
          }}
          placeholder="Enter country"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateEventForm;
