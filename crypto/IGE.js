"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGE = void 0;
const buffer_1 = require("buffer/");
const Helpers = require("../Helpers");
const { IGE: aes_ige } = require("@cryptography/aes");
class IGENEW {
    constructor(key, iv) {
        this.ige = new aes_ige(key, iv);
    }
    /**
     * Decrypts the given text in 16-bytes blocks by using the given key and 32-bytes initialization vector
     * @param cipherText {Buffer}
     * @returns {Buffer}
     */
    decryptIge(cipherText) {
        return Helpers.convertToLittle(this.ige.decrypt(cipherText));
    }
    /**
     * Encrypts the given text in 16-bytes blocks by using the given key and 32-bytes initialization vector
     * @param plainText {Buffer}
     * @returns {Buffer}
     */
    encryptIge(plainText) {
        const padding = plainText.length % 16;
        if (padding) {
            plainText = buffer_1.Buffer.concat([
                plainText,
                Helpers.generateRandomBytes(16 - padding),
            ]);
        }
        return Helpers.convertToLittle(this.ige.encrypt(plainText));
    }
}
exports.IGE = IGENEW;
