/* eslint-disable no-lone-blocks */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Button, Image, Table } from 'react-bootstrap';
import { BiLeftArrow } from 'react-icons/bi';
import { GiCancel } from 'react-icons/gi';
import { RiReservedLine } from 'react-icons/ri';
import { IoIosArrowDropright } from 'react-icons/io';
import { deleteAttendance } from '../redux/event/event';
import '../css/EventDetails.css';

const EventDetails = () => {
  const details = useSelector((state) => state.events.eventDetails);
  const loading = useSelector((state) => state.events.loading);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteAttendanceAction = bindActionCreators(deleteAttendance, dispatch);

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
        <div className="row">
          <div className="col-8 px-0">
            <div className="gfg">
              <Image className="img-carousel" src={`${details.image}`} />
            </div>
            <Button className="back-button" onClick={() => navigate(-1)}>
              <BiLeftArrow className="fs-5" />
            </Button>
          </div>
          <div className="col-4 d-flex flex-column align-items-end px-5">
            <h2 className="pb-4 pt-4">{`${details.name}`}</h2>
            <Table striped hover>
              <tbody>
                <tr>
                  <th>Description:</th>
                  <td>{`${details.description}`}</td>
                </tr>
                {date && (
                  <>
                    <tr>
                      <th>Creator:</th>
                      <td>{`${details.creator_name}`}</td>
                    </tr>
                    <tr>
                      <th>City:</th>
                      <td>{`${details.city}`}</td>
                    </tr>
                    <tr>
                      <th>Date:</th>
                      <td>{`${date}`}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
            {date ? (
              <Button
                className="reservation-btn d-flex align-items-center"
                onClick={() => {
                  deleteAttendanceAction(details.id);
                  navigate('/attending_events');
                }}
              >
                <GiCancel className="fs-1 pe-2" />
                <span>Cancel Reservation</span>
              </Button>
            ) : (
              <Button
                className="reservation-btn d-flex align-items-center"
                onClick={() => navigate('/reservation_form')}
              >
                <RiReservedLine className="fs-1 pe-2" />
                <span>Reserve</span>
                <IoIosArrowDropright className="ps-2 fs-3" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetails;
