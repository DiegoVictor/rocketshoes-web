import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { useSelector } from 'react-redux';

import Logo from '~/assets/images/Logo.svg';
import { Container, Cart } from './styles';

export default () => {
  const cartSize = useSelector(state => state.cart.length);
  return (
    <Container>
      <Link to="/" data-testid="home">
        <img src={Logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart" data-testid="cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};
