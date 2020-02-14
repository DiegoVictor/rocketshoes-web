import { runSaga } from 'redux-saga';
import { toast } from 'react-toastify';
import { call, select, put } from 'redux-saga/effects';
import faker from 'faker';

import { updateAmount, addToCart } from '~/store/modules/cart/sagas';
import {
  updateAmountRequest,
  updateAmountSuccess,
  addToCartRequest,
  addToCartSuccess,
} from '~/store/modules/cart/actions';
import history from '~/services/history';

jest.mock('react-toastify');
jest.mock('redux-saga/effects');

describe('Cart saga', () => {
  it('should be able update item amount', async () => {
    const dispatch = jest.fn();
    const product = {
      id: faker.random.number(),
      amount: faker.random.number(),
    };
    const amount = faker.random.number({ min: 1, max: product.amount });

    call.mockImplementation(() => ({ data: product }));

    await runSaga(
      { dispatch },
      updateAmount,
      updateAmountRequest(product.id, amount)
    ).toPromise();

    expect(put).toHaveBeenCalledWith(updateAmountSuccess(product.id, amount));
  });

  it('should not be able update item amount', async () => {
    const dispatch = jest.fn();
    toast.error = jest.fn();

    const product = {
      id: faker.random.number(),
      amount: faker.random.number({ min: 1, max: 5 }),
    };
    const amount = faker.random.number({ min: 6 });

    call.mockImplementation(() => ({ data: product }));

    await runSaga(
      { dispatch },
      updateAmount,
      updateAmountRequest(product.id, amount)
    ).toPromise();

    expect(toast.error).toHaveBeenCalledWith(
      'Quantidade solicitada fora do estoque'
    );
  });

  it('should be able to add item to cart', async () => {
    const dispatch = jest.fn();
    const stock = {
      id: faker.random.number(),
      amount: faker.random.number({ min: 5 }),
    };
    const product = {
      id: faker.random.number(),
      price: faker.finance.amount(),
    };

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
      addToCartRequest(product.id)
    ).toPromise();

    expect(put).toHaveBeenCalledWith(
      addToCartSuccess({
        ...product,
        amount: 1,
        priceFormatted: `R$\xa0${product.price}`,
      })
    );
    expect(history.push).toHaveBeenCalledWith('/cart');
  });

  it('should be able to increase item amount', async () => {
    const dispatch = jest.fn();
    const stock = {
      id: faker.random.number(),
      amount: faker.random.number({ min: 5 }),
    };
    const product = {
      id: faker.random.number(),
      amount: faker.random.number({ min: 1, max: stock.amount - 1 }),
    };

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
      addToCartRequest(product.id)
    ).toPromise();

    expect(put).toHaveBeenCalledWith(
      updateAmountSuccess(product.id, product.amount + 1)
    );
  });

  it('should not be able to increase item amount', async () => {
    const dispatch = jest.fn();
    const stock = {
      id: faker.random.number(),
      amount: faker.random.number({ max: 5 }),
    };
    const product = {
      id: faker.random.number(),
      amount: faker.random.number({ min: 5 }),
    };

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
      addToCartRequest(product.id)
    ).toPromise();

    expect(toast.error).toHaveBeenCalledWith(
      'Quantidade solicitada fora do estoque'
    );
  });
});
