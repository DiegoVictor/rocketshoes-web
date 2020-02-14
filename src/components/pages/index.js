import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Routes from '~/routes';
import Header from '~/components/Header';
import history from '~/services/history';
import '~/config/ReactotronConfig';
import store from '~/store';
import Style from './styles';

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Style />
        <Routes />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
};
