
const {algorithm} = require('../..');
const assert = require('assert');

describe('rijndael-192', () => {

    it('should be constructor', () => {
        assert(typeof algorithm.Rijndael192 === 'function', 'there is no constructor');
    });


    const key = new Buffer(32);

    for (let i = 0; i < 32; i++) {
        key[i] = ((i * 2 + 10) % 256);
    }

    // ciphertext & plaintext from mcrypt test rule
    const ciphertext = new Buffer('380ee49a5de1dbd4b9cc11af60b8c8ff669e367af8948a8a', 'hex');
    const plaintext  = new Buffer('000102030405060708090a0b0c0d0e0f1011121314151617', 'hex');


    it('should do encrypt and decrypt operations', () => {

        describe('encrypt', () => {
            const rijndael = new algorithm.Rijndael192();
            rijndael.setKey(key);

            assert(ciphertext.equals(rijndael.encrypt(plaintext)), 'encrypted plaintext should be equal to ciphertext');
        });

        describe('decrypt', () => {
            const rijndael = new algorithm.Rijndael192();
            rijndael.setKey(key);

            assert(plaintext.equals(rijndael.decrypt(ciphertext)), 'decrypted ciphertext should be equal to plaintext');
        });

    });


});

