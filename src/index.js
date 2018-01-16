import 'tachyons/css/tachyons.css';
import 'normalize-css';
import './scss/main.scss';

import { deRust } from './utils.js';
import libWasm from './lib.rs';

const result = document.querySelector('.js-result');
const input = document.querySelector('.js-input');

const calcResult = fact => {
  const val = parseInt(input.value);
  const r = fact(val);
  result.textContent = `fact(${val}) = ${r}`;
};

deRust(libWasm).then(lib => {
  console.log(lib.addOne(22));
  calcResult(lib.fact);

  // input.onchange = () => calcResult(lib.fact);
  input.addEventListener('keyup', () => calcResult(lib.fact));
});
