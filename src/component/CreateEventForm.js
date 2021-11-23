import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createEvent } from '../redux/event/event';

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const createEventAction = bindActionCreators(createEvent, dispatch);

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('');

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', eventName);
        formData.append('description', eventDescription);
        formData.append('image', eventImage);
        await createEventAction(formData);
        setEventName('');
        setEventDescription('');
        e.target.reset();
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CreateEventForm;
