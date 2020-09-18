import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from 'react-router-dom';

import factory from '../../utils/factory';
import Cart from '~/pages/Cart';
import {
  removeFromCart,
  updateAmountRequest,
} from '~/store/modules/cart/actions';
import history from '~/services/history';

jest.mock('react-redux');
jest.mock('~/util/format', () => {
  return {
    formatPrice: value => `R$ ${value.toFixed(2)}`,
  };
});

describe('Cart page', () => {
  it('should be able to see an item on the cart', async () => {
    const product = await factory.attrs('Product');
    product.priceFormatted = `R$ ${product.price.toFixed(2)}`;

    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );
    const { getByTestId, getByAltText, getByText } = render(
      <Router history={history}>
        <Cart />
      </Router>,
    );

    expect(getByTestId(`item_${product.id}`)).toBeInTheDocument();
    expect(getByAltText(product.title)).toHaveAttribute('src', product.image);
    expect(getByText(product.title)).toBeInTheDocument();
    expect(getByText(product.priceFormatted)).toBeInTheDocument();
    expect(getByTestId(`item_subtotal_${product.id}`)).toHaveTextContent(
      `R$ ${Number(product.price * product.amount).toFixed(2)}`,
    );
    expect(getByTestId('total')).toHaveTextContent(
      `R$ ${Number(product.price * product.amount).toFixed(2)}`,
    );
  });

  it('should be able to remove an item from the cart', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product');
    product.priceFormatted = `R$ ${product.price.toFixed(2)}`;

    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );
    const { getByTestId } = render(
      <Router history={history}>
        <Cart />
      </Router>,
    );

    fireEvent.click(getByTestId(`item_delete_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(removeFromCart(product.id));
  });

  it('should be able to increase item amount', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product');
    product.priceFormatted = `R$ ${product.price.toFixed(2)}`;

    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );
    const { getByTestId } = render(
      <Router history={history}>
        <Cart />
      </Router>,
    );

    fireEvent.click(getByTestId(`item_increment_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(
      updateAmountRequest(product.id, product.amount + 1),
    );
  });

  it('should be able to decrease item amount', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product');
    product.priceFormatted = `R$ ${product.price.toFixed(2)}`;

    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      }),
    );
    const { getByTestId } = render(
      <Router history={history}>
        <Cart />
      </Router>,
    );

    fireEvent.click(getByTestId(`item_decrement_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(
      updateAmountRequest(product.id, product.amount - 1),
    );
  });
});
