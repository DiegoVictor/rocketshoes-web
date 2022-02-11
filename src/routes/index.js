import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '~/pages/Home';
import Cart from '~/pages/Cart';

export default () => {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};
