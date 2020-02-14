import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';
import { render, act, fireEvent } from '@testing-library/react';

import api from '~/services/api';
import Home from '~/components/pages/Home';
import { addToCartRequest } from '~/store/modules/cart/actions';

jest.mock('react-redux');

const api_mock = new MockAdapter(api);
const price = faker.random.number(100);
const product = {
  id: faker.random.number(),
  title: faker.name.title(),
  image: faker.image.imageUrl(),
  amount: faker.random.number({ min: 2, max: 5 }),
  price,
  priceFormatted: `R$ ${price}.00`,
};

api_mock.onGet('products').reply(200, [product]);

describe('Home page', () => {
  it('should be able to see an item in the dashboard', async () => {
    let getByTestId;
    let getByAltText;
    let getByText;

    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation(cb =>
      cb({
        cart: [product],
      })
    );

    await act(async () => {
      const component = render(<Home />);

      getByTestId = component.getByTestId;
      getByAltText = component.getByAltText;
      getByText = component.getByText;
    });

    expect(getByTestId(`product_${product.id}`)).toBeInTheDocument();
    expect(getByAltText(product.title)).toHaveAttribute('src', product.image);
    expect(getByText(product.title)).toBeInTheDocument();
    expect(getByTestId(`product_price_${product.id}`)).toHaveTextContent(
      product.priceFormatted
    );
  });

  it('should be able to add item to cart', async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(cb =>
      cb({
        cart: [],
      })
    );

    let getByTestId;
    await act(async () => {
      const component = render(<Home />);
      getByTestId = component.getByTestId;
    });

    fireEvent.click(getByTestId(`product_add_${product.id}`));
    expect(dispatch).toHaveBeenCalledWith(addToCartRequest(product.id));
  });
});
