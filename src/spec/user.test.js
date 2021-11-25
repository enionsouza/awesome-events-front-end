import {
  signUp, signIn, signOut, fetchUser,
} from '../redux/user/user';
import MockLocalStorage from './mockFn/localStorage';

describe('Unit tests for \'src/redux/user/user\'', () => {
  jest.mock('../redux/user/user');
  let expectedOutputAction;
  const dispatchMock = (input) => {
    expectedOutputAction = input;
  };
  // eslint-disable-next-line no-unused-vars
  global.localStorage = new MockLocalStorage();

  // Mock user data
  const userData = {
    user: {
      name: 'user001',
      email: 'user001@example.com',
      password: '123456',
      password_confirmation: '123456',
    },
  };

  const mockToken = '<TOKEN>';
  const mockId = 1;

  // Action Types
  const SIGN_UP = 'SIGN_UP';
  const SIGN_IN = 'SIGN_IN';
  const SIGN_OUT = 'SIGN_OUT';
  const FETCH_USER = 'FETCH_USER';

  describe('action creators', () => {
    it('responds correctly to a call for \'signUp\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify(
        {
          message: 'Signed up sucessfully.',
          user: { name: userData.user.name, id: mockId, token: mockToken },
        },
      ));
      await signUp(
        userData.user.name,
        userData.user.email,
        userData.user.password,
        userData.user.password_confirmation,
      )(dispatchMock);
      expect(expectedOutputAction.type).toEqual(SIGN_UP);
      expect(expectedOutputAction.payload)
        .toEqual({ name: userData.user.name, id: mockId });
      expect(JSON.parse(localStorage.token)).toEqual(mockToken);
      localStorage.clear();
    });

    it('responds correctly to a call for \'fetchUser\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify(
        {
          message: 'You are logged in.',
          user: {
            name: userData.user.name,
            id: mockId,
            token: mockToken,
          },
        },
      ));
      await signIn(
        userData.user.email,
        userData.user.password,
      )(dispatchMock);
      expect(expectedOutputAction.type).toEqual(SIGN_IN);
      expect(expectedOutputAction.payload)
        .toEqual({ name: userData.user.name, id: mockId });
      expect(JSON.parse(localStorage.token)).toEqual(mockToken);
    });

    it('responds correctly to a call for \'fetchUser\' thunk', async () => {
      fetch.mockResponseOnce(JSON.stringify(
        {
          user: {
            name: userData.user.name,
            id: mockId,
            token: mockToken,
          },
        },
      ));
      await fetchUser()(dispatchMock);
      expect(expectedOutputAction.type).toEqual(FETCH_USER);
      expect(expectedOutputAction.payload)
        .toEqual({ name: userData.user.name, id: mockId });
      expect(JSON.parse(localStorage.token)).toEqual(mockToken);
    });

    it('responds correctly to a call for \'signOut\' thunk', async () => {
      expect(JSON.parse(localStorage.token)).toEqual(mockToken);
      fetch.mockResponseOnce(JSON.stringify({}));
      await signOut()(dispatchMock);
      expect(expectedOutputAction.type).toEqual(SIGN_OUT);
      expect(expectedOutputAction.payload).toBeUndefined();
      expect(localStorage.token).toBeUndefined();
    });
  });
});
