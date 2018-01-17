import 'tachyons/css/tachyons.css';
import 'normalize-css';
import './scss/main.scss';

// import { deRust } from './utils.js';
import { copyCStr } from './utils.js';
import libWasm from './lib.rs';

const result = document.querySelector('.js-result');
const input = document.querySelector('.js-input');

const calcResult = fact => {
  const s = input.value;
  const val = s === '' ? 0 : parseInt(s);
  const r = fact(val);
  result.textContent = `fact(${val}) = ${r}`;
};

window.Module = {};
libWasm().then(lib => {
  console.log(lib.instance.exports['add_one'](22));

  console.log(lib.instance);
  window.Module.memory = lib.instance.exports.memory;
  window.Module.factStr = function(n) {
    let outptr = lib.instance.exports.fact_str(n);
    let result = copyCStr(window.Module, outptr);
    return result;
  };

  calcResult(window.Module.factStr);
  input.addEventListener('keyup', () => calcResult(window.Module.factStr));
});
