// eslint-disable-next-line import/no-extraneous-dependencies
import Reactotron from 'reactotron-react-js';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '~/store/modules/rootReducer';
import rootSaga from '~/store/modules/rootSaga';

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: (() => {
    if (process.env.NODE_ENV === 'development') {
      return Reactotron.createSagaMonitor();
    }
    return null;
  })(),
});

const store = createStore(
  rootReducer,
  (() => {
    if (process.env.NODE_ENV === 'development') {
      return compose(
        Reactotron.createEnhancer(),
        applyMiddleware(sagaMiddleware)
      );
    }
    return applyMiddleware(sagaMiddleware);
  })()
);

sagaMiddleware.run(rootSaga);

export default store;
