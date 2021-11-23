/* eslint-disable no-lone-blocks */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { BiLeftArrow } from 'react-icons/bi';

const EventDetails = () => {
  const details = useSelector((state) => state.events.eventDetails);
  const loading = useSelector((state) => state.events.loading);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (details.date) {
      const eventDate = new Date(details.date);
      const months = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec',
      };
      const dd = String(eventDate.getDate()).padStart(2, '0');
      const mm = String(eventDate.getMonth() + 1).padStart(2, '0');
      const yyyy = eventDate.getFullYear();

      setDate(`${months[mm]}/${dd}/${yyyy}`);
    }
    return () => null;
  }, []);

  return (
    <>
      {!loading && (
        <Card key={details.id} style={{ width: '36rem' }}>
          <Card.Img variant="top" src={`${details.image}`} />
          <Card.Body className="d-flex flex-column align-items-start">
            <Card.Title className="align-self-center">{`${details.name}`}</Card.Title>
            <Card.Text>{`Description: ${details.description}`}</Card.Text>
            {date && (
              <>
                <Card.Text>{`Creator: ${details.creator_name}`}</Card.Text>
                <Card.Text>{`City: ${details.city}`}</Card.Text>
                <Card.Text>{`Date of Event: ${date}`}</Card.Text>
              </>
            )}
            {date ? (
              <Button variant="primary">Cancel Reservation</Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => navigate('/reservation_form')}
              >
                Reserve
              </Button>
            )}
            <Button variant="secondary" onClick={() => navigate(-1)}>
              <BiLeftArrow />
            </Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default EventDetails;
