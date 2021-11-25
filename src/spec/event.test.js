import {
  createEvent,
  deleteEvent,
  allEvents,
  attendingEvents,
  setEventDetails,
  reserveEvent,
  deleteAttendance,
} from '../redux/event/event';
import MockLocalStorage from './mockFn/localStorage';

describe('Unit tests for \'src/redux/event/event\'', () => {
  jest.mock('../redux/event/event');
  let expectedOutputAction;
  const dispatchMock = (input) => {
    expectedOutputAction = input;
  };
  // eslint-disable-next-line no-unused-vars
  global.localStorage = new MockLocalStorage();
  const mockToken = '<TOKEN>';

  // Mock event data
  const eventsData = [{
    name: 'event001',
    description: 'Event\'s description...',
    image: 'http://www.image_url.com',
  }];

  const attendanceData = {
    id: 1,
    event_id: 1,
    attendee_id: 1,
  };

  const attendingEventsData = [{
    name: 'event001',
    description: 'Event\'s description...',
    id: 1,
    image: 'http://www.image_url.com',
    creator_id: 1,
    creator_name: 'event001',
    date: JSON.stringify(new Date()),
    city: 'City',
  }];

  // Action Types
  const CREATE_EVENT = 'CREATE_EVENT';
  const ALL_EVENTS = 'ALL_EVENTS';
  const ATTENDING_EVENTS = 'ATTENDING_EVENTS';
  const SET_EVENT_DETAILS = 'SET_EVENT_DETAILS';

  describe('action creators', () => {
    it('responds correctly to a call for \'createEvent\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify(eventsData));
      localStorage.token = JSON.stringify(mockToken);
      const formData = new FormData();
      await createEvent(formData)(dispatchMock);
      expect(expectedOutputAction.type).toEqual(CREATE_EVENT);
      expect(expectedOutputAction.payload).toEqual(eventsData);
    });

    it('responds correctly to a call for \'deleteEvent\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify({ message: 'Event successfully deleted' }));
      fetch.mockResponseOnce(JSON.stringify(eventsData));
      localStorage.token = JSON.stringify(mockToken);
      await deleteEvent(1)(dispatchMock);
      expect(expectedOutputAction.type).toEqual(ALL_EVENTS);
      expect(expectedOutputAction.payload).toEqual(eventsData);
    });

    it('responds correctly to a call for \'allEvents\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify(eventsData));
      localStorage.token = JSON.stringify(mockToken);
      await allEvents()(dispatchMock);
      expect(expectedOutputAction.type).toEqual(ALL_EVENTS);
      expect(expectedOutputAction.payload).toEqual(eventsData);
    });

    it('responds correctly to a call for \'attendingEvents\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify(eventsData));
      localStorage.token = JSON.stringify(mockToken);
      await attendingEvents()(dispatchMock);
      expect(expectedOutputAction.type).toEqual(ATTENDING_EVENTS);
      expect(expectedOutputAction.payload).toEqual(eventsData);
    });

    it('responds correctly to a call for \'setEventDetails\' function', () => {
      const res = setEventDetails(eventsData[0]);
      expect(res.type).toEqual(SET_EVENT_DETAILS);
      expect(res.payload).toEqual(eventsData[0]);
    });

    it('responds correctly to a call for \'reserveEvent\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify(attendanceData));
      fetch.mockResponseOnce(JSON.stringify(attendingEventsData));
      localStorage.token = JSON.stringify(mockToken);
      await reserveEvent()(dispatchMock);
      expect(expectedOutputAction.type).toEqual(ATTENDING_EVENTS);
      expect(expectedOutputAction.payload).toEqual(attendingEventsData);
    });

    it('responds correctly to a call for \'deleteAttendance\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify({}));
      fetch.mockResponseOnce(JSON.stringify(attendingEventsData));
      localStorage.token = JSON.stringify(mockToken);
      await deleteAttendance(2)(dispatchMock);
      expect(expectedOutputAction.type).toEqual(ATTENDING_EVENTS);
      expect(expectedOutputAction.payload).toEqual(attendingEventsData);
    });
  });
});
