const argon2 = require('argon2');

(async () => {
  const hash = await argon2.hash('password');

  console.log(hash);

  console.log(await argon2.verify(hash, 'password'));
})();
