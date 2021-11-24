import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Image } from 'react-bootstrap';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { attendingEvents } from '../redux/event/event';
import SelectEvent from './SelectEvent';
import '../css/AttendingEvents.css';

const AttendingEvents = () => {
  const dispatch = useDispatch();
  const attendingEventsAction = bindActionCreators(attendingEvents, dispatch);
  const events = useSelector((state) => state.events.attendingEvents);
  const loading = useSelector((state) => state.events.loading);

  const cardsPerPage = 3;
  const lastPage = Math.ceil(events.length / cardsPerPage);

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    setActivePage(1);
  }, [events]);

  useEffect(async () => {
    if (loading) {
      await attendingEventsAction();
    }
  }, []);

  const renderEvents = () => {
    const result = [];
    for (
      let i = (activePage - 1) * cardsPerPage;
      i < Math.min(cardsPerPage * activePage, events.length);
      i += 1
    ) {
      let date = new Date(events[i].date);
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();

      date = `${mm}/${dd}/${yyyy}`;

      result.push(
        <div
          className="d-flex flex-column align-items-center justify-content-center mx-2"
          key={events[i].id}
          style={{ width: '9rem' }}
        >
          <Image className="img-events" src={`${events[i].image}`} />
          <h5 className="title-event-list mt-1 fw-bold text-uppercase text-center">{`${events[i].name}`}</h5>
          <p className="dots-line mt-1 text-center">•••••••••••••••••••••</p>
          <p className="mb-0 text-event-list text-center">{`Description: ${events[i].description}`}</p>
          <p className="mb-0 text-event-list text-center">{`City: ${events[i].city}`}</p>
          <p className="mb-0 text-event-list text-center">{`Date: ${date}`}</p>
          <SelectEvent className="mt-1" event={events[i]} />
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
          <BiLeftArrow className="fw-bold" style={{ fontSize: '0.9rem' }} />
        </Button>
      </div>
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center">
          <h1 className="title-events text-uppercase">My Attending Events</h1>
          <h6 className="subtitle-events">Please select an event</h6>
          <p className="dots-line mt-2">•••••••••••••••••••••</p>
        </div>
        <div className="col-12 d-flex align-items-center justify-content-between mt-2">
          {!loading && renderEvents()}
        </div>
      </div>
      <div className="row">
        <Button className="next-btn" onClick={() => handleNavigation(1)}>
          <BiRightArrow className="fw-bold" style={{ fontSize: '0.9rem' }} />
        </Button>
      </div>
    </div>
  );
};

export default AttendingEvents;
