import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import faker from 'faker';

import Cart from '~/components/pages/Cart';
import {
  removeFromCart,
  updateAmountRequest,
} from '~/store/modules/cart/actions';

jest.mock('react-redux');

const price = faker.random.number(100);
const product = {
  id: faker.random.number(),
  title: faker.name.title(),
  image: faker.image.imageUrl(),
  amount: faker.random.number({ min: 2, max: 5 }),
  price,
  priceFormatted: `R$ ${price}.00`,
};

describe('Cart page', () => {
  it('should be able to see an item on the cart', () => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      })
    );
    const { getByTestId, getByAltText, getByText } = render(<Cart />);

    expect(getByTestId(`item_${product.id}`)).toBeInTheDocument();
    expect(getByAltText(product.title)).toHaveAttribute('src', product.image);
    expect(getByText(product.title)).toBeInTheDocument();
    expect(getByText(product.priceFormatted)).toBeInTheDocument();
    expect(getByTestId(`item_subtotal_${product.id}`)).toHaveTextContent(
      `R$ ${product.price * product.amount}.00`
    );
    expect(getByTestId('total')).toHaveTextContent(
      `R$ ${product.price * product.amount}.00`
    );
  });

  it('should be able to remove an item from the cart', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      })
    );
    const { getByTestId } = render(<Cart />);

    fireEvent.click(getByTestId(`item_delete_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(removeFromCart(product.id));
  });

  it('should be able to increase item amount', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      })
    );
    const { getByTestId } = render(<Cart />);

    fireEvent.click(getByTestId(`item_increment_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(
      updateAmountRequest(product.id, product.amount + 1)
    );
  });

  it('should be able to decrease item amount', () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      })
    );
    const { getByTestId } = render(<Cart />);

    fireEvent.click(getByTestId(`item_decrement_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(
      updateAmountRequest(product.id, product.amount - 1)
    );
  });
});
