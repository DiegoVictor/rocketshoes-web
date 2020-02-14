import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 50px 0px;
`;

export const Cart = styled(Link)`
  align-items: center;
  display: flex;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      color: #fff;
      display: block;
    }

    span {
      color: #999;
      font-size: 12px;
    }
  }
`;
