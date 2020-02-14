import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import api from '~/services/api';
import { formatPrice } from '~/util/format';
import { addToCartRequest } from '~/store/modules/cart/actions';

export default () => {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sum, product) => {
      sum[product.id] = product.amount;
      return sum;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
    })();
  }, []);

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id} data-testid={`product_${product.id}`}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span data-testid={`product_price_${product.id}`}>
            {product.priceFormatted}
          </span>

          <button
            data-testid={`product_add_${product.id}`}
            type="button"
            onClick={() => dispatch(addToCartRequest(product.id))}
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />{' '}
              {amount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};
