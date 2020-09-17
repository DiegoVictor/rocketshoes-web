import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';

import Routes from '~/routes';
import Header from '~/components/Header';
import history from '~/services/history';
import Theme from '~/styles/theme';
import store from '~/store';

export default () => {
  return (
    <Provider store={store}>
      <Theme />
      <ToastContainer autoClose={3000} />

      <Router history={history}>
        <Header />
        <Routes />
      </Router>
    </Provider>
  );
};
