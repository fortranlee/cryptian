
const {algorithm} = require('../..');
const assert = require('assert');

describe('gost', () => {

    it('should be constructor', () => {
        assert(typeof algorithm.Gost === 'function', 'there is no constructor');
    });


    const key = new Buffer(32);

    for (let i = 0; i < 32; i++) {
        key[i] = ((i * 2 + 10) % 256);
    }

    // ciphertext & plaintext from mcrypt test rule
    const ciphertext = new Buffer('e498cf78cdf1d4a5', 'hex');
    const plaintext  = new Buffer('0001020304050607', 'hex');


    it('should do encrypt and decrypt operations', () => {

        describe('encrypt', () => {
            const gost = new algorithm.Gost();
            gost.setKey(key);

            assert(ciphertext.equals(gost.encrypt(plaintext)), 'encrypted plaintext should be equal to ciphertext');
        });

        describe('decrypt', () => {
            const gost = new algorithm.Gost();
            gost.setKey(key);

            assert(plaintext.equals(gost.decrypt(ciphertext)), 'decrypted ciphertext should be equal to plaintext');
        });

    });


});