// Example for verify mpcrypto result {share_count: 2, threshold: 1}
const ecc = require('eosjs-ecc');
const ecurve = require('ecurve');
const BigInteger = require('bigi');
const assert = require('assert');

// Compute public key from key.shared_key.y: Secp256k1Point(x,y)
var ecparams = ecurve.getCurveByName('secp256k1');
var y_x_bn = BigInteger.fromHex("1c945a257a25fc2f9741ffda82e724a61bf78e1620832986ded3fb3553e8eb8d");
var y_y_bn = BigInteger.fromHex("8802e156086c1b58518a49b98bcab93eadd2412263d527db8e696af4b71ae0ac");
var ecpoint = ecurve.Point.fromAffine(ecparams, y_x_bn, y_y_bn);
var pubhash = ecpoint.getEncoded(true);
var pubkey = ecc.PublicKey.fromBuffer(pubhash);
if(ecc.isValidPublic(pubkey) === true)
    console.log("PublicKey  String:", pubkey.toString());
    
// Compute private key from {key1, key2}.party_key.u_i: Secp256k1Scalar
var u_1 = BigInteger.fromHex("23eff52d10cb9533fbad339a1c1281570b88e424bcb938886ac17838ce7b4ad4");
var u_2 = BigInteger.fromHex("6963f1098c8b16e02fb75b58f2d1da2dd51639e8ca495d236caaa4d2c36d0115");
var x = u_1.add(u_2);
var privkey = ecc.PrivateKey.fromBuffer(x.toBuffer());
if(ecc.isValidPrivate(privkey) === true)
    console.log("PrivateKey String:", privkey.toString());

// Verify computed key pair
var curvePt = ecparams.G.multiply(x);
var pubhash2 = curvePt.getEncoded(true);
var pubkey2 = ecc.PublicKey.fromBuffer(pubhash2);
assert.equal(pubkey.toString(), pubkey2.toString(), "key pair not valid!");

// Verify computed signature
var message = 'test_message';
var signature = ecc.Signature.fromStringOrThrow('SIG_K1_Kn4FmQHmDwRnd1hdjUvBgqzGDGxUeab3V4U3xsdB4Fw3B5RmafJvo557pvFrDGQNEd8it9mMgokunBCf6HBoM93tMGrCLB');
console.log('Signature  String : ', signature.toString());
console.log('Signature  Verify : ', ecc.verify(signature, message, pubkey));