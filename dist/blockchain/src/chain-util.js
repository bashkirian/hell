"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EC = require("elliptic").ec;
const crypto = require("crypto-js");
const ec = new EC('secp256k1');
class ChainUtil {
    static genKeyPair() {
        return ec.genKeyPair();
    }
    static genHash(data) {
        return crypto.SHA256(JSON.stringify(data)).toString();
    }
    static verifySignature(publicKey, signature, expectedDataHash) {
        try {
            return ec.keyFromPublic(publicKey, 'hex').verify(expectedDataHash, signature);
        }
        catch (Error) {
            console.log("signature verification error for public key: " + publicKey + "; error message: " + Error.message);
            return false;
        }
    }
}
exports.default = ChainUtil;
//# sourceMappingURL=chain-util.js.map