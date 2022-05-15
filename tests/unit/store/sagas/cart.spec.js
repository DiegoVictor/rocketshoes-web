import { runSaga } from 'redux-saga';
import { toast } from 'react-toastify';
import { call, select, put } from 'redux-saga/effects';
import faker from '@faker-js/faker';

import { updateAmount, addToCart } from '~/store/modules/cart/sagas';
import {
  updateAmountRequest,
  updateAmountSuccess,
  addToCartRequest,
  addToCartSuccess,
} from '~/store/modules/cart/actions';
import history from '~/services/history';
import factory from '../../../utils/factory';

jest.mock('react-toastify');
jest.mock('redux-saga/effects');
jest.mock('~/util/format', () => {
  return {
    formatPrice: value => `R$ ${value.toFixed(2)}`,
  };
});

describe('Cart saga', () => {
  it('should be able update item amount', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product', {
      amount: faker.datatype.number({ min: 1 }),
    });
    const amount = faker.datatype.number({ min: 1, max: product.amount });

    call.mockImplementation(() => ({ data: product }));

    await runSaga(
      { dispatch },
      updateAmount,
      updateAmountRequest(product.id, amount),
    ).toPromise();

    expect(put).toHaveBeenCalledWith(updateAmountSuccess(product.id, amount));
  });

  it('should not be able update item amount with an invalid amount', async () => {
    const dispatch = jest.fn();
    const product = await factory.attrs('Product');
    const amount = -1;

    put.mockClear();

    call.mockImplementation(() => ({ data: product }));

    await runSaga(
      { dispatch },
      updateAmount,
      updateAmountRequest(product.id, amount),
    ).toPromise();

    expect(put).not.toHaveBeenCalled();
  });

  it('should not be able update item amount', async () => {
    const dispatch = jest.fn();
    toast.error = jest.fn();

    const product = await factory.attrs('Product');
    const amount = faker.datatype.number({ min: product.amount });

    call.mockImplementation(() => ({ data: product }));

    await runSaga(
      { dispatch },
      updateAmount,
      updateAmountRequest(product.id, amount),
    ).toPromise();

    expect(toast.error).toHaveBeenCalledWith(
      'Quantidade solicitada fora do estoque',
    );
  });

  it('should be able to add item to cart', async () => {
    const dispatch = jest.fn();

    const stock = await factory.attrs('Product');
    const product = await factory.attrs('Product');

    select.mockImplementation(cb => cb({ cart: [] }));
    call.mockImplementation((cb, uri) => {
      if (uri === `/stock/${product.id}`) {
        return { data: stock };
      }
      return { data: product };
    });
    history.push = jest.fn();

    await runSaga(
      { dispatch },
      addToCart,
      addToCartRequest(product.id),
    ).toPromise();

    expect(put).toHaveBeenCalledWith(
      addToCartSuccess({
        ...product,
        amount: 1,
        priceFormatted: `R$ ${product.price.toFixed(2)}`,
      }),
    );
    expect(history.push).toHaveBeenCalledWith('/cart');
  });

  it('should be able to increase item amount', async () => {
    const dispatch = jest.fn();
    const stock = await factory.attrs('Product', {
      amount: faker.datatype.number({ min: 5 }),
    });
    const product = await factory.attrs('Product', {
      amount: faker.datatype.number({ min: 1, max: stock.amount - 1 }),
    });

    select.mockImplementation(cb => cb({ cart: [product] }));
    call.mockImplementation((cb, uri) => {
      if (uri === `/stock/${product.id}`) {
        return { data: stock };
      }
      return { data: product };
    });

    await runSaga(
      { dispatch },
      addToCart,
      addToCartRequest(product.id),
    ).toPromise();

    expect(put).toHaveBeenCalledWith(
      updateAmountSuccess(product.id, product.amount + 1),
    );
  });

  it('should not be able to increase item amount', async () => {
    const dispatch = jest.fn();
    const stock = await factory.attrs('Product');
    const product = await factory.attrs('Product', {
      amount: faker.datatype.number({ min: stock.amount }),
    });

    select.mockImplementation(cb => cb({ cart: [product] }));
    call.mockImplementation((_, uri) => {
      if (uri === `/stock/${product.id}`) {
        return { data: stock };
      }
      return { data: product };
    });

    await runSaga(
      { dispatch },
      addToCart,
      addToCartRequest(product.id),
    ).toPromise();

    expect(toast.error).toHaveBeenCalledWith(
      'Quantidade solicitada fora do estoque',
    );
  });
});
