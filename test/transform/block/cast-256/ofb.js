
const {algorithm, mode, padding,
    createEncryptStream, 
    createDecryptStream} = require('../../../..');


const assert = require('assert');

const streamBuffers = require('stream-buffers');

describe('cast-256 transform ofb mode', () => {

    it('should be constructor', () => {
        assert(typeof algorithm.Blowfish === 'function', 'there is no constructor');
    });

    const key = Buffer.alloc(32, 0);

    for (let i = 0; i < 32; i++) {
        key[i] = ((i * 2 + 10) % 256);
    }

    const plaintext = Buffer.from(
        'b7d6470527827ad9583838e8c7df850b33dbbb29685fb0e82c' +
        '1825b823e288d5d43e675c47896ee6ad08ac094a496363e5b4', 'hex');

    const iv = Buffer.from('55ab7ff714399f6d817076634f79af4f', 'hex');



    const ciphertext = Buffer.from(
        '31593ba504ddeb43d230fa0c92ece6381fe1c4378a193be70d' +
        '3442306ab7be921f4fbb23ed355b706142cc3d0683c9a575f4', 'hex');

    it('should encrypt', () => {
    
        const cast256 = new algorithm.Cast256();
        cast256.setKey(key);

        const cipher = new mode.ofb.Cipher(cast256, iv);

        const transform = createEncryptStream(cipher);
        const buffer = transform.pipe(new streamBuffers.WritableStreamBuffer());

        buffer.on('finish', () => {
            assert(ciphertext.equals(buffer.getContents()), 'encrypted plaintext should be equal to ciphertext');
        });

        transform.write(plaintext.slice(0, 22));
        transform.write(plaintext.slice(22, 39));
        transform.end(plaintext.slice(39));
        
    });

    it('should decrypt', () => {

        const cast256 = new algorithm.Cast256();
        cast256.setKey(key);
        
        const decipher = new mode.ofb.Decipher(cast256, iv);

        const transform = createDecryptStream(decipher);
        const buffer = transform.pipe(new streamBuffers.WritableStreamBuffer());

        buffer.on('finish', () => {
            assert(plaintext.equals(buffer.getContents()), 'decrypted ciphertext should be equal to plaintext');
        });

        transform.write(ciphertext.slice(0, 27));
        transform.write(ciphertext.slice(27, 42));
        transform.end(ciphertext.slice(42));
        
    });

    

});
