import faker from 'faker';

import reducer, { initial_state } from '~/store/modules/cart/reducer';
import {
  addToCartSuccess,
  removeFromCart,
  updateAmountSuccess,
} from '~/store/modules/cart/actions';
import factory from '../../../utils/factory';

describe('Cart reducer', () => {
  it('DEFAULT', () => {
    const state = reducer(undefined, {});
    expect(state).toBe(initial_state);
  });

  it('ADD_SUCCESS', async () => {
    const product = await factory.attrs('Product');
    const state = reducer(initial_state, addToCartSuccess(product));
    expect(state).toContainEqual(product);
  });

  it('REMOVE', async () => {
    const product = await factory.attrs('Product');
    const state = reducer(
      [product],
      removeFromCart(faker.random.number({ min: product.id + 1 })),
    );
    expect(state).toHaveLength(1);
  });

  it('REMOVE', async () => {
    const product = await factory.attrs('Product');
    const state = reducer([product], removeFromCart(product.id));
    expect(state).toHaveLength(0);
  });

  it('UPDATE_AMOUNT_SUCCESS', async () => {
    const product = await factory.attrs('Product');
    const amount = faker.random.number({ min: product.amount });

    const state = reducer(
      [product],
      updateAmountSuccess(faker.random.number({ min: product.id + 1 }), amount),
    );
    expect(state).toContainEqual(product);
  });

  it('UPDATE_AMOUNT_SUCCESS', async () => {
    const product = await factory.attrs('Product');
    const amount = faker.random.number({ min: product.amount });

    const state = reducer([product], updateAmountSuccess(product.id, amount));
    expect(state).toContainEqual({
      ...product,
      amount,
    });
  });
});
