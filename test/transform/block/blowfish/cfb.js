
const {algorithm, mode, padding,
    createEncryptStream, 
    createDecryptStream} = require('../../../..');


const assert = require('assert');

const streamBuffers = require('stream-buffers');

describe('blowfish transform cfb mode', () => {

    it('should be constructor', () => {
        assert(typeof algorithm.Blowfish === 'function', 'there is no constructor');
    });

    const key = new Buffer(56);

    for (let i = 0; i < 56; i++) {
        key[i] = ((i * 2 + 10) % 256);
    }

    const plaintext = new Buffer(
        '73526a3a25144be838f3b74c43f3a3c472ed725ebd7b6aaf0c' +
        '3d57ef0f9461ac7beff350d7b62073ac801a457193001a6474', 'hex');

    const iv = new Buffer('c144b13252edff4d', 'hex');

    describe('standard', () => {

        const ciphertext = new Buffer(
            'c4758e35f5ae53ecdeb440e7f4e32ab3d8f85bb607e60b059c' +
            'b36e415e032a4d17ca5cb80cc34807fe0d19336e9aa06e84c9', 'hex');

        it('should do encrypt and decrypt operations', () => {

            describe('encrypt', () => {
            
                const blowfish = new algorithm.Blowfish();
                blowfish.setKey(key);

                const cipher = new mode.cfb.Cipher(blowfish, iv);

                const transform = createEncryptStream(cipher);
                const buffer = transform.pipe(new streamBuffers.WritableStreamBuffer());

                buffer.on('finish', () => {
                    assert(ciphertext.equals(buffer.getContents()), 'encrypted plaintext should be equal to ciphertext');
                });

                transform.write(plaintext.slice(0, 22));
                transform.write(plaintext.slice(22, 39));
                transform.end(plaintext.slice(39));
                
            });

            describe('decrypt', () => {

                const blowfish = new algorithm.Blowfish();
                blowfish.setKey(key);
                
                const decipher = new mode.cfb.Decipher(blowfish, iv);

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
    

    });

    describe('endian compat', () => {
        
        const ciphertext = new Buffer(
            '3b062000c690e5fc50cf8ca68922d3fc65ce947cf062343e5c' +
            '6be1082149288d6c19ed5413ac3791ccea4434296fbed80cd8', 'hex');

        it('should do encrypt and decrypt operations', () => {
            
            describe('encrypt', () => {
            
                const blowfish = new algorithm.Blowfish();
                blowfish.setKey(key);
                blowfish.setEndianCompat(true);
                
                const cipher = new mode.cfb.Cipher(blowfish, iv);

                const transform = createEncryptStream(cipher);
                const buffer = transform.pipe(new streamBuffers.WritableStreamBuffer());

                buffer.on('finish', () => {
                    assert(ciphertext.equals(buffer.getContents()), 'encrypted plaintext should be equal to ciphertext');
                });

                transform.write(plaintext.slice(0, 22));
                transform.write(plaintext.slice(22, 39));
                transform.end(plaintext.slice(39));
                
            });
            
            describe('decrypt', () => {

                const blowfish = new algorithm.Blowfish();
                blowfish.setKey(key);
                blowfish.setEndianCompat(true);
                
                const decipher = new mode.cfb.Decipher(blowfish, iv);

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
        
    });
    

});

