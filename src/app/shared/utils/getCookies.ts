export const getCookies = () => {
  const mappedCookies = new Map();

  document.cookie.split(';').forEach((_c) => {
    let key = _c.split('=')[0];
    let value = _c.split('=')[1];
    mappedCookies.set(key, value);
  });

  console.log(mappedCookies);
  return mappedCookies;
};
