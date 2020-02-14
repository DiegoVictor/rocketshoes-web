import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '~/components/Header';
import history from '~/services/history';

jest.mock('react-redux');

describe('Header component', () => {
  it('should be able to go to Home page', () => {
    useSelector.mockImplementation(cd => cd({ cart: [] }));

    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    fireEvent.click(getByTestId('home'));
    expect(history.location.pathname).toBe('/');
  });

  it('should be able to go to Cart page', () => {
    useSelector.mockImplementation(cd => cd({ cart: [] }));

    const { getByTestId } = render(
      <Router history={history}>
        <Header />
      </Router>
    );

    fireEvent.click(getByTestId('cart'));
    expect(history.location.pathname).toBe('/cart');
  });
});
