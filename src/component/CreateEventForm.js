import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createEvent } from '../redux/event/event';
import '../css/CreateEventForm.css';

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const createEventAction = bindActionCreators(createEvent, dispatch);

  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('');

  return (
    <div className="row bg-image-sign-up mx-0 d-flex flex-column justify-content-center align-items-center">
      <div className="col-sm-6">
        <h2 className="light-font">Create new event</h2>
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
        >
          <Form.Group className="mb-3" controlId="formBasicEventName">
            <Form.Control
              type="text"
              value={eventName}
              onChange={(e) => {
                setEventName(e.target.value);
              }}
              placeholder="Enter event name"
              className="input-submit"
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
              className="input-textarea"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEventImage">
            <Form.Control
              type="file"
              onChange={(e) => {
                setEventImage(e.target.files[0]);
              }}
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

export default CreateEventForm;
