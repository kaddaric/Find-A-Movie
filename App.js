import React from 'react';
import Navigator from './Navigation/Navigation';
import { Provider } from 'react-redux';
import store from './Store/configStore';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

