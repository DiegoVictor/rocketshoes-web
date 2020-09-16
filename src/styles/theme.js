import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import background from '~/assets/images/background.svg';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0px;
    outline: 0px;
    padding: 0px;
  }

  body {
    background-color: #191920;
    background-image: url(${background});
    background-position: center top;
    background-repeat: no-repeat;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    margin: 0px auto;
    max-width: 1020px;
    padding: 0px 20px 50px;
  }

  button {
    cursor: pointer;
  }
`;
