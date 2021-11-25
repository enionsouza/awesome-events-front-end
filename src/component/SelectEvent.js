import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IoIosArrowDropright } from 'react-icons/io';
import { setEventDetails } from '../redux/event/event';
import '../css/SelectEvent.css';

const SelectEvent = ({ event }) => {
  const dispatch = useDispatch();
  const setEventDetailsAction = bindActionCreators(setEventDetails, dispatch);
  const navigate = useNavigate();

  const handleClick = () => {
    setEventDetailsAction(event);
    navigate('/event_details');
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      className="details-btn d-flex align-items-center"
    >
      <span>Details</span>
      <IoIosArrowDropright className="ps-1" />
    </Button>
  );
};

SelectEvent.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    creator_id: PropTypes.number,
    creator_name: PropTypes.string,
    date: PropTypes.string,
    city: PropTypes.string,
  }),
};

SelectEvent.defaultProps = {
  event: {
    creator_id: 0,
    creator_name: '',
    date: '',
    city: '',
  },
};

export default SelectEvent;
