import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import { render, act, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';

import factory from '../../utils/factory';
import api from '~/services/api';
import Home from '~/pages/Home';
import { addToCartRequest } from '~/store/modules/cart/actions';
import history from '~/services/history';

jest.mock('react-redux');

describe('Home page', () => {
  const apiMock = new MockAdapter(api);

  it('should be able to see an item in the dashboard', async () => {
    const product = await factory.attrs('Product');
    product.priceFormatted = `R$ ${product.price.toFixed(2)}`;

    apiMock.onGet('products').reply(200, [product]);

    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );

    let getByTestId;
    let getByAltText;
    let getByText;
    await act(async () => {
      const component = render(
        <Router history={history}>
          <Home />
        </Router>,
      );

      getByTestId = component.getByTestId;
      getByAltText = component.getByAltText;
      getByText = component.getByText;
    });

    expect(getByTestId(`product_${product.id}`)).toBeInTheDocument();
    expect(getByAltText(product.title)).toHaveAttribute('src', product.image);
    expect(getByText(product.title)).toBeInTheDocument();
    expect(getByTestId(`product_price_${product.id}`)).toHaveTextContent(
      product.priceFormatted,
    );
  });

  it('should be able to add item to cart', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product');

    apiMock.onGet('products').reply(200, [product]);

    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [],
      }),
    );

    let getByTestId;
    await act(async () => {
      const component = render(
        <Router history={history}>
          <Home />
        </Router>,
      );
      getByTestId = component.getByTestId;
    });

    fireEvent.click(getByTestId(`product_add_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(addToCartRequest(product.id));
  });
});
