import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    background-color: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    padding: 20px;

    > strong {
      color: #333;
      font-size: 16px;
      line-height: 20px;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0px 20px;
    }
  }

  img {
    align-self: center;
    max-width: 250px;
  }

  button {
    align-items: center;
    background-color: #7159c1;
    border: 0px;
    border-radius: 4px;
    color: #fff;
    display: flex;
    margin-top: auto;
    overflow: hidden;
    transition: background 0.2s;

    &:hover {
      background-color: ${darken(0.03, '#7159C1')};
    }

    div {
      align-items: center;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      padding: 12px;

      svg {
        margin-right: 5px;
      }
    }

    span {
      flex: 1;
      text-align: center;
      font-weight: bold;
    }
  }
`;
