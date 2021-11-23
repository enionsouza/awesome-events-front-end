import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { allEvents, setEventDetails } from '../redux/event/event';

const AllEvents = () => {
  const dispatch = useDispatch();
  const allEventsAction = bindActionCreators(allEvents, dispatch);
  const setEventDetailsAction = bindActionCreators(setEventDetails, dispatch);
  const events = useSelector((state) => state.events.allEvents);
  const loading = useSelector((state) => state.events.loading);
  const navigate = useNavigate();

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
      result.push(
        <Card key={events[i].id} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`${events[i].image}`} />
          <Card.Body>
            <Card.Title>{`${events[i].name}`}</Card.Title>
            <Card.Text>{`${events[i].description}`}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setEventDetailsAction(events[i]);
                navigate('/event_details');
              }}
            >
              Details

            </Button>
          </Card.Body>
        </Card>,
      );
    }
    return result;
  };

  const handleNavigation = (change) => {
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
      <div className="d-flex align-items-center justify-content-between">
        <Button onClick={() => handleNavigation(-1)}>
          <BiLeftArrow style={{ fontSize: '2rem' }} />
        </Button>
        {!loading && renderEvents()}
        <Button onClick={() => handleNavigation(1)}>
          <BiRightArrow style={{ fontSize: '2rem' }} />
        </Button>
      </div>
    </div>
  );
};

export default AllEvents;
