// Example for verify mpcrypto result {share_count: 2, threshold: 1}
const ecc = require('eosjs-ecc');

// Get public key from eos format string
var pubkey = ecc.PublicKey.fromStringOrThrow('EOS7pU1r3AVJwuyyLDcFhZCMJa1V1JWn5LgWp6zJYkGzLScNLsaNR');
console.log('PublicKey:', pubkey.toString());

// Verify computed signature
var message = 'test_message';
console.log('Message  :', message);

var signature = ecc.Signature.fromStringOrThrow('SIG_K1_L2SBxTLa3pi2ckcjGbZ7Yo7r9SrDX46SWJKTLtNV4SkBC8CiamjKZmif18Ys936EQ2sQQPtxagKyDb4wUv7wxscsKcgy9h');
console.log('Signature:', signature.toString());
console.log('verify is', ecc.verify(signature, message, pubkey));
