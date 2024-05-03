const crypto = require('crypto');

const prime_length = 2048;
const diffHell = crypto.createDiffieHellman(prime_length);


diffHell.generateKeys('base64');
const publicKey = diffHell.getPublicKey('base64');
const privateKey = diffHell.getPrivateKey('base64');

module.exports = { publicKey, privateKey};