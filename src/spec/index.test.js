import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from '../redux/configureStore';
import App from '../App';

describe('Root page', () => {
  describe('Use Jest snapshots to test the Home page', () => {
    it('renders Home page placeholders as expected', async () => {
      const rootPage = render(
        <Provider store={store}>
          <App />
        </Provider>,
      );

      expect(rootPage.asFragment()).toMatchSnapshot();
    });
  });
});
