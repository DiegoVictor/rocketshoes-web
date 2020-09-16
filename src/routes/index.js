import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '~/pages/Home';
import Cart from '~/pages/Cart';

export default () => {
  return (
    <Switch>
      <Route path="/cart" component={Cart} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};
