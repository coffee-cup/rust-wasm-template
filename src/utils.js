const snakeToCamelString = s =>
  s.replace(/[-_\s]+(.)?/g, (m, c) => (c ? c.toUpperCase() : ''));

const snakeToCamelObject = o => {
  const keys = Object.keys(o);
  const newObj = {};
  keys.forEach(k => (newObj[snakeToCamelString(k)] = o[k]));
  return newObj;
};

export const deRust = mod =>
  mod().then(result => {
    console.log(result);
    return snakeToCamelObject(result.instance.exports);
  });
