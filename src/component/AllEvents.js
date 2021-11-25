import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image, Button } from 'react-bootstrap';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import { allEvents, deleteEvent } from '../redux/event/event';
import SelectEvents from './SelectEvent';
import '../css/AllEvents.css';

const AllEvents = () => {
  const dispatch = useDispatch();
  const allEventsAction = bindActionCreators(allEvents, dispatch);
  const deleteEventAction = bindActionCreators(deleteEvent, dispatch);
  const events = useSelector((state) => state.events.allEvents);
  const loading = useSelector((state) => state.events.loading);
  const user = useSelector((state) => state.user);

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

  const limitLength = (str) => {
    if (str.length > 20) {
      return `${str.slice(0, 20)}...`;
    }
    return str;
  };

  const renderEvents = () => {
    const result = [];
    for (
      let i = (activePage - 1) * cardsPerPage;
      i < Math.min(cardsPerPage * activePage, events.length);
      i += 1
    ) {
      result.push(
        <div
          className="d-flex flex-column width-18 align-items-center justify-content-center mx-2"
          key={events[i].id}
        >
          <Image className="img-events" src={`${events[i].image}`} />
          <h5 className="title-event-list mt-1 fw-bold text-uppercase text-center">{`${events[i].name}`}</h5>
          <p className="dots-line mt-1">•••••••••••••••••••••</p>
          <p className="mb-0 text-event-list text-center">{`Description: ${limitLength(events[i].description)}`}</p>
          <SelectEvents className="mt-1" event={events[i]} />
          {user.id === events[i].creator_id && (
            <Button
              onClick={async () => deleteEventAction(events[i].id)}
              className="delete-btn d-flex align-items-center"
            >
              <GiCancel className="pe-1 color-icon-cancel" />
              Delete
            </Button>
          )}
        </div>,
      );
    }
    return result;
  };

  const handleNavigation = (change) => {
    if (activePage + change >= 1 && activePage + change <= lastPage) {
      setActivePage((prevActivePage) => prevActivePage + change);
    }
  };

  return (
    <div className="container-fluid px-0 height-container d-flex justify-content-between align-items-center">
      <div className="row">
        <Button className="back-btn" onClick={() => handleNavigation(-1)}>
          <BiLeftArrow className="fs-09" />
        </Button>
      </div>
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center">
          <h1 className="title-events text-uppercase">Available Events</h1>
          <h6 className="subtitle-events">Please select an event</h6>
          <p className="dots-line mt-2">•••••••••••••••••••••</p>
        </div>
        <div className="col-12 d-flex align-items-center justify-content-between mt-2">
          {!loading && renderEvents()}
        </div>
      </div>
      <div className="row">
        <Button className="next-btn" onClick={() => handleNavigation(1)}>
          <BiRightArrow className="fs-09" />
        </Button>
      </div>
    </div>
  );
};

export default AllEvents;
