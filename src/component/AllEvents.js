import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Button } from 'react-bootstrap';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { allEvents } from '../redux/event/event';

const AllEvents = () => {
  const dispatch = useDispatch();
  const allEventsAction = bindActionCreators(allEvents, dispatch);
  const events = useSelector((state) => state.events.events);
  const loading = useSelector((state) => state.events.loading);

  const cardsPerPage = 3;
  const lastPage = Math.ceil(events.length / cardsPerPage);

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1);
  }, [events]);

  useEffect(async () => {
    if (loading) {
      await allEventsAction();
    }
  }, []);
  const renderEvents = () => {
    const result = [];
    for (
      let i = (activePage - 1) * cardsPerPage;
      i < Math.min(cardsPerPage * activePage, events.length);
      i += 1
    ) {
      let dateOfEvent = new Date(events[i].date_of_event);
      const dd = String(dateOfEvent.getDate()).padStart(2, '0');
      const mm = String(dateOfEvent.getMonth() + 1).padStart(2, '0');
      const yyyy = dateOfEvent.getFullYear();

      dateOfEvent = `${mm}/${dd}/${yyyy}`;

      result.push(
        <Card key={events[i].id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`${events[i].image}`} />
          <Card.Body>
            <Card.Title>{`${events[i].name}`}</Card.Title>
            <Card.Text>{`${events[i].description}`}</Card.Text>
            {/* <Card.Text>{`${events[i].city}`}</Card.Text>
            <Card.Text>{`${events[i].country}`}</Card.Text>
            <Card.Text>{`${dateOfEvent}`}</Card.Text>
            <Button variant="primary">Details</Button> */}
          </Card.Body>
        </Card>,
      );
    }
    return result;
  };

  const navigateEvents = (change) => {
    if (
      (activePage + change <= lastPage && change > 0)
      || (activePage + change >= 1 && change < 0)
    ) {
      setActivePage((prevActivePage) => prevActivePage + change);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-column align-items-center">
        <h1>Upcoming Events</h1>
        <h4>Please select an event</h4>
      </div>
      <div className="d-flex align-items-center">
        <Button onClick={() => navigateEvents(-1)}>
          <BiLeftArrow style={{ fontSize: '2rem' }} />
        </Button>
        {!loading && renderEvents()}
        <Button onClick={() => navigateEvents(1)}>
          <BiRightArrow style={{ fontSize: '2rem' }} />
        </Button>
      </div>
    </div>
  );
};

export default AllEvents;
