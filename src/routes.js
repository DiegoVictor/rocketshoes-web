import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '~/components/pages/Home';
import Cart from '~/components/pages/Cart';

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
};
