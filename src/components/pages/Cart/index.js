import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import {
  updateAmountRequest,
  removeFromCart,
} from '~/store/modules/cart/actions';
import { formatPrice } from '~/util/format';
import { Container, ProductTable, Total } from './styles';

export default () => {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce(
        (sum, product) => sum + product.price * product.amount,
        0
      )
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();
  const increment = product => {
    dispatch(updateAmountRequest(product.id, product.amount + 1));
  };

  const decrement = product => {
    dispatch(updateAmountRequest(product.id, product.amount - 1));
  };

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id} data-testid={`item_${product.id}`}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      data-testid={`item_decrement_${product.id}`}
                      size={20}
                      color="#7159C1"
                      onClick={() => decrement(product)}
                    />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline
                      data-testid={`item_increment_${product.id}`}
                      size={20}
                      color="#7159C1"
                      onClick={() => increment(product)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong data-testid={`item_subtotal_${product.id}`}>
                  {product.subtotal}
                </strong>
              </td>
              <td>
                <button
                  data-testid={`item_delete_${product.id}`}
                  type="button"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  <MdDelete size={20} color="#7159C1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar Pedido</button>
        <Total>
          <span>TOTAL</span>
          <strong data-testid="total">{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};
