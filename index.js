// Example for verify mpcrypto result {share_count: 2, threshold: 1}
const ecc = require('eosjs-ecc');

// Get public key from eos format string
var pubkey = ecc.PublicKey.fromStringOrThrow('EOS88RHBHuWDn49WiD49wBzVcVndu2yuEkqjLyapcFxgfTWvz1baX');

// Verify computed signature
var message = 'test_message';
var signature = ecc.Signature.fromStringOrThrow('SIG_K1_KcGXnHzt86YyHtfsHJiZv7tbepGyvZfLLQLFj3ZxDNQzZmXuJqnggMWKhKvF9PMdDavBs4EmbKTFK4LpNbUamYJ4iQywWz');
console.log('Signature  String : ', signature.toString());
console.log('Signature  Verify : ', ecc.verify(signature, message, pubkey));
