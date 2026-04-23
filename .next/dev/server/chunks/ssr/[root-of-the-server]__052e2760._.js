module.exports = [
"[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client-2c3a283f134fdcb6", () => require("@prisma/client-2c3a283f134fdcb6"));

module.exports = mod;
}),
"[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compare",
    ()=>compare,
    "compareSync",
    ()=>compareSync,
    "decodeBase64",
    ()=>decodeBase64,
    "default",
    ()=>__TURBOPACK__default__export__,
    "encodeBase64",
    ()=>encodeBase64,
    "genSalt",
    ()=>genSalt,
    "genSaltSync",
    ()=>genSaltSync,
    "getRounds",
    ()=>getRounds,
    "getSalt",
    ()=>getSalt,
    "hash",
    ()=>hash,
    "hashSync",
    ()=>hashSync,
    "setRandomFallback",
    ()=>setRandomFallback,
    "truncates",
    ()=>truncates
]);
/*
 Copyright (c) 2012 Nevins Bartolomeo <nevins.bartolomeo@gmail.com>
 Copyright (c) 2012 Shane Girish <shaneGirish@gmail.com>
 Copyright (c) 2025 Daniel Wirtz <dcode@dcode.io>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 3. The name of the author may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */ // The Node.js crypto module is used as a fallback for the Web Crypto API. When
// building for the browser, inclusion of the crypto module should be disabled,
// which the package hints at in its package.json for bundlers that support it.
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
/**
 * The random implementation to use as a fallback.
 * @type {?function(number):!Array.<number>}
 * @inner
 */ var randomFallback = null;
/**
 * Generates cryptographically secure random bytes.
 * @function
 * @param {number} len Bytes length
 * @returns {!Array.<number>} Random bytes
 * @throws {Error} If no random implementation is available
 * @inner
 */ function randomBytes(len) {
    // Web Crypto API. Globally available in the browser and in Node.js >=23.
    try {
        return crypto.getRandomValues(new Uint8Array(len));
    } catch  {}
    // Node.js crypto module for non-browser environments.
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(len);
    } catch  {}
    // Custom fallback specified with `setRandomFallback`.
    if (!randomFallback) {
        throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
    }
    return randomFallback(len);
}
function setRandomFallback(random) {
    randomFallback = random;
}
function genSaltSync(rounds, seed_length) {
    rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
    if (typeof rounds !== "number") throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
    if (rounds < 4) rounds = 4;
    else if (rounds > 31) rounds = 31;
    var salt = [];
    salt.push("$2b$");
    if (rounds < 10) salt.push("0");
    salt.push(rounds.toString());
    salt.push("$");
    salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN)); // May throw
    return salt.join("");
}
function genSalt(rounds, seed_length, callback) {
    if (typeof seed_length === "function") callback = seed_length, seed_length = undefined; // Not supported.
    if (typeof rounds === "function") callback = rounds, rounds = undefined;
    if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
    else if (typeof rounds !== "number") throw Error("illegal arguments: " + typeof rounds);
    function _async(callback) {
        nextTick(function() {
            // Pretty thin, but salting is fast enough
            try {
                callback(null, genSaltSync(rounds));
            } catch (err) {
                callback(err);
            }
        });
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
function hashSync(password, salt) {
    if (typeof salt === "undefined") salt = GENSALT_DEFAULT_LOG2_ROUNDS;
    if (typeof salt === "number") salt = genSaltSync(salt);
    if (typeof password !== "string" || typeof salt !== "string") throw Error("Illegal arguments: " + typeof password + ", " + typeof salt);
    return _hash(password, salt);
}
function hash(password, salt, callback, progressCallback) {
    function _async(callback) {
        if (typeof password === "string" && typeof salt === "number") genSalt(salt, function(err, salt) {
            _hash(password, salt, callback, progressCallback);
        });
        else if (typeof password === "string" && typeof salt === "string") _hash(password, salt, callback, progressCallback);
        else nextTick(callback.bind(this, Error("Illegal arguments: " + typeof password + ", " + typeof salt)));
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
/**
 * Compares two strings of the same length in constant time.
 * @param {string} known Must be of the correct length
 * @param {string} unknown Must be the same length as `known`
 * @returns {boolean}
 * @inner
 */ function safeStringCompare(known, unknown) {
    var diff = known.length ^ unknown.length;
    for(var i = 0; i < known.length; ++i){
        diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
    }
    return diff === 0;
}
function compareSync(password, hash) {
    if (typeof password !== "string" || typeof hash !== "string") throw Error("Illegal arguments: " + typeof password + ", " + typeof hash);
    if (hash.length !== 60) return false;
    return safeStringCompare(hashSync(password, hash.substring(0, hash.length - 31)), hash);
}
function compare(password, hashValue, callback, progressCallback) {
    function _async(callback) {
        if (typeof password !== "string" || typeof hashValue !== "string") {
            nextTick(callback.bind(this, Error("Illegal arguments: " + typeof password + ", " + typeof hashValue)));
            return;
        }
        if (hashValue.length !== 60) {
            nextTick(callback.bind(this, null, false));
            return;
        }
        hash(password, hashValue.substring(0, 29), function(err, comp) {
            if (err) callback(err);
            else callback(null, safeStringCompare(comp, hashValue));
        }, progressCallback);
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
function getRounds(hash) {
    if (typeof hash !== "string") throw Error("Illegal arguments: " + typeof hash);
    return parseInt(hash.split("$")[2], 10);
}
function getSalt(hash) {
    if (typeof hash !== "string") throw Error("Illegal arguments: " + typeof hash);
    if (hash.length !== 60) throw Error("Illegal hash length: " + hash.length + " != 60");
    return hash.substring(0, 29);
}
function truncates(password) {
    if (typeof password !== "string") throw Error("Illegal arguments: " + typeof password);
    return utf8Length(password) > 72;
}
/**
 * Continues with the callback after yielding to the event loop.
 * @function
 * @param {function(...[*])} callback Callback to execute
 * @inner
 */ var nextTick = typeof setImmediate === "function" ? setImmediate : typeof scheduler === "object" && typeof scheduler.postTask === "function" ? scheduler.postTask.bind(scheduler) : setTimeout;
/** Calculates the byte length of a string encoded as UTF8. */ function utf8Length(string) {
    var len = 0, c = 0;
    for(var i = 0; i < string.length; ++i){
        c = string.charCodeAt(i);
        if (c < 128) len += 1;
        else if (c < 2048) len += 2;
        else if ((c & 0xfc00) === 0xd800 && (string.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            ++i;
            len += 4;
        } else len += 3;
    }
    return len;
}
/** Converts a string to an array of UTF8 bytes. */ function utf8Array(string) {
    var offset = 0, c1, c2;
    var buffer = new Array(utf8Length(string));
    for(var i = 0, k = string.length; i < k; ++i){
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 0xfc00) === 0xd800 && ((c2 = string.charCodeAt(i + 1)) & 0xfc00) === 0xdc00) {
            c1 = 0x10000 + ((c1 & 0x03ff) << 10) + (c2 & 0x03ff);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        }
    }
    return buffer;
}
// A base64 implementation for the bcrypt algorithm. This is partly non-standard.
/**
 * bcrypt's own non-standard base64 dictionary.
 * @type {!Array.<string>}
 * @const
 * @inner
 **/ var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
/**
 * @type {!Array.<number>}
 * @const
 * @inner
 **/ var BASE64_INDEX = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    -1,
    -1,
    -1,
    -1,
    -1
];
/**
 * Encodes a byte array to base64 with up to len bytes of input.
 * @param {!Array.<number>} b Byte array
 * @param {number} len Maximum input length
 * @returns {string}
 * @inner
 */ function base64_encode(b, len) {
    var off = 0, rs = [], c1, c2;
    if (len <= 0 || len > b.length) throw Error("Illegal len: " + len);
    while(off < len){
        c1 = b[off++] & 0xff;
        rs.push(BASE64_CODE[c1 >> 2 & 0x3f]);
        c1 = (c1 & 0x03) << 4;
        if (off >= len) {
            rs.push(BASE64_CODE[c1 & 0x3f]);
            break;
        }
        c2 = b[off++] & 0xff;
        c1 |= c2 >> 4 & 0x0f;
        rs.push(BASE64_CODE[c1 & 0x3f]);
        c1 = (c2 & 0x0f) << 2;
        if (off >= len) {
            rs.push(BASE64_CODE[c1 & 0x3f]);
            break;
        }
        c2 = b[off++] & 0xff;
        c1 |= c2 >> 6 & 0x03;
        rs.push(BASE64_CODE[c1 & 0x3f]);
        rs.push(BASE64_CODE[c2 & 0x3f]);
    }
    return rs.join("");
}
/**
 * Decodes a base64 encoded string to up to len bytes of output.
 * @param {string} s String to decode
 * @param {number} len Maximum output length
 * @returns {!Array.<number>}
 * @inner
 */ function base64_decode(s, len) {
    var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
    if (len <= 0) throw Error("Illegal len: " + len);
    while(off < slen - 1 && olen < len){
        code = s.charCodeAt(off++);
        c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        code = s.charCodeAt(off++);
        c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        if (c1 == -1 || c2 == -1) break;
        o = c1 << 2 >>> 0;
        o |= (c2 & 0x30) >> 4;
        rs.push(String.fromCharCode(o));
        if (++olen >= len || off >= slen) break;
        code = s.charCodeAt(off++);
        c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        if (c3 == -1) break;
        o = (c2 & 0x0f) << 4 >>> 0;
        o |= (c3 & 0x3c) >> 2;
        rs.push(String.fromCharCode(o));
        if (++olen >= len || off >= slen) break;
        code = s.charCodeAt(off++);
        c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        o = (c3 & 0x03) << 6 >>> 0;
        o |= c4;
        rs.push(String.fromCharCode(o));
        ++olen;
    }
    var res = [];
    for(off = 0; off < olen; off++)res.push(rs[off].charCodeAt(0));
    return res;
}
/**
 * @type {number}
 * @const
 * @inner
 */ var BCRYPT_SALT_LEN = 16;
/**
 * @type {number}
 * @const
 * @inner
 */ var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
/**
 * @type {number}
 * @const
 * @inner
 */ var BLOWFISH_NUM_ROUNDS = 16;
/**
 * @type {number}
 * @const
 * @inner
 */ var MAX_EXECUTION_TIME = 100;
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var P_ORIG = [
    0x243f6a88,
    0x85a308d3,
    0x13198a2e,
    0x03707344,
    0xa4093822,
    0x299f31d0,
    0x082efa98,
    0xec4e6c89,
    0x452821e6,
    0x38d01377,
    0xbe5466cf,
    0x34e90c6c,
    0xc0ac29b7,
    0xc97c50dd,
    0x3f84d5b5,
    0xb5470917,
    0x9216d5d9,
    0x8979fb1b
];
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var S_ORIG = [
    0xd1310ba6,
    0x98dfb5ac,
    0x2ffd72db,
    0xd01adfb7,
    0xb8e1afed,
    0x6a267e96,
    0xba7c9045,
    0xf12c7f99,
    0x24a19947,
    0xb3916cf7,
    0x0801f2e2,
    0x858efc16,
    0x636920d8,
    0x71574e69,
    0xa458fea3,
    0xf4933d7e,
    0x0d95748f,
    0x728eb658,
    0x718bcd58,
    0x82154aee,
    0x7b54a41d,
    0xc25a59b5,
    0x9c30d539,
    0x2af26013,
    0xc5d1b023,
    0x286085f0,
    0xca417918,
    0xb8db38ef,
    0x8e79dcb0,
    0x603a180e,
    0x6c9e0e8b,
    0xb01e8a3e,
    0xd71577c1,
    0xbd314b27,
    0x78af2fda,
    0x55605c60,
    0xe65525f3,
    0xaa55ab94,
    0x57489862,
    0x63e81440,
    0x55ca396a,
    0x2aab10b6,
    0xb4cc5c34,
    0x1141e8ce,
    0xa15486af,
    0x7c72e993,
    0xb3ee1411,
    0x636fbc2a,
    0x2ba9c55d,
    0x741831f6,
    0xce5c3e16,
    0x9b87931e,
    0xafd6ba33,
    0x6c24cf5c,
    0x7a325381,
    0x28958677,
    0x3b8f4898,
    0x6b4bb9af,
    0xc4bfe81b,
    0x66282193,
    0x61d809cc,
    0xfb21a991,
    0x487cac60,
    0x5dec8032,
    0xef845d5d,
    0xe98575b1,
    0xdc262302,
    0xeb651b88,
    0x23893e81,
    0xd396acc5,
    0x0f6d6ff3,
    0x83f44239,
    0x2e0b4482,
    0xa4842004,
    0x69c8f04a,
    0x9e1f9b5e,
    0x21c66842,
    0xf6e96c9a,
    0x670c9c61,
    0xabd388f0,
    0x6a51a0d2,
    0xd8542f68,
    0x960fa728,
    0xab5133a3,
    0x6eef0b6c,
    0x137a3be4,
    0xba3bf050,
    0x7efb2a98,
    0xa1f1651d,
    0x39af0176,
    0x66ca593e,
    0x82430e88,
    0x8cee8619,
    0x456f9fb4,
    0x7d84a5c3,
    0x3b8b5ebe,
    0xe06f75d8,
    0x85c12073,
    0x401a449f,
    0x56c16aa6,
    0x4ed3aa62,
    0x363f7706,
    0x1bfedf72,
    0x429b023d,
    0x37d0d724,
    0xd00a1248,
    0xdb0fead3,
    0x49f1c09b,
    0x075372c9,
    0x80991b7b,
    0x25d479d8,
    0xf6e8def7,
    0xe3fe501a,
    0xb6794c3b,
    0x976ce0bd,
    0x04c006ba,
    0xc1a94fb6,
    0x409f60c4,
    0x5e5c9ec2,
    0x196a2463,
    0x68fb6faf,
    0x3e6c53b5,
    0x1339b2eb,
    0x3b52ec6f,
    0x6dfc511f,
    0x9b30952c,
    0xcc814544,
    0xaf5ebd09,
    0xbee3d004,
    0xde334afd,
    0x660f2807,
    0x192e4bb3,
    0xc0cba857,
    0x45c8740f,
    0xd20b5f39,
    0xb9d3fbdb,
    0x5579c0bd,
    0x1a60320a,
    0xd6a100c6,
    0x402c7279,
    0x679f25fe,
    0xfb1fa3cc,
    0x8ea5e9f8,
    0xdb3222f8,
    0x3c7516df,
    0xfd616b15,
    0x2f501ec8,
    0xad0552ab,
    0x323db5fa,
    0xfd238760,
    0x53317b48,
    0x3e00df82,
    0x9e5c57bb,
    0xca6f8ca0,
    0x1a87562e,
    0xdf1769db,
    0xd542a8f6,
    0x287effc3,
    0xac6732c6,
    0x8c4f5573,
    0x695b27b0,
    0xbbca58c8,
    0xe1ffa35d,
    0xb8f011a0,
    0x10fa3d98,
    0xfd2183b8,
    0x4afcb56c,
    0x2dd1d35b,
    0x9a53e479,
    0xb6f84565,
    0xd28e49bc,
    0x4bfb9790,
    0xe1ddf2da,
    0xa4cb7e33,
    0x62fb1341,
    0xcee4c6e8,
    0xef20cada,
    0x36774c01,
    0xd07e9efe,
    0x2bf11fb4,
    0x95dbda4d,
    0xae909198,
    0xeaad8e71,
    0x6b93d5a0,
    0xd08ed1d0,
    0xafc725e0,
    0x8e3c5b2f,
    0x8e7594b7,
    0x8ff6e2fb,
    0xf2122b64,
    0x8888b812,
    0x900df01c,
    0x4fad5ea0,
    0x688fc31c,
    0xd1cff191,
    0xb3a8c1ad,
    0x2f2f2218,
    0xbe0e1777,
    0xea752dfe,
    0x8b021fa1,
    0xe5a0cc0f,
    0xb56f74e8,
    0x18acf3d6,
    0xce89e299,
    0xb4a84fe0,
    0xfd13e0b7,
    0x7cc43b81,
    0xd2ada8d9,
    0x165fa266,
    0x80957705,
    0x93cc7314,
    0x211a1477,
    0xe6ad2065,
    0x77b5fa86,
    0xc75442f5,
    0xfb9d35cf,
    0xebcdaf0c,
    0x7b3e89a0,
    0xd6411bd3,
    0xae1e7e49,
    0x00250e2d,
    0x2071b35e,
    0x226800bb,
    0x57b8e0af,
    0x2464369b,
    0xf009b91e,
    0x5563911d,
    0x59dfa6aa,
    0x78c14389,
    0xd95a537f,
    0x207d5ba2,
    0x02e5b9c5,
    0x83260376,
    0x6295cfa9,
    0x11c81968,
    0x4e734a41,
    0xb3472dca,
    0x7b14a94a,
    0x1b510052,
    0x9a532915,
    0xd60f573f,
    0xbc9bc6e4,
    0x2b60a476,
    0x81e67400,
    0x08ba6fb5,
    0x571be91f,
    0xf296ec6b,
    0x2a0dd915,
    0xb6636521,
    0xe7b9f9b6,
    0xff34052e,
    0xc5855664,
    0x53b02d5d,
    0xa99f8fa1,
    0x08ba4799,
    0x6e85076a,
    0x4b7a70e9,
    0xb5b32944,
    0xdb75092e,
    0xc4192623,
    0xad6ea6b0,
    0x49a7df7d,
    0x9cee60b8,
    0x8fedb266,
    0xecaa8c71,
    0x699a17ff,
    0x5664526c,
    0xc2b19ee1,
    0x193602a5,
    0x75094c29,
    0xa0591340,
    0xe4183a3e,
    0x3f54989a,
    0x5b429d65,
    0x6b8fe4d6,
    0x99f73fd6,
    0xa1d29c07,
    0xefe830f5,
    0x4d2d38e6,
    0xf0255dc1,
    0x4cdd2086,
    0x8470eb26,
    0x6382e9c6,
    0x021ecc5e,
    0x09686b3f,
    0x3ebaefc9,
    0x3c971814,
    0x6b6a70a1,
    0x687f3584,
    0x52a0e286,
    0xb79c5305,
    0xaa500737,
    0x3e07841c,
    0x7fdeae5c,
    0x8e7d44ec,
    0x5716f2b8,
    0xb03ada37,
    0xf0500c0d,
    0xf01c1f04,
    0x0200b3ff,
    0xae0cf51a,
    0x3cb574b2,
    0x25837a58,
    0xdc0921bd,
    0xd19113f9,
    0x7ca92ff6,
    0x94324773,
    0x22f54701,
    0x3ae5e581,
    0x37c2dadc,
    0xc8b57634,
    0x9af3dda7,
    0xa9446146,
    0x0fd0030e,
    0xecc8c73e,
    0xa4751e41,
    0xe238cd99,
    0x3bea0e2f,
    0x3280bba1,
    0x183eb331,
    0x4e548b38,
    0x4f6db908,
    0x6f420d03,
    0xf60a04bf,
    0x2cb81290,
    0x24977c79,
    0x5679b072,
    0xbcaf89af,
    0xde9a771f,
    0xd9930810,
    0xb38bae12,
    0xdccf3f2e,
    0x5512721f,
    0x2e6b7124,
    0x501adde6,
    0x9f84cd87,
    0x7a584718,
    0x7408da17,
    0xbc9f9abc,
    0xe94b7d8c,
    0xec7aec3a,
    0xdb851dfa,
    0x63094366,
    0xc464c3d2,
    0xef1c1847,
    0x3215d908,
    0xdd433b37,
    0x24c2ba16,
    0x12a14d43,
    0x2a65c451,
    0x50940002,
    0x133ae4dd,
    0x71dff89e,
    0x10314e55,
    0x81ac77d6,
    0x5f11199b,
    0x043556f1,
    0xd7a3c76b,
    0x3c11183b,
    0x5924a509,
    0xf28fe6ed,
    0x97f1fbfa,
    0x9ebabf2c,
    0x1e153c6e,
    0x86e34570,
    0xeae96fb1,
    0x860e5e0a,
    0x5a3e2ab3,
    0x771fe71c,
    0x4e3d06fa,
    0x2965dcb9,
    0x99e71d0f,
    0x803e89d6,
    0x5266c825,
    0x2e4cc978,
    0x9c10b36a,
    0xc6150eba,
    0x94e2ea78,
    0xa5fc3c53,
    0x1e0a2df4,
    0xf2f74ea7,
    0x361d2b3d,
    0x1939260f,
    0x19c27960,
    0x5223a708,
    0xf71312b6,
    0xebadfe6e,
    0xeac31f66,
    0xe3bc4595,
    0xa67bc883,
    0xb17f37d1,
    0x018cff28,
    0xc332ddef,
    0xbe6c5aa5,
    0x65582185,
    0x68ab9802,
    0xeecea50f,
    0xdb2f953b,
    0x2aef7dad,
    0x5b6e2f84,
    0x1521b628,
    0x29076170,
    0xecdd4775,
    0x619f1510,
    0x13cca830,
    0xeb61bd96,
    0x0334fe1e,
    0xaa0363cf,
    0xb5735c90,
    0x4c70a239,
    0xd59e9e0b,
    0xcbaade14,
    0xeecc86bc,
    0x60622ca7,
    0x9cab5cab,
    0xb2f3846e,
    0x648b1eaf,
    0x19bdf0ca,
    0xa02369b9,
    0x655abb50,
    0x40685a32,
    0x3c2ab4b3,
    0x319ee9d5,
    0xc021b8f7,
    0x9b540b19,
    0x875fa099,
    0x95f7997e,
    0x623d7da8,
    0xf837889a,
    0x97e32d77,
    0x11ed935f,
    0x16681281,
    0x0e358829,
    0xc7e61fd6,
    0x96dedfa1,
    0x7858ba99,
    0x57f584a5,
    0x1b227263,
    0x9b83c3ff,
    0x1ac24696,
    0xcdb30aeb,
    0x532e3054,
    0x8fd948e4,
    0x6dbc3128,
    0x58ebf2ef,
    0x34c6ffea,
    0xfe28ed61,
    0xee7c3c73,
    0x5d4a14d9,
    0xe864b7e3,
    0x42105d14,
    0x203e13e0,
    0x45eee2b6,
    0xa3aaabea,
    0xdb6c4f15,
    0xfacb4fd0,
    0xc742f442,
    0xef6abbb5,
    0x654f3b1d,
    0x41cd2105,
    0xd81e799e,
    0x86854dc7,
    0xe44b476a,
    0x3d816250,
    0xcf62a1f2,
    0x5b8d2646,
    0xfc8883a0,
    0xc1c7b6a3,
    0x7f1524c3,
    0x69cb7492,
    0x47848a0b,
    0x5692b285,
    0x095bbf00,
    0xad19489d,
    0x1462b174,
    0x23820e00,
    0x58428d2a,
    0x0c55f5ea,
    0x1dadf43e,
    0x233f7061,
    0x3372f092,
    0x8d937e41,
    0xd65fecf1,
    0x6c223bdb,
    0x7cde3759,
    0xcbee7460,
    0x4085f2a7,
    0xce77326e,
    0xa6078084,
    0x19f8509e,
    0xe8efd855,
    0x61d99735,
    0xa969a7aa,
    0xc50c06c2,
    0x5a04abfc,
    0x800bcadc,
    0x9e447a2e,
    0xc3453484,
    0xfdd56705,
    0x0e1e9ec9,
    0xdb73dbd3,
    0x105588cd,
    0x675fda79,
    0xe3674340,
    0xc5c43465,
    0x713e38d8,
    0x3d28f89e,
    0xf16dff20,
    0x153e21e7,
    0x8fb03d4a,
    0xe6e39f2b,
    0xdb83adf7,
    0xe93d5a68,
    0x948140f7,
    0xf64c261c,
    0x94692934,
    0x411520f7,
    0x7602d4f7,
    0xbcf46b2e,
    0xd4a20068,
    0xd4082471,
    0x3320f46a,
    0x43b7d4b7,
    0x500061af,
    0x1e39f62e,
    0x97244546,
    0x14214f74,
    0xbf8b8840,
    0x4d95fc1d,
    0x96b591af,
    0x70f4ddd3,
    0x66a02f45,
    0xbfbc09ec,
    0x03bd9785,
    0x7fac6dd0,
    0x31cb8504,
    0x96eb27b3,
    0x55fd3941,
    0xda2547e6,
    0xabca0a9a,
    0x28507825,
    0x530429f4,
    0x0a2c86da,
    0xe9b66dfb,
    0x68dc1462,
    0xd7486900,
    0x680ec0a4,
    0x27a18dee,
    0x4f3ffea2,
    0xe887ad8c,
    0xb58ce006,
    0x7af4d6b6,
    0xaace1e7c,
    0xd3375fec,
    0xce78a399,
    0x406b2a42,
    0x20fe9e35,
    0xd9f385b9,
    0xee39d7ab,
    0x3b124e8b,
    0x1dc9faf7,
    0x4b6d1856,
    0x26a36631,
    0xeae397b2,
    0x3a6efa74,
    0xdd5b4332,
    0x6841e7f7,
    0xca7820fb,
    0xfb0af54e,
    0xd8feb397,
    0x454056ac,
    0xba489527,
    0x55533a3a,
    0x20838d87,
    0xfe6ba9b7,
    0xd096954b,
    0x55a867bc,
    0xa1159a58,
    0xcca92963,
    0x99e1db33,
    0xa62a4a56,
    0x3f3125f9,
    0x5ef47e1c,
    0x9029317c,
    0xfdf8e802,
    0x04272f70,
    0x80bb155c,
    0x05282ce3,
    0x95c11548,
    0xe4c66d22,
    0x48c1133f,
    0xc70f86dc,
    0x07f9c9ee,
    0x41041f0f,
    0x404779a4,
    0x5d886e17,
    0x325f51eb,
    0xd59bc0d1,
    0xf2bcc18f,
    0x41113564,
    0x257b7834,
    0x602a9c60,
    0xdff8e8a3,
    0x1f636c1b,
    0x0e12b4c2,
    0x02e1329e,
    0xaf664fd1,
    0xcad18115,
    0x6b2395e0,
    0x333e92e1,
    0x3b240b62,
    0xeebeb922,
    0x85b2a20e,
    0xe6ba0d99,
    0xde720c8c,
    0x2da2f728,
    0xd0127845,
    0x95b794fd,
    0x647d0862,
    0xe7ccf5f0,
    0x5449a36f,
    0x877d48fa,
    0xc39dfd27,
    0xf33e8d1e,
    0x0a476341,
    0x992eff74,
    0x3a6f6eab,
    0xf4f8fd37,
    0xa812dc60,
    0xa1ebddf8,
    0x991be14c,
    0xdb6e6b0d,
    0xc67b5510,
    0x6d672c37,
    0x2765d43b,
    0xdcd0e804,
    0xf1290dc7,
    0xcc00ffa3,
    0xb5390f92,
    0x690fed0b,
    0x667b9ffb,
    0xcedb7d9c,
    0xa091cf0b,
    0xd9155ea3,
    0xbb132f88,
    0x515bad24,
    0x7b9479bf,
    0x763bd6eb,
    0x37392eb3,
    0xcc115979,
    0x8026e297,
    0xf42e312d,
    0x6842ada7,
    0xc66a2b3b,
    0x12754ccc,
    0x782ef11c,
    0x6a124237,
    0xb79251e7,
    0x06a1bbe6,
    0x4bfb6350,
    0x1a6b1018,
    0x11caedfa,
    0x3d25bdd8,
    0xe2e1c3c9,
    0x44421659,
    0x0a121386,
    0xd90cec6e,
    0xd5abea2a,
    0x64af674e,
    0xda86a85f,
    0xbebfe988,
    0x64e4c3fe,
    0x9dbc8057,
    0xf0f7c086,
    0x60787bf8,
    0x6003604d,
    0xd1fd8346,
    0xf6381fb0,
    0x7745ae04,
    0xd736fccc,
    0x83426b33,
    0xf01eab71,
    0xb0804187,
    0x3c005e5f,
    0x77a057be,
    0xbde8ae24,
    0x55464299,
    0xbf582e61,
    0x4e58f48f,
    0xf2ddfda2,
    0xf474ef38,
    0x8789bdc2,
    0x5366f9c3,
    0xc8b38e74,
    0xb475f255,
    0x46fcd9b9,
    0x7aeb2661,
    0x8b1ddf84,
    0x846a0e79,
    0x915f95e2,
    0x466e598e,
    0x20b45770,
    0x8cd55591,
    0xc902de4c,
    0xb90bace1,
    0xbb8205d0,
    0x11a86248,
    0x7574a99e,
    0xb77f19b6,
    0xe0a9dc09,
    0x662d09a1,
    0xc4324633,
    0xe85a1f02,
    0x09f0be8c,
    0x4a99a025,
    0x1d6efe10,
    0x1ab93d1d,
    0x0ba5a4df,
    0xa186f20f,
    0x2868f169,
    0xdcb7da83,
    0x573906fe,
    0xa1e2ce9b,
    0x4fcd7f52,
    0x50115e01,
    0xa70683fa,
    0xa002b5c4,
    0x0de6d027,
    0x9af88c27,
    0x773f8641,
    0xc3604c06,
    0x61a806b5,
    0xf0177a28,
    0xc0f586e0,
    0x006058aa,
    0x30dc7d62,
    0x11e69ed7,
    0x2338ea63,
    0x53c2dd94,
    0xc2c21634,
    0xbbcbee56,
    0x90bcb6de,
    0xebfc7da1,
    0xce591d76,
    0x6f05e409,
    0x4b7c0188,
    0x39720a3d,
    0x7c927c24,
    0x86e3725f,
    0x724d9db9,
    0x1ac15bb4,
    0xd39eb8fc,
    0xed545578,
    0x08fca5b5,
    0xd83d7cd3,
    0x4dad0fc4,
    0x1e50ef5e,
    0xb161e6f8,
    0xa28514d9,
    0x6c51133c,
    0x6fd5c7e7,
    0x56e14ec4,
    0x362abfce,
    0xddc6c837,
    0xd79a3234,
    0x92638212,
    0x670efa8e,
    0x406000e0,
    0x3a39ce37,
    0xd3faf5cf,
    0xabc27737,
    0x5ac52d1b,
    0x5cb0679e,
    0x4fa33742,
    0xd3822740,
    0x99bc9bbe,
    0xd5118e9d,
    0xbf0f7315,
    0xd62d1c7e,
    0xc700c47b,
    0xb78c1b6b,
    0x21a19045,
    0xb26eb1be,
    0x6a366eb4,
    0x5748ab2f,
    0xbc946e79,
    0xc6a376d2,
    0x6549c2c8,
    0x530ff8ee,
    0x468dde7d,
    0xd5730a1d,
    0x4cd04dc6,
    0x2939bbdb,
    0xa9ba4650,
    0xac9526e8,
    0xbe5ee304,
    0xa1fad5f0,
    0x6a2d519a,
    0x63ef8ce2,
    0x9a86ee22,
    0xc089c2b8,
    0x43242ef6,
    0xa51e03aa,
    0x9cf2d0a4,
    0x83c061ba,
    0x9be96a4d,
    0x8fe51550,
    0xba645bd6,
    0x2826a2f9,
    0xa73a3ae1,
    0x4ba99586,
    0xef5562e9,
    0xc72fefd3,
    0xf752f7da,
    0x3f046f69,
    0x77fa0a59,
    0x80e4a915,
    0x87b08601,
    0x9b09e6ad,
    0x3b3ee593,
    0xe990fd5a,
    0x9e34d797,
    0x2cf0b7d9,
    0x022b8b51,
    0x96d5ac3a,
    0x017da67d,
    0xd1cf3ed6,
    0x7c7d2d28,
    0x1f9f25cf,
    0xadf2b89b,
    0x5ad6b472,
    0x5a88f54c,
    0xe029ac71,
    0xe019a5e6,
    0x47b0acfd,
    0xed93fa9b,
    0xe8d3c48d,
    0x283b57cc,
    0xf8d56629,
    0x79132e28,
    0x785f0191,
    0xed756055,
    0xf7960e44,
    0xe3d35e8c,
    0x15056dd4,
    0x88f46dba,
    0x03a16125,
    0x0564f0bd,
    0xc3eb9e15,
    0x3c9057a2,
    0x97271aec,
    0xa93a072a,
    0x1b3f6d9b,
    0x1e6321f5,
    0xf59c66fb,
    0x26dcf319,
    0x7533d928,
    0xb155fdf5,
    0x03563482,
    0x8aba3cbb,
    0x28517711,
    0xc20ad9f8,
    0xabcc5167,
    0xccad925f,
    0x4de81751,
    0x3830dc8e,
    0x379d5862,
    0x9320f991,
    0xea7a90c2,
    0xfb3e7bce,
    0x5121ce64,
    0x774fbe32,
    0xa8b6e37e,
    0xc3293d46,
    0x48de5369,
    0x6413e680,
    0xa2ae0810,
    0xdd6db224,
    0x69852dfd,
    0x09072166,
    0xb39a460a,
    0x6445c0dd,
    0x586cdecf,
    0x1c20c8ae,
    0x5bbef7dd,
    0x1b588d40,
    0xccd2017f,
    0x6bb4e3bb,
    0xdda26a7e,
    0x3a59ff45,
    0x3e350a44,
    0xbcb4cdd5,
    0x72eacea8,
    0xfa6484bb,
    0x8d6612ae,
    0xbf3c6f47,
    0xd29be463,
    0x542f5d9e,
    0xaec2771b,
    0xf64e6370,
    0x740e0d8d,
    0xe75b1357,
    0xf8721671,
    0xaf537d5d,
    0x4040cb08,
    0x4eb4e2cc,
    0x34d2466a,
    0x0115af84,
    0xe1b00428,
    0x95983a1d,
    0x06b89fb4,
    0xce6ea048,
    0x6f3f3b82,
    0x3520ab82,
    0x011a1d4b,
    0x277227f8,
    0x611560b1,
    0xe7933fdc,
    0xbb3a792b,
    0x344525bd,
    0xa08839e1,
    0x51ce794b,
    0x2f32c9b7,
    0xa01fbac9,
    0xe01cc87e,
    0xbcc7d1f6,
    0xcf0111c3,
    0xa1e8aac7,
    0x1a908749,
    0xd44fbd9a,
    0xd0dadecb,
    0xd50ada38,
    0x0339c32a,
    0xc6913667,
    0x8df9317c,
    0xe0b12b4f,
    0xf79e59b7,
    0x43f5bb3a,
    0xf2d519ff,
    0x27d9459c,
    0xbf97222c,
    0x15e6fc2a,
    0x0f91fc71,
    0x9b941525,
    0xfae59361,
    0xceb69ceb,
    0xc2a86459,
    0x12baa8d1,
    0xb6c1075e,
    0xe3056a0c,
    0x10d25065,
    0xcb03a442,
    0xe0ec6e0e,
    0x1698db3b,
    0x4c98a0be,
    0x3278e964,
    0x9f1f9532,
    0xe0d392df,
    0xd3a0342b,
    0x8971f21e,
    0x1b0a7441,
    0x4ba3348c,
    0xc5be7120,
    0xc37632d8,
    0xdf359f8d,
    0x9b992f2e,
    0xe60b6f47,
    0x0fe3f11d,
    0xe54cda54,
    0x1edad891,
    0xce6279cf,
    0xcd3e7e6f,
    0x1618b166,
    0xfd2c1d05,
    0x848fd2c5,
    0xf6fb2299,
    0xf523f357,
    0xa6327623,
    0x93a83531,
    0x56cccd02,
    0xacf08162,
    0x5a75ebb5,
    0x6e163697,
    0x88d273cc,
    0xde966292,
    0x81b949d0,
    0x4c50901b,
    0x71c65614,
    0xe6c6c7bd,
    0x327a140a,
    0x45e1d006,
    0xc3f27b9a,
    0xc9aa53fd,
    0x62a80f00,
    0xbb25bfe2,
    0x35bdd2f6,
    0x71126905,
    0xb2040222,
    0xb6cbcf7c,
    0xcd769c2b,
    0x53113ec0,
    0x1640e3d3,
    0x38abbd60,
    0x2547adf0,
    0xba38209c,
    0xf746ce76,
    0x77afa1c5,
    0x20756060,
    0x85cbfe4e,
    0x8ae88dd8,
    0x7aaaf9b0,
    0x4cf9aa7e,
    0x1948c25c,
    0x02fb8a8c,
    0x01c36ae4,
    0xd6ebe1f9,
    0x90d4f869,
    0xa65cdea0,
    0x3f09252d,
    0xc208e69f,
    0xb74e6132,
    0xce77e25b,
    0x578fdfe3,
    0x3ac372e6
];
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var C_ORIG = [
    0x4f727068,
    0x65616e42,
    0x65686f6c,
    0x64657253,
    0x63727944,
    0x6f756274
];
/**
 * @param {Array.<number>} lr
 * @param {number} off
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @returns {Array.<number>}
 * @inner
 */ function _encipher(lr, off, P, S) {
    // This is our bottleneck: 1714/1905 ticks / 90% - see profile.txt
    var n, l = lr[off], r = lr[off + 1];
    l ^= P[0];
    /*
    for (var i=0, k=BLOWFISH_NUM_ROUNDS-2; i<=k;)
        // Feistel substitution on left word
        n  = S[l >>> 24],
        n += S[0x100 | ((l >> 16) & 0xff)],
        n ^= S[0x200 | ((l >> 8) & 0xff)],
        n += S[0x300 | (l & 0xff)],
        r ^= n ^ P[++i],
        // Feistel substitution on right word
        n  = S[r >>> 24],
        n += S[0x100 | ((r >> 16) & 0xff)],
        n ^= S[0x200 | ((r >> 8) & 0xff)],
        n += S[0x300 | (r & 0xff)],
        l ^= n ^ P[++i];
    */ //The following is an unrolled version of the above loop.
    //Iteration 0
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[1];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[2];
    //Iteration 1
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[3];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[4];
    //Iteration 2
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[5];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[6];
    //Iteration 3
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[7];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[8];
    //Iteration 4
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[9];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[10];
    //Iteration 5
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[11];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[12];
    //Iteration 6
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[13];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[14];
    //Iteration 7
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[15];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[16];
    lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
    lr[off + 1] = l;
    return lr;
}
/**
 * @param {Array.<number>} data
 * @param {number} offp
 * @returns {{key: number, offp: number}}
 * @inner
 */ function _streamtoword(data, offp) {
    for(var i = 0, word = 0; i < 4; ++i)word = word << 8 | data[offp] & 0xff, offp = (offp + 1) % data.length;
    return {
        key: word,
        offp: offp
    };
}
/**
 * @param {Array.<number>} key
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @inner
 */ function _key(key, P, S) {
    var offset = 0, lr = [
        0,
        0
    ], plen = P.length, slen = S.length, sw;
    for(var i = 0; i < plen; i++)sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
    for(i = 0; i < plen; i += 2)lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
    for(i = 0; i < slen; i += 2)lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
}
/**
 * Expensive key schedule Blowfish.
 * @param {Array.<number>} data
 * @param {Array.<number>} key
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @inner
 */ function _ekskey(data, key, P, S) {
    var offp = 0, lr = [
        0,
        0
    ], plen = P.length, slen = S.length, sw;
    for(var i = 0; i < plen; i++)sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
    offp = 0;
    for(i = 0; i < plen; i += 2)sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
    for(i = 0; i < slen; i += 2)sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
}
/**
 * Internaly crypts a string.
 * @param {Array.<number>} b Bytes to crypt
 * @param {Array.<number>} salt Salt bytes to use
 * @param {number} rounds Number of rounds
 * @param {function(Error, Array.<number>=)=} callback Callback receiving the error, if any, and the resulting bytes. If
 *  omitted, the operation will be performed synchronously.
 *  @param {function(number)=} progressCallback Callback called with the current progress
 * @returns {!Array.<number>|undefined} Resulting bytes if callback has been omitted, otherwise `undefined`
 * @inner
 */ function _crypt(b, salt, rounds, callback, progressCallback) {
    var cdata = C_ORIG.slice(), clen = cdata.length, err;
    // Validate
    if (rounds < 4 || rounds > 31) {
        err = Error("Illegal number of rounds (4-31): " + rounds);
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    if (salt.length !== BCRYPT_SALT_LEN) {
        err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    rounds = 1 << rounds >>> 0;
    var P, S, i = 0, j;
    //Use typed arrays when available - huge speedup!
    if (typeof Int32Array === "function") {
        P = new Int32Array(P_ORIG);
        S = new Int32Array(S_ORIG);
    } else {
        P = P_ORIG.slice();
        S = S_ORIG.slice();
    }
    _ekskey(salt, b, P, S);
    /**
   * Calcualtes the next round.
   * @returns {Array.<number>|undefined} Resulting array if callback has been omitted, otherwise `undefined`
   * @inner
   */ function next() {
        if (progressCallback) progressCallback(i / rounds);
        if (i < rounds) {
            var start = Date.now();
            for(; i < rounds;){
                i = i + 1;
                _key(b, P, S);
                _key(salt, P, S);
                if (Date.now() - start > MAX_EXECUTION_TIME) break;
            }
        } else {
            for(i = 0; i < 64; i++)for(j = 0; j < clen >> 1; j++)_encipher(cdata, j << 1, P, S);
            var ret = [];
            for(i = 0; i < clen; i++)ret.push((cdata[i] >> 24 & 0xff) >>> 0), ret.push((cdata[i] >> 16 & 0xff) >>> 0), ret.push((cdata[i] >> 8 & 0xff) >>> 0), ret.push((cdata[i] & 0xff) >>> 0);
            if (callback) {
                callback(null, ret);
                return;
            } else return ret;
        }
        if (callback) nextTick(next);
    }
    // Async
    if (typeof callback !== "undefined") {
        next();
    // Sync
    } else {
        var res;
        while(true)if (typeof (res = next()) !== "undefined") return res || [];
    }
}
/**
 * Internally hashes a password.
 * @param {string} password Password to hash
 * @param {?string} salt Salt to use, actually never null
 * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash. If omitted,
 *  hashing is performed synchronously.
 *  @param {function(number)=} progressCallback Callback called with the current progress
 * @returns {string|undefined} Resulting hash if callback has been omitted, otherwise `undefined`
 * @inner
 */ function _hash(password, salt, callback, progressCallback) {
    var err;
    if (typeof password !== "string" || typeof salt !== "string") {
        err = Error("Invalid string / salt: Not a string");
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    // Validate the salt
    var minor, offset;
    if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
        err = Error("Invalid salt version: " + salt.substring(0, 2));
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    if (salt.charAt(2) === "$") minor = String.fromCharCode(0), offset = 3;
    else {
        minor = salt.charAt(2);
        if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
            err = Error("Invalid salt revision: " + salt.substring(2, 4));
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else throw err;
        }
        offset = 4;
    }
    // Extract number of rounds
    if (salt.charAt(offset + 2) > "$") {
        err = Error("Missing salt rounds");
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
    password += minor >= "a" ? "\x00" : "";
    var passwordb = utf8Array(password), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
    /**
   * Finishes hashing.
   * @param {Array.<number>} bytes Byte array
   * @returns {string}
   * @inner
   */ function finish(bytes) {
        var res = [];
        res.push("$2");
        if (minor >= "a") res.push(minor);
        res.push("$");
        if (rounds < 10) res.push("0");
        res.push(rounds.toString());
        res.push("$");
        res.push(base64_encode(saltb, saltb.length));
        res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
        return res.join("");
    }
    // Sync
    if (typeof callback == "undefined") return finish(_crypt(passwordb, saltb, rounds));
    else {
        _crypt(passwordb, saltb, rounds, function(err, bytes) {
            if (err) callback(err, null);
            else callback(null, finish(bytes));
        }, progressCallback);
    }
}
function encodeBase64(bytes, length) {
    return base64_encode(bytes, length);
}
function decodeBase64(string, length) {
    return base64_decode(string, length);
}
const __TURBOPACK__default__export__ = {
    setRandomFallback,
    genSaltSync,
    genSalt,
    hashSync,
    hash,
    compareSync,
    compare,
    getRounds,
    getSalt,
    truncates,
    encodeBase64,
    decodeBase64
};
}),
"[project]/node_modules/is-node-process/lib/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isNodeProcess",
    ()=>isNodeProcess
]);
// src/index.ts
function isNodeProcess() {
    if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
        return true;
    }
    if (typeof process !== "undefined") {
        const type = process.type;
        if (type === "renderer" || type === "worker") {
            return false;
        }
        return !!(process.versions && process.versions.node);
    }
    return false;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/is-buffer/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ module.exports = function isBuffer(obj) {
    return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};
}),
"[project]/node_modules/retry/lib/retry_operation.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

function RetryOperation(timeouts, options) {
    // Compatibility for the old (timeouts, retryForever) signature
    if (typeof options === 'boolean') {
        options = {
            forever: options
        };
    }
    this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
    this._timeouts = timeouts;
    this._options = options || {};
    this._maxRetryTime = options && options.maxRetryTime || Infinity;
    this._fn = null;
    this._errors = [];
    this._attempts = 1;
    this._operationTimeout = null;
    this._operationTimeoutCb = null;
    this._timeout = null;
    this._operationStart = null;
    this._timer = null;
    if (this._options.forever) {
        this._cachedTimeouts = this._timeouts.slice(0);
    }
}
module.exports = RetryOperation;
RetryOperation.prototype.reset = function() {
    this._attempts = 1;
    this._timeouts = this._originalTimeouts.slice(0);
};
RetryOperation.prototype.stop = function() {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }
    if (this._timer) {
        clearTimeout(this._timer);
    }
    this._timeouts = [];
    this._cachedTimeouts = null;
};
RetryOperation.prototype.retry = function(err) {
    if (this._timeout) {
        clearTimeout(this._timeout);
    }
    if (!err) {
        return false;
    }
    var currentTime = new Date().getTime();
    if (err && currentTime - this._operationStart >= this._maxRetryTime) {
        this._errors.push(err);
        this._errors.unshift(new Error('RetryOperation timeout occurred'));
        return false;
    }
    this._errors.push(err);
    var timeout = this._timeouts.shift();
    if (timeout === undefined) {
        if (this._cachedTimeouts) {
            // retry forever, only keep last error
            this._errors.splice(0, this._errors.length - 1);
            timeout = this._cachedTimeouts.slice(-1);
        } else {
            return false;
        }
    }
    var self = this;
    this._timer = setTimeout(function() {
        self._attempts++;
        if (self._operationTimeoutCb) {
            self._timeout = setTimeout(function() {
                self._operationTimeoutCb(self._attempts);
            }, self._operationTimeout);
            if (self._options.unref) {
                self._timeout.unref();
            }
        }
        self._fn(self._attempts);
    }, timeout);
    if (this._options.unref) {
        this._timer.unref();
    }
    return true;
};
RetryOperation.prototype.attempt = function(fn, timeoutOps) {
    this._fn = fn;
    if (timeoutOps) {
        if (timeoutOps.timeout) {
            this._operationTimeout = timeoutOps.timeout;
        }
        if (timeoutOps.cb) {
            this._operationTimeoutCb = timeoutOps.cb;
        }
    }
    var self = this;
    if (this._operationTimeoutCb) {
        this._timeout = setTimeout(function() {
            self._operationTimeoutCb();
        }, self._operationTimeout);
    }
    this._operationStart = new Date().getTime();
    this._fn(this._attempts);
};
RetryOperation.prototype.try = function(fn) {
    console.log('Using RetryOperation.try() is deprecated');
    this.attempt(fn);
};
RetryOperation.prototype.start = function(fn) {
    console.log('Using RetryOperation.start() is deprecated');
    this.attempt(fn);
};
RetryOperation.prototype.start = RetryOperation.prototype.try;
RetryOperation.prototype.errors = function() {
    return this._errors;
};
RetryOperation.prototype.attempts = function() {
    return this._attempts;
};
RetryOperation.prototype.mainError = function() {
    if (this._errors.length === 0) {
        return null;
    }
    var counts = {};
    var mainError = null;
    var mainErrorCount = 0;
    for(var i = 0; i < this._errors.length; i++){
        var error = this._errors[i];
        var message = error.message;
        var count = (counts[message] || 0) + 1;
        counts[message] = count;
        if (count >= mainErrorCount) {
            mainError = error;
            mainErrorCount = count;
        }
    }
    return mainError;
};
}),
"[project]/node_modules/retry/lib/retry.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

var RetryOperation = __turbopack_context__.r("[project]/node_modules/retry/lib/retry_operation.js [app-rsc] (ecmascript)");
exports.operation = function(options) {
    var timeouts = exports.timeouts(options);
    return new RetryOperation(timeouts, {
        forever: options && (options.forever || options.retries === Infinity),
        unref: options && options.unref,
        maxRetryTime: options && options.maxRetryTime
    });
};
exports.timeouts = function(options) {
    if (options instanceof Array) {
        return [].concat(options);
    }
    var opts = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1000,
        maxTimeout: Infinity,
        randomize: false
    };
    for(var key in options){
        opts[key] = options[key];
    }
    if (opts.minTimeout > opts.maxTimeout) {
        throw new Error('minTimeout is greater than maxTimeout');
    }
    var timeouts = [];
    for(var i = 0; i < opts.retries; i++){
        timeouts.push(this.createTimeout(i, opts));
    }
    if (options && options.forever && !timeouts.length) {
        timeouts.push(this.createTimeout(i, opts));
    }
    // sort the array numerically ascending
    timeouts.sort(function(a, b) {
        return a - b;
    });
    return timeouts;
};
exports.createTimeout = function(attempt, opts) {
    var random = opts.randomize ? Math.random() + 1 : 1;
    var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
    timeout = Math.min(timeout, opts.maxTimeout);
    return timeout;
};
exports.wrap = function(obj, options, methods) {
    if (options instanceof Array) {
        methods = options;
        options = null;
    }
    if (!methods) {
        methods = [];
        for(var key in obj){
            if (typeof obj[key] === 'function') {
                methods.push(key);
            }
        }
    }
    for(var i = 0; i < methods.length; i++){
        var method = methods[i];
        var original = obj[method];
        obj[method] = (function retryWrapper(original) {
            var op = exports.operation(options);
            var args = Array.prototype.slice.call(arguments, 1);
            var callback = args.pop();
            args.push(function(err) {
                if (op.retry(err)) {
                    return;
                }
                if (err) {
                    arguments[0] = op.mainError();
                }
                callback.apply(this, arguments);
            });
            op.attempt(function() {
                original.apply(obj, args);
            });
        }).bind(obj, original);
        obj[method].options = options;
    }
};
}),
"[project]/node_modules/retry/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/retry/lib/retry.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/async-retry/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Packages
var retrier = __turbopack_context__.r("[project]/node_modules/retry/index.js [app-rsc] (ecmascript)");
function retry(fn, opts) {
    function run(resolve, reject) {
        var options = opts || {};
        var op;
        // Default `randomize` to true
        if (!('randomize' in options)) {
            options.randomize = true;
        }
        op = retrier.operation(options);
        // We allow the user to abort retrying
        // this makes sense in the cases where
        // knowledge is obtained that retrying
        // would be futile (e.g.: auth errors)
        function bail(err) {
            reject(err || new Error('Aborted'));
        }
        function onError(err, num) {
            if (err.bail) {
                bail(err);
                return;
            }
            if (!op.retry(err)) {
                reject(op.mainError());
            } else if (options.onRetry) {
                options.onRetry(err, num);
            }
        }
        function runAttempt(num) {
            var val;
            try {
                val = fn(bail, num);
            } catch (err) {
                onError(err, num);
                return;
            }
            Promise.resolve(val).then(resolve).catch(function catchIt(err) {
                onError(err, num);
            });
        }
        op.attempt(runAttempt);
    }
    return new Promise(run);
}
module.exports = retry;
}),
"[project]/node_modules/throttleit/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

function throttle(function_, wait) {
    if (typeof function_ !== 'function') {
        throw new TypeError(`Expected the first argument to be a \`function\`, got \`${typeof function_}\`.`);
    }
    // TODO: Add `wait` validation too in the next major version.
    let timeoutId;
    let lastCallTime = 0;
    return function throttled(...arguments_) {
        clearTimeout(timeoutId);
        const now = Date.now();
        const timeSinceLastCall = now - lastCallTime;
        const delayForNextCall = wait - timeSinceLastCall;
        if (delayForNextCall <= 0) {
            lastCallTime = now;
            function_.apply(this, arguments_);
        } else {
            timeoutId = setTimeout(()=>{
                lastCallTime = Date.now();
                function_.apply(this, arguments_);
            }, delayForNextCall);
        }
    };
}
module.exports = throttle;
}),
"[project]/node_modules/@vercel/blob/dist/chunk-R7Q54W4V.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlobAccessError",
    ()=>BlobAccessError,
    "BlobClientTokenExpiredError",
    ()=>BlobClientTokenExpiredError,
    "BlobContentTypeNotAllowedError",
    ()=>BlobContentTypeNotAllowedError,
    "BlobError",
    ()=>BlobError,
    "BlobFileTooLargeError",
    ()=>BlobFileTooLargeError,
    "BlobNotFoundError",
    ()=>BlobNotFoundError,
    "BlobPathnameMismatchError",
    ()=>BlobPathnameMismatchError,
    "BlobPreconditionFailedError",
    ()=>BlobPreconditionFailedError,
    "BlobRequestAbortedError",
    ()=>BlobRequestAbortedError,
    "BlobServiceNotAvailable",
    ()=>BlobServiceNotAvailable,
    "BlobServiceRateLimited",
    ()=>BlobServiceRateLimited,
    "BlobStoreNotFoundError",
    ()=>BlobStoreNotFoundError,
    "BlobStoreSuspendedError",
    ()=>BlobStoreSuspendedError,
    "BlobUnknownError",
    ()=>BlobUnknownError,
    "MAXIMUM_PATHNAME_LENGTH",
    ()=>MAXIMUM_PATHNAME_LENGTH,
    "createCompleteMultipartUploadMethod",
    ()=>createCompleteMultipartUploadMethod,
    "createCreateMultipartUploadMethod",
    ()=>createCreateMultipartUploadMethod,
    "createCreateMultipartUploaderMethod",
    ()=>createCreateMultipartUploaderMethod,
    "createFolder",
    ()=>createFolder,
    "createPutMethod",
    ()=>createPutMethod,
    "createUploadPartMethod",
    ()=>createUploadPartMethod,
    "disallowedPathnameCharacters",
    ()=>disallowedPathnameCharacters,
    "getDownloadUrl",
    ()=>getDownloadUrl,
    "getTokenFromOptionsOrEnv",
    ()=>getTokenFromOptionsOrEnv,
    "requestApi",
    ()=>requestApi
]);
// src/helpers.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$is$2d$node$2d$process$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/is-node-process/lib/index.mjs [app-rsc] (ecmascript)");
// src/multipart/helpers.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$is$2d$buffer$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/is-buffer/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
// src/api.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$async$2d$retry$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/async-retry/lib/index.js [app-rsc] (ecmascript)");
// src/fetch.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/undici/index.js [app-rsc] (ecmascript)");
// src/multipart/upload.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$throttleit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/throttleit/index.js [app-rsc] (ecmascript)");
;
;
;
var supportsNewBlobFromArrayBuffer = new Promise((resolve)=>{
    try {
        const helloAsArrayBuffer = new Uint8Array([
            104,
            101,
            108,
            108,
            111
        ]);
        const blob = new Blob([
            helloAsArrayBuffer
        ]);
        blob.text().then((text)=>{
            resolve(text === "hello");
        }).catch(()=>{
            resolve(false);
        });
    } catch  {
        resolve(false);
    }
});
async function toReadableStream(value) {
    if (value instanceof ReadableStream) {
        return value;
    }
    if (value instanceof Blob) {
        return value.stream();
    }
    if (isNodeJsReadableStream(value)) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["Readable"].toWeb(value);
    }
    let streamValue;
    if (value instanceof ArrayBuffer) {
        streamValue = new Uint8Array(value);
    } else if (isNodeJsBuffer(value)) {
        streamValue = value;
    } else {
        streamValue = stringToUint8Array(value);
    }
    if (await supportsNewBlobFromArrayBuffer) {
        return new Blob([
            streamValue
        ]).stream();
    }
    return new ReadableStream({
        start (controller) {
            controller.enqueue(streamValue);
            controller.close();
        }
    });
}
function isNodeJsReadableStream(value) {
    return typeof value === "object" && typeof value.pipe === "function" && value.readable && typeof value._read === "function" && // @ts-expect-error _readableState does exists on Readable
    typeof value._readableState === "object";
}
function stringToUint8Array(s) {
    const enc = new TextEncoder();
    return enc.encode(s);
}
function isNodeJsBuffer(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$is$2d$buffer$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value);
}
// src/bytes.ts
var parseRegExp = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
var map = {
    b: 1,
    kb: 1 << 10,
    mb: 1 << 20,
    gb: 1 << 30,
    tb: 1024 ** 4,
    pb: 1024 ** 5
};
function bytes(val) {
    if (typeof val === "number" && !Number.isNaN(val)) {
        return val;
    }
    if (typeof val !== "string") {
        return null;
    }
    const results = parseRegExp.exec(val);
    let floatValue;
    let unit = "b";
    if (!results) {
        floatValue = parseInt(val, 10);
    } else {
        const [, res, , , unitMatch] = results;
        if (!res) {
            return null;
        }
        floatValue = parseFloat(res);
        if (unitMatch) {
            unit = unitMatch.toLowerCase();
        }
    }
    if (Number.isNaN(floatValue)) {
        return null;
    }
    return Math.floor(map[unit] * floatValue);
}
// src/helpers.ts
var defaultVercelBlobApiUrl = "https://vercel.com/api/blob";
function getTokenFromOptionsOrEnv(options) {
    if (options == null ? void 0 : options.token) {
        return options.token;
    }
    if (process.env.BLOB_READ_WRITE_TOKEN) {
        return process.env.BLOB_READ_WRITE_TOKEN;
    }
    throw new BlobError("No token found. Either configure the `BLOB_READ_WRITE_TOKEN` environment variable, or pass a `token` option to your calls.");
}
var BlobError = class extends Error {
    constructor(message){
        super(`Vercel Blob: ${message}`);
    }
};
function getDownloadUrl(blobUrl) {
    const url = new URL(blobUrl);
    url.searchParams.set("download", "1");
    return url.toString();
}
function isPlainObject(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
var disallowedPathnameCharacters = [
    "//"
];
var supportsRequestStreams = (()=>{
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$is$2d$node$2d$process$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isNodeProcess"])()) {
        return true;
    }
    const apiUrl = getApiUrl();
    if (apiUrl.startsWith("http://localhost")) {
        return false;
    }
    let duplexAccessed = false;
    const hasContentType = new Request(getApiUrl(), {
        body: new ReadableStream(),
        method: "POST",
        // @ts-expect-error -- TypeScript doesn't yet have duplex but it's in the spec: https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1729
        get duplex () {
            duplexAccessed = true;
            return "half";
        }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
})();
function getApiUrl(pathname = "") {
    let baseUrl = null;
    try {
        baseUrl = process.env.VERCEL_BLOB_API_URL || process.env.NEXT_PUBLIC_VERCEL_BLOB_API_URL;
    } catch  {}
    return `${baseUrl || defaultVercelBlobApiUrl}${pathname}`;
}
var TEXT_ENCODER = typeof TextEncoder === "function" ? new TextEncoder() : null;
function computeBodyLength(body) {
    if (!body) {
        return 0;
    }
    if (typeof body === "string") {
        if (TEXT_ENCODER) {
            return TEXT_ENCODER.encode(body).byteLength;
        }
        return new Blob([
            body
        ]).size;
    }
    if ("byteLength" in body && typeof body.byteLength === "number") {
        return body.byteLength;
    }
    if ("size" in body && typeof body.size === "number") {
        return body.size;
    }
    return 0;
}
var createChunkTransformStream = (chunkSize, onProgress)=>{
    let buffer = new Uint8Array(0);
    return new TransformStream({
        transform (chunk, controller) {
            queueMicrotask(()=>{
                const newBuffer = new Uint8Array(buffer.length + chunk.byteLength);
                newBuffer.set(buffer);
                newBuffer.set(new Uint8Array(chunk), buffer.length);
                buffer = newBuffer;
                while(buffer.length >= chunkSize){
                    const newChunk = buffer.slice(0, chunkSize);
                    controller.enqueue(newChunk);
                    onProgress == null ? void 0 : onProgress(newChunk.byteLength);
                    buffer = buffer.slice(chunkSize);
                }
            });
        },
        flush (controller) {
            queueMicrotask(()=>{
                if (buffer.length > 0) {
                    controller.enqueue(buffer);
                    onProgress == null ? void 0 : onProgress(buffer.byteLength);
                }
            });
        }
    });
};
function isReadableStream(value) {
    return globalThis.ReadableStream && // TODO: Can be removed once Node.js 16 is no more required internally
    value instanceof ReadableStream;
}
function isStream(value) {
    if (isReadableStream(value)) {
        return true;
    }
    if (isNodeJsReadableStream(value)) {
        return true;
    }
    return false;
}
;
// src/debug.ts
var debugIsActive = false;
var _a, _b;
try {
    if (((_a = process.env.DEBUG) == null ? void 0 : _a.includes("blob")) || ((_b = process.env.NEXT_PUBLIC_DEBUG) == null ? void 0 : _b.includes("blob"))) {
        debugIsActive = true;
    }
} catch  {}
function debug(message, ...args) {
    if (debugIsActive) {
        console.debug(`vercel-blob: ${message}`, ...args);
    }
}
// src/dom-exception.ts
var _a2;
var DOMException2 = (_a2 = globalThis.DOMException) != null ? _a2 : (()=>{
    try {
        atob("~");
    } catch (err) {
        return Object.getPrototypeOf(err).constructor;
    }
})();
// src/is-network-error.ts
var objectToString = Object.prototype.toString;
var isError = (value)=>objectToString.call(value) === "[object Error]";
var errorMessages = /* @__PURE__ */ new Set([
    "network error",
    // Chrome
    "Failed to fetch",
    // Chrome
    "NetworkError when attempting to fetch resource.",
    // Firefox
    "The Internet connection appears to be offline.",
    // Safari 16
    "Load failed",
    // Safari 17+
    "Network request failed",
    // `cross-fetch`
    "fetch failed",
    // Undici (Node.js)
    "terminated"
]);
function isNetworkError(error) {
    const isValid = error && isError(error) && error.name === "TypeError" && typeof error.message === "string";
    if (!isValid) {
        return false;
    }
    if (error.message === "Load failed") {
        return error.stack === void 0;
    }
    return errorMessages.has(error.message);
}
;
var hasFetch = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetch"] === "function";
var hasFetchWithUploadProgress = hasFetch && supportsRequestStreams;
var CHUNK_SIZE = 64 * 1024;
var blobFetch = async ({ input, init, onUploadProgress })=>{
    debug("using fetch");
    let body;
    if (init.body) {
        if (onUploadProgress) {
            const stream = await toReadableStream(init.body);
            let loaded = 0;
            const chunkTransformStream = createChunkTransformStream(CHUNK_SIZE, (newLoaded)=>{
                loaded += newLoaded;
                onUploadProgress(loaded);
            });
            body = stream.pipeThrough(chunkTransformStream);
        } else {
            body = init.body;
        }
    }
    const duplex = supportsRequestStreams && body && isStream(body) ? "half" : void 0;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetch"])(input, // @ts-expect-error -- Blob and Nodejs Blob are triggering type errors, fine with it
    {
        ...init,
        ...init.body ? {
            body
        } : {},
        duplex
    });
};
// src/xhr.ts
var hasXhr = typeof XMLHttpRequest !== "undefined";
var blobXhr = async ({ input, init, onUploadProgress })=>{
    debug("using xhr");
    let body = null;
    if (init.body) {
        if (isReadableStream(init.body)) {
            body = await new Response(init.body).blob();
        } else {
            body = init.body;
        }
    }
    return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(init.method || "GET", input.toString(), true);
        if (onUploadProgress) {
            xhr.upload.addEventListener("progress", (event)=>{
                if (event.lengthComputable) {
                    onUploadProgress(event.loaded);
                }
            });
        }
        xhr.onload = ()=>{
            var _a3;
            if ((_a3 = init.signal) == null ? void 0 : _a3.aborted) {
                reject(new DOMException("The user aborted the request.", "AbortError"));
                return;
            }
            const headers = new Headers();
            const rawHeaders = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
            rawHeaders.forEach((line)=>{
                const parts = line.split(": ");
                const key = parts.shift();
                const value = parts.join(": ");
                if (key) headers.set(key.toLowerCase(), value);
            });
            const response = new Response(xhr.response, {
                status: xhr.status,
                statusText: xhr.statusText,
                headers
            });
            resolve(response);
        };
        xhr.onerror = ()=>{
            reject(new TypeError("Network request failed"));
        };
        xhr.ontimeout = ()=>{
            reject(new TypeError("Network request timed out"));
        };
        xhr.onabort = ()=>{
            reject(new DOMException("The user aborted a request.", "AbortError"));
        };
        if (init.headers) {
            const headers = new Headers(init.headers);
            headers.forEach((value, key)=>{
                xhr.setRequestHeader(key, value);
            });
        }
        if (init.signal) {
            init.signal.addEventListener("abort", ()=>{
                xhr.abort();
            });
            if (init.signal.aborted) {
                xhr.abort();
                return;
            }
        }
        xhr.send(body);
    });
};
// src/request.ts
var blobRequest = async ({ input, init, onUploadProgress })=>{
    if (onUploadProgress) {
        if (hasFetchWithUploadProgress) {
            return blobFetch({
                input,
                init,
                onUploadProgress
            });
        }
        if (hasXhr) {
            return blobXhr({
                input,
                init,
                onUploadProgress
            });
        }
    }
    if (hasFetch) {
        return blobFetch({
            input,
            init
        });
    }
    if (hasXhr) {
        return blobXhr({
            input,
            init
        });
    }
    throw new Error("No request implementation available");
};
// src/api.ts
var MAXIMUM_PATHNAME_LENGTH = 950;
var BlobAccessError = class extends BlobError {
    constructor(){
        super("Access denied, please provide a valid token for this resource.");
    }
};
var BlobContentTypeNotAllowedError = class extends BlobError {
    constructor(message){
        super(`Content type mismatch, ${message}.`);
    }
};
var BlobPathnameMismatchError = class extends BlobError {
    constructor(message){
        super(`Pathname mismatch, ${message}. Check the pathname used in upload() or put() matches the one from the client token.`);
    }
};
var BlobClientTokenExpiredError = class extends BlobError {
    constructor(){
        super("Client token has expired.");
    }
};
var BlobFileTooLargeError = class extends BlobError {
    constructor(message){
        super(`File is too large, ${message}.`);
    }
};
var BlobStoreNotFoundError = class extends BlobError {
    constructor(){
        super("This store does not exist.");
    }
};
var BlobStoreSuspendedError = class extends BlobError {
    constructor(){
        super("This store has been suspended.");
    }
};
var BlobUnknownError = class extends BlobError {
    constructor(){
        super("Unknown error, please visit https://vercel.com/help.");
    }
};
var BlobNotFoundError = class extends BlobError {
    constructor(){
        super("The requested blob does not exist");
    }
};
var BlobServiceNotAvailable = class extends BlobError {
    constructor(){
        super("The blob service is currently not available. Please try again.");
    }
};
var BlobServiceRateLimited = class extends BlobError {
    constructor(seconds){
        super(`Too many requests please lower the number of concurrent requests ${seconds ? ` - try again in ${seconds} seconds` : ""}.`);
        this.retryAfter = seconds != null ? seconds : 0;
    }
};
var BlobRequestAbortedError = class extends BlobError {
    constructor(){
        super("The request was aborted.");
    }
};
var BlobPreconditionFailedError = class extends BlobError {
    constructor(){
        super("Precondition failed: ETag mismatch.");
    }
};
var BLOB_API_VERSION = 12;
function getApiVersion() {
    let versionOverride = null;
    try {
        versionOverride = process.env.VERCEL_BLOB_API_VERSION_OVERRIDE || process.env.NEXT_PUBLIC_VERCEL_BLOB_API_VERSION_OVERRIDE;
    } catch  {}
    return `${versionOverride != null ? versionOverride : BLOB_API_VERSION}`;
}
function getRetries() {
    try {
        const retries = process.env.VERCEL_BLOB_RETRIES || "10";
        return parseInt(retries, 10);
    } catch  {
        return 10;
    }
}
function createBlobServiceRateLimited(response) {
    const retryAfter = response.headers.get("retry-after");
    return new BlobServiceRateLimited(retryAfter ? parseInt(retryAfter, 10) : void 0);
}
async function getBlobError(response) {
    var _a3, _b2, _c;
    let code;
    let message;
    try {
        const data = await response.json();
        code = (_b2 = (_a3 = data.error) == null ? void 0 : _a3.code) != null ? _b2 : "unknown_error";
        message = (_c = data.error) == null ? void 0 : _c.message;
    } catch  {
        code = "unknown_error";
    }
    if ((message == null ? void 0 : message.includes("contentType")) && message.includes("is not allowed")) {
        code = "content_type_not_allowed";
    }
    if ((message == null ? void 0 : message.includes('"pathname"')) && message.includes("does not match the token payload")) {
        code = "client_token_pathname_mismatch";
    }
    if (message === "Token expired") {
        code = "client_token_expired";
    }
    if (message == null ? void 0 : message.includes("the file length cannot be greater than")) {
        code = "file_too_large";
    }
    let error;
    switch(code){
        case "store_suspended":
            error = new BlobStoreSuspendedError();
            break;
        case "forbidden":
            error = new BlobAccessError();
            break;
        case "content_type_not_allowed":
            error = new BlobContentTypeNotAllowedError(message);
            break;
        case "client_token_pathname_mismatch":
            error = new BlobPathnameMismatchError(message);
            break;
        case "client_token_expired":
            error = new BlobClientTokenExpiredError();
            break;
        case "file_too_large":
            error = new BlobFileTooLargeError(message);
            break;
        case "not_found":
            error = new BlobNotFoundError();
            break;
        case "store_not_found":
            error = new BlobStoreNotFoundError();
            break;
        case "bad_request":
            error = new BlobError(message != null ? message : "Bad request");
            break;
        case "service_unavailable":
            error = new BlobServiceNotAvailable();
            break;
        case "rate_limited":
            error = createBlobServiceRateLimited(response);
            break;
        case "precondition_failed":
            error = new BlobPreconditionFailedError();
            break;
        case "unknown_error":
        case "not_allowed":
        default:
            error = new BlobUnknownError();
            break;
    }
    return {
        code,
        error
    };
}
async function requestApi(pathname, init, commandOptions) {
    const apiVersion = getApiVersion();
    const token = getTokenFromOptionsOrEnv(commandOptions);
    const extraHeaders = getProxyThroughAlternativeApiHeaderFromEnv();
    const [, , , storeId = ""] = token.split("_");
    const requestId = `${storeId}:${Date.now()}:${Math.random().toString(16).slice(2)}`;
    let retryCount = 0;
    let bodyLength = 0;
    let totalLoaded = 0;
    const sendBodyLength = (commandOptions == null ? void 0 : commandOptions.onUploadProgress) || shouldUseXContentLength();
    if (init.body && // 1. For upload progress we always need to know the total size of the body
    // 2. In development we need the header for put() to work correctly when passing a stream
    sendBodyLength) {
        bodyLength = computeBodyLength(init.body);
    }
    if (commandOptions == null ? void 0 : commandOptions.onUploadProgress) {
        commandOptions.onUploadProgress({
            loaded: 0,
            total: bodyLength,
            percentage: 0
        });
    }
    const apiResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$async$2d$retry$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(async (bail)=>{
        let res;
        try {
            res = await blobRequest({
                input: getApiUrl(pathname),
                init: {
                    ...init,
                    headers: {
                        "x-api-blob-request-id": requestId,
                        "x-api-blob-request-attempt": String(retryCount),
                        "x-api-version": apiVersion,
                        ...sendBodyLength ? {
                            "x-content-length": String(bodyLength)
                        } : {},
                        authorization: `Bearer ${token}`,
                        ...extraHeaders,
                        ...init.headers
                    }
                },
                onUploadProgress: (commandOptions == null ? void 0 : commandOptions.onUploadProgress) ? (loaded)=>{
                    var _a3;
                    const total = bodyLength !== 0 ? bodyLength : loaded;
                    totalLoaded = loaded;
                    const percentage = bodyLength > 0 ? Number((loaded / total * 100).toFixed(2)) : 0;
                    if (percentage === 100 && bodyLength > 0) {
                        return;
                    }
                    (_a3 = commandOptions.onUploadProgress) == null ? void 0 : _a3.call(commandOptions, {
                        loaded,
                        // When passing a stream to put(), we have no way to know the total size of the body.
                        // Instead of defining total as total?: number we decided to set the total to the currently
                        // loaded number. This is not inaccurate and way more practical for DX.
                        // Passing down a stream to put() is very rare
                        total,
                        percentage
                    });
                } : void 0
            });
        } catch (error2) {
            if (error2 instanceof DOMException2 && error2.name === "AbortError") {
                bail(new BlobRequestAbortedError());
                return;
            }
            if (isNetworkError(error2)) {
                throw error2;
            }
            if (error2 instanceof TypeError) {
                bail(error2);
                return;
            }
            throw error2;
        }
        if (res.ok) {
            return res;
        }
        const { code, error } = await getBlobError(res);
        if (code === "unknown_error" || code === "service_unavailable" || code === "internal_server_error") {
            throw error;
        }
        bail(error);
    }, {
        retries: getRetries(),
        onRetry: (error)=>{
            if (error instanceof Error) {
                debug(`retrying API request to ${pathname}`, error.message);
            }
            retryCount = retryCount + 1;
        }
    });
    if (!apiResponse) {
        throw new BlobUnknownError();
    }
    if (commandOptions == null ? void 0 : commandOptions.onUploadProgress) {
        commandOptions.onUploadProgress({
            loaded: totalLoaded,
            total: totalLoaded,
            percentage: 100
        });
    }
    return await apiResponse.json();
}
function getProxyThroughAlternativeApiHeaderFromEnv() {
    const extraHeaders = {};
    try {
        if ("VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API" in process.env && process.env.VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API !== void 0) {
            extraHeaders["x-proxy-through-alternative-api"] = process.env.VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API;
        } else if ("NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API" in process.env && process.env.NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API !== void 0) {
            extraHeaders["x-proxy-through-alternative-api"] = process.env.NEXT_PUBLIC_VERCEL_BLOB_PROXY_THROUGH_ALTERNATIVE_API;
        }
    } catch  {}
    return extraHeaders;
}
function shouldUseXContentLength() {
    try {
        return process.env.VERCEL_BLOB_USE_X_CONTENT_LENGTH === "1";
    } catch  {
        return false;
    }
}
// src/put-helpers.ts
var putOptionHeaderMap = {
    cacheControlMaxAge: "x-cache-control-max-age",
    addRandomSuffix: "x-add-random-suffix",
    allowOverwrite: "x-allow-overwrite",
    contentType: "x-content-type",
    access: "x-vercel-blob-access",
    ifMatch: "x-if-match"
};
function createPutHeaders(allowedOptions, options) {
    const headers = {};
    headers[putOptionHeaderMap.access] = options.access;
    if (allowedOptions.includes("contentType") && options.contentType) {
        headers[putOptionHeaderMap.contentType] = options.contentType;
    }
    if (allowedOptions.includes("addRandomSuffix") && options.addRandomSuffix !== void 0) {
        headers[putOptionHeaderMap.addRandomSuffix] = options.addRandomSuffix ? "1" : "0";
    }
    if (allowedOptions.includes("ifMatch") && options.ifMatch) {
        if (options.allowOverwrite === false) {
            throw new BlobError("ifMatch and allowOverwrite: false are contradictory. ifMatch is used for conditional overwrites, which requires allowOverwrite to be true.");
        }
        headers[putOptionHeaderMap.ifMatch] = options.ifMatch;
        if (allowedOptions.includes("allowOverwrite") && options.allowOverwrite === void 0) {
            headers[putOptionHeaderMap.allowOverwrite] = "1";
        }
    }
    if (allowedOptions.includes("allowOverwrite") && options.allowOverwrite !== void 0) {
        headers[putOptionHeaderMap.allowOverwrite] = options.allowOverwrite ? "1" : "0";
    }
    if (allowedOptions.includes("cacheControlMaxAge") && options.cacheControlMaxAge !== void 0) {
        headers[putOptionHeaderMap.cacheControlMaxAge] = options.cacheControlMaxAge.toString();
    }
    return headers;
}
async function createPutOptions({ pathname, options, extraChecks, getToken }) {
    if (!pathname) {
        throw new BlobError("pathname is required");
    }
    if (pathname.length > MAXIMUM_PATHNAME_LENGTH) {
        throw new BlobError(`pathname is too long, maximum length is ${MAXIMUM_PATHNAME_LENGTH}`);
    }
    for (const invalidCharacter of disallowedPathnameCharacters){
        if (pathname.includes(invalidCharacter)) {
            throw new BlobError(`pathname cannot contain "${invalidCharacter}", please encode it if needed`);
        }
    }
    if (!options) {
        throw new BlobError("missing options, see usage");
    }
    if (options.access !== "public" && options.access !== "private") {
        throw new BlobError('access must be "private" or "public", see https://vercel.com/docs/vercel-blob');
    }
    if (extraChecks) {
        extraChecks(options);
    }
    if (getToken) {
        options.token = await getToken(pathname, options);
    }
    return options;
}
// src/multipart/complete.ts
function createCompleteMultipartUploadMethod({ allowedOptions, getToken, extraChecks }) {
    return async (pathname, parts, optionsInput)=>{
        const options = await createPutOptions({
            pathname,
            options: optionsInput,
            extraChecks,
            getToken
        });
        const headers = createPutHeaders(allowedOptions, options);
        return completeMultipartUpload({
            uploadId: options.uploadId,
            key: options.key,
            pathname,
            headers,
            options,
            parts
        });
    };
}
async function completeMultipartUpload({ uploadId, key, pathname, parts, headers, options }) {
    const params = new URLSearchParams({
        pathname
    });
    try {
        const response = await requestApi(`/mpu?${params.toString()}`, {
            method: "POST",
            headers: {
                ...headers,
                "content-type": "application/json",
                "x-mpu-action": "complete",
                "x-mpu-upload-id": uploadId,
                // key can be any utf8 character so we need to encode it as HTTP headers can only be us-ascii
                // https://www.rfc-editor.org/rfc/rfc7230#swection-3.2.4
                "x-mpu-key": encodeURIComponent(key)
            },
            body: JSON.stringify(parts),
            signal: options.abortSignal
        }, options);
        debug("mpu: complete", response);
        return response;
    } catch (error) {
        if (error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "fetch failed")) {
            throw new BlobServiceNotAvailable();
        } else {
            throw error;
        }
    }
}
// src/multipart/create.ts
function createCreateMultipartUploadMethod({ allowedOptions, getToken, extraChecks }) {
    return async (pathname, optionsInput)=>{
        const options = await createPutOptions({
            pathname,
            options: optionsInput,
            extraChecks,
            getToken
        });
        const headers = createPutHeaders(allowedOptions, options);
        const createMultipartUploadResponse = await createMultipartUpload(pathname, headers, options);
        return {
            key: createMultipartUploadResponse.key,
            uploadId: createMultipartUploadResponse.uploadId
        };
    };
}
async function createMultipartUpload(pathname, headers, options) {
    debug("mpu: create", "pathname:", pathname);
    const params = new URLSearchParams({
        pathname
    });
    try {
        const response = await requestApi(`/mpu?${params.toString()}`, {
            method: "POST",
            headers: {
                ...headers,
                "x-mpu-action": "create"
            },
            signal: options.abortSignal
        }, options);
        debug("mpu: create", response);
        return response;
    } catch (error) {
        if (error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "fetch failed")) {
            throw new BlobServiceNotAvailable();
        }
        throw error;
    }
}
;
function createUploadPartMethod({ allowedOptions, getToken, extraChecks }) {
    return async (pathname, body, optionsInput)=>{
        const options = await createPutOptions({
            pathname,
            options: optionsInput,
            extraChecks,
            getToken
        });
        const headers = createPutHeaders(allowedOptions, options);
        if (isPlainObject(body)) {
            throw new BlobError("Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload.");
        }
        const result = await uploadPart({
            uploadId: options.uploadId,
            key: options.key,
            pathname,
            part: {
                blob: body,
                partNumber: options.partNumber
            },
            headers,
            options
        });
        return {
            etag: result.etag,
            partNumber: options.partNumber
        };
    };
}
async function uploadPart({ uploadId, key, pathname, headers, options, internalAbortController = new AbortController(), part }) {
    var _a3, _b2, _c;
    const params = new URLSearchParams({
        pathname
    });
    const responsePromise = requestApi(`/mpu?${params.toString()}`, {
        signal: internalAbortController.signal,
        method: "POST",
        headers: {
            ...headers,
            "x-mpu-action": "upload",
            "x-mpu-key": encodeURIComponent(key),
            "x-mpu-upload-id": uploadId,
            "x-mpu-part-number": part.partNumber.toString()
        },
        // weird things between undici types and native fetch types
        body: part.blob
    }, options);
    function handleAbort() {
        internalAbortController.abort();
    }
    if ((_a3 = options.abortSignal) == null ? void 0 : _a3.aborted) {
        handleAbort();
    } else {
        (_b2 = options.abortSignal) == null ? void 0 : _b2.addEventListener("abort", handleAbort);
    }
    const response = await responsePromise;
    (_c = options.abortSignal) == null ? void 0 : _c.removeEventListener("abort", handleAbort);
    return response;
}
var maxConcurrentUploads = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 8;
var partSizeInBytes = 8 * 1024 * 1024;
var maxBytesInMemory = maxConcurrentUploads * partSizeInBytes * 2;
function uploadAllParts({ uploadId, key, pathname, stream, headers, options, totalToLoad }) {
    debug("mpu: upload init", "key:", key);
    const internalAbortController = new AbortController();
    return new Promise((resolve, reject)=>{
        const partsToUpload = [];
        const completedParts = [];
        const reader = stream.getReader();
        let activeUploads = 0;
        let reading = false;
        let currentPartNumber = 1;
        let rejected = false;
        let currentBytesInMemory = 0;
        let doneReading = false;
        let bytesSent = 0;
        let arrayBuffers = [];
        let currentPartBytesRead = 0;
        let onUploadProgress;
        const totalLoadedPerPartNumber = {};
        if (options.onUploadProgress) {
            onUploadProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$throttleit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(()=>{
                var _a3;
                const loaded = Object.values(totalLoadedPerPartNumber).reduce((acc, cur)=>{
                    return acc + cur;
                }, 0);
                const total = totalToLoad || loaded;
                const percentage = totalToLoad > 0 ? Number(((loaded / totalToLoad || loaded) * 100).toFixed(2)) : 0;
                (_a3 = options.onUploadProgress) == null ? void 0 : _a3.call(options, {
                    loaded,
                    total,
                    percentage
                });
            }, 150);
        }
        read().catch(cancel);
        async function read() {
            debug("mpu: upload read start", "activeUploads:", activeUploads, "currentBytesInMemory:", `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`, "bytesSent:", bytes(bytesSent));
            reading = true;
            while(currentBytesInMemory < maxBytesInMemory && !rejected){
                try {
                    const { value, done } = await reader.read();
                    if (done) {
                        doneReading = true;
                        debug("mpu: upload read consumed the whole stream");
                        if (arrayBuffers.length > 0) {
                            partsToUpload.push({
                                partNumber: currentPartNumber++,
                                blob: new Blob(arrayBuffers, {
                                    type: "application/octet-stream"
                                })
                            });
                            sendParts();
                        }
                        reading = false;
                        return;
                    }
                    currentBytesInMemory += value.byteLength;
                    let valueOffset = 0;
                    while(valueOffset < value.byteLength){
                        const remainingPartSize = partSizeInBytes - currentPartBytesRead;
                        const endOffset = Math.min(valueOffset + remainingPartSize, value.byteLength);
                        const chunk = value.slice(valueOffset, endOffset);
                        arrayBuffers.push(chunk);
                        currentPartBytesRead += chunk.byteLength;
                        valueOffset = endOffset;
                        if (currentPartBytesRead === partSizeInBytes) {
                            partsToUpload.push({
                                partNumber: currentPartNumber++,
                                blob: new Blob(arrayBuffers, {
                                    type: "application/octet-stream"
                                })
                            });
                            arrayBuffers = [];
                            currentPartBytesRead = 0;
                            sendParts();
                        }
                    }
                } catch (error) {
                    cancel(error);
                }
            }
            debug("mpu: upload read end", "activeUploads:", activeUploads, "currentBytesInMemory:", `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`, "bytesSent:", bytes(bytesSent));
            reading = false;
        }
        async function sendPart(part) {
            activeUploads++;
            debug("mpu: upload send part start", "partNumber:", part.partNumber, "size:", part.blob.size, "activeUploads:", activeUploads, "currentBytesInMemory:", `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`, "bytesSent:", bytes(bytesSent));
            try {
                const uploadProgressForPart = options.onUploadProgress ? (event)=>{
                    totalLoadedPerPartNumber[part.partNumber] = event.loaded;
                    if (onUploadProgress) {
                        onUploadProgress();
                    }
                } : void 0;
                const completedPart = await uploadPart({
                    uploadId,
                    key,
                    pathname,
                    headers,
                    options: {
                        ...options,
                        onUploadProgress: uploadProgressForPart
                    },
                    internalAbortController,
                    part
                });
                debug("mpu: upload send part end", "partNumber:", part.partNumber, "activeUploads", activeUploads, "currentBytesInMemory:", `${bytes(currentBytesInMemory)}/${bytes(maxBytesInMemory)}`, "bytesSent:", bytes(bytesSent));
                if (rejected) {
                    return;
                }
                completedParts.push({
                    partNumber: part.partNumber,
                    etag: completedPart.etag
                });
                currentBytesInMemory -= part.blob.size;
                activeUploads--;
                bytesSent += part.blob.size;
                if (partsToUpload.length > 0) {
                    sendParts();
                }
                if (doneReading) {
                    if (activeUploads === 0) {
                        reader.releaseLock();
                        resolve(completedParts);
                    }
                    return;
                }
                if (!reading) {
                    read().catch(cancel);
                }
            } catch (error) {
                cancel(error);
            }
        }
        function sendParts() {
            if (rejected) {
                return;
            }
            debug("send parts", "activeUploads", activeUploads, "partsToUpload", partsToUpload.length);
            while(activeUploads < maxConcurrentUploads && partsToUpload.length > 0){
                const partToSend = partsToUpload.shift();
                if (partToSend) {
                    void sendPart(partToSend);
                }
            }
        }
        function cancel(error) {
            if (rejected) {
                return;
            }
            rejected = true;
            internalAbortController.abort();
            reader.releaseLock();
            if (error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "fetch failed")) {
                reject(new BlobServiceNotAvailable());
            } else {
                reject(error);
            }
        }
    });
}
// src/multipart/create-uploader.ts
function createCreateMultipartUploaderMethod({ allowedOptions, getToken, extraChecks }) {
    return async (pathname, optionsInput)=>{
        const options = await createPutOptions({
            pathname,
            options: optionsInput,
            extraChecks,
            getToken
        });
        const headers = createPutHeaders(allowedOptions, options);
        const createMultipartUploadResponse = await createMultipartUpload(pathname, headers, options);
        return {
            key: createMultipartUploadResponse.key,
            uploadId: createMultipartUploadResponse.uploadId,
            async uploadPart (partNumber, body) {
                if (isPlainObject(body)) {
                    throw new BlobError("Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload.");
                }
                const result = await uploadPart({
                    uploadId: createMultipartUploadResponse.uploadId,
                    key: createMultipartUploadResponse.key,
                    pathname,
                    part: {
                        partNumber,
                        blob: body
                    },
                    headers,
                    options
                });
                return {
                    etag: result.etag,
                    partNumber
                };
            },
            async complete (parts) {
                return completeMultipartUpload({
                    uploadId: createMultipartUploadResponse.uploadId,
                    key: createMultipartUploadResponse.key,
                    pathname,
                    parts,
                    headers,
                    options
                });
            }
        };
    };
}
;
// src/multipart/uncontrolled.ts
async function uncontrolledMultipartUpload(pathname, body, headers, options) {
    debug("mpu: init", "pathname:", pathname, "headers:", headers);
    const optionsWithoutOnUploadProgress = {
        ...options,
        onUploadProgress: void 0
    };
    const createMultipartUploadResponse = await createMultipartUpload(pathname, headers, optionsWithoutOnUploadProgress);
    const totalToLoad = computeBodyLength(body);
    const stream = await toReadableStream(body);
    const parts = await uploadAllParts({
        uploadId: createMultipartUploadResponse.uploadId,
        key: createMultipartUploadResponse.key,
        pathname,
        // @ts-expect-error ReadableStream<ArrayBuffer | Uint8Array> is compatible at runtime
        stream,
        headers,
        options,
        totalToLoad
    });
    const blob = await completeMultipartUpload({
        uploadId: createMultipartUploadResponse.uploadId,
        key: createMultipartUploadResponse.key,
        pathname,
        parts,
        headers,
        options: optionsWithoutOnUploadProgress
    });
    return blob;
}
// src/put.ts
function createPutMethod({ allowedOptions, getToken, extraChecks }) {
    return async function put(pathname, body, optionsInput) {
        if (!body) {
            throw new BlobError("body is required");
        }
        if (isPlainObject(body)) {
            throw new BlobError("Body must be a string, buffer or stream. You sent a plain JavaScript object, double check what you're trying to upload.");
        }
        const options = await createPutOptions({
            pathname,
            options: optionsInput,
            extraChecks,
            getToken
        });
        const headers = createPutHeaders(allowedOptions, options);
        if (options.multipart === true) {
            return uncontrolledMultipartUpload(pathname, body, headers, options);
        }
        const onUploadProgress = options.onUploadProgress ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$throttleit$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(options.onUploadProgress, 100) : void 0;
        const params = new URLSearchParams({
            pathname
        });
        const response = await requestApi(`/?${params.toString()}`, {
            method: "PUT",
            body,
            headers,
            signal: options.abortSignal
        }, {
            ...options,
            onUploadProgress
        });
        return {
            url: response.url,
            downloadUrl: response.downloadUrl,
            pathname: response.pathname,
            contentType: response.contentType,
            contentDisposition: response.contentDisposition,
            etag: response.etag
        };
    };
}
// src/create-folder.ts
async function createFolder(pathname, options = {
    access: "public"
}) {
    var _a3;
    const access = (_a3 = options.access) != null ? _a3 : "public";
    const folderPathname = pathname.endsWith("/") ? pathname : `${pathname}/`;
    const headers = {};
    headers[putOptionHeaderMap.access] = access;
    headers[putOptionHeaderMap.addRandomSuffix] = "0";
    const params = new URLSearchParams({
        pathname: folderPathname
    });
    const response = await requestApi(`/?${params.toString()}`, {
        method: "PUT",
        headers,
        signal: options.abortSignal
    }, options);
    return {
        url: response.url,
        pathname: response.pathname
    };
}
;
 /*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */  //# sourceMappingURL=chunk-R7Q54W4V.js.map
}),
"[project]/node_modules/@vercel/blob/dist/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "completeMultipartUpload",
    ()=>completeMultipartUpload,
    "copy",
    ()=>copy,
    "createMultipartUpload",
    ()=>createMultipartUpload,
    "createMultipartUploader",
    ()=>createMultipartUploader,
    "del",
    ()=>del,
    "get",
    ()=>get,
    "head",
    ()=>head,
    "list",
    ()=>list,
    "put",
    ()=>put,
    "uploadPart",
    ()=>uploadPart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@vercel/blob/dist/chunk-R7Q54W4V.js [app-rsc] (ecmascript)");
// src/get.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/undici/index.js [app-rsc] (ecmascript)");
;
// src/del.ts
async function del(urlOrPathname, options) {
    const urls = Array.isArray(urlOrPathname) ? urlOrPathname : [
        urlOrPathname
    ];
    if ((options == null ? void 0 : options.ifMatch) && urls.length > 1) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]("ifMatch can only be used when deleting a single URL.");
    }
    const headers = {
        "content-type": "application/json"
    };
    if (options == null ? void 0 : options.ifMatch) {
        headers["x-if-match"] = options.ifMatch;
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestApi"])("/delete", {
        method: "POST",
        headers,
        body: JSON.stringify({
            urls
        }),
        signal: options == null ? void 0 : options.abortSignal
    }, options);
}
// src/head.ts
async function head(urlOrPathname, options) {
    const searchParams = new URLSearchParams({
        url: urlOrPathname
    });
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestApi"])(`?${searchParams.toString()}`, // HEAD can't have body as a response, so we use GET
    {
        method: "GET",
        signal: options == null ? void 0 : options.abortSignal
    }, options);
    return {
        url: response.url,
        downloadUrl: response.downloadUrl,
        pathname: response.pathname,
        size: response.size,
        contentType: response.contentType,
        contentDisposition: response.contentDisposition,
        cacheControl: response.cacheControl,
        uploadedAt: new Date(response.uploadedAt),
        etag: response.etag
    };
}
;
function isUrl(urlOrPathname) {
    return urlOrPathname.startsWith("http://") || urlOrPathname.startsWith("https://");
}
function extractPathnameFromUrl(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.pathname.slice(1);
    } catch  {
        return url;
    }
}
function getStoreIdFromToken(token) {
    const [, , , storeId = ""] = token.split("_");
    return storeId;
}
function constructBlobUrl(storeId, pathname, access) {
    return `https://${storeId}.${access}.blob.vercel-storage.com/${pathname}`;
}
async function get(urlOrPathname, options) {
    if (!urlOrPathname) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]("url or pathname is required");
    }
    if (!options) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]("missing options, see usage");
    }
    if (options.access !== "public" && options.access !== "private") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]('access must be "private" or "public", see https://vercel.com/docs/vercel-blob');
    }
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTokenFromOptionsOrEnv"])(options);
    let blobUrl;
    let pathname;
    const access = options.access;
    if (isUrl(urlOrPathname)) {
        blobUrl = urlOrPathname;
        pathname = extractPathnameFromUrl(urlOrPathname);
        try {
            const { hostname } = new URL(blobUrl);
            if (!hostname.endsWith(".blob.vercel-storage.com")) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]("Invalid URL: the URL does not point to a Vercel Blob store. Use a pathname instead, see https://vercel.com/docs/vercel-blob");
            }
        } catch (error) {
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]) throw error;
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]("Invalid URL: unable to parse the provided URL");
        }
    } else {
        const storeId = getStoreIdFromToken(token);
        if (!storeId) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]("Invalid token: unable to extract store ID");
        }
        pathname = urlOrPathname;
        blobUrl = constructBlobUrl(storeId, pathname, access);
    }
    const requestHeaders = {
        ...options.ifNoneMatch ? {
            "If-None-Match": options.ifNoneMatch
        } : {},
        authorization: `Bearer ${token}`,
        ...options.headers
    };
    let fetchUrl = blobUrl;
    if (options.useCache === false) {
        const url = new URL(blobUrl);
        url.searchParams.set("cache", "0");
        fetchUrl = url.toString();
    }
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$undici$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetch"])(fetchUrl, {
        method: "GET",
        headers: requestHeaders,
        signal: options.abortSignal
    });
    if (response.status === 304) {
        const downloadUrlObj = new URL(blobUrl);
        downloadUrlObj.searchParams.set("download", "1");
        const lastModified2 = response.headers.get("last-modified");
        return {
            statusCode: 304,
            stream: null,
            headers: response.headers,
            blob: {
                url: blobUrl,
                downloadUrl: downloadUrlObj.toString(),
                pathname,
                contentType: null,
                contentDisposition: response.headers.get("content-disposition") || "",
                cacheControl: response.headers.get("cache-control") || "",
                size: null,
                uploadedAt: lastModified2 ? new Date(lastModified2) : /* @__PURE__ */ new Date(),
                etag: response.headers.get("etag") || ""
            }
        };
    }
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"](`Failed to fetch blob: ${response.status} ${response.statusText}`);
    }
    const stream = response.body;
    if (!stream) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]("Response body is null");
    }
    const contentLength = response.headers.get("content-length");
    const lastModified = response.headers.get("last-modified");
    const downloadUrl = new URL(blobUrl);
    downloadUrl.searchParams.set("download", "1");
    return {
        statusCode: 200,
        stream,
        headers: response.headers,
        blob: {
            url: blobUrl,
            downloadUrl: downloadUrl.toString(),
            pathname,
            contentType: response.headers.get("content-type") || "application/octet-stream",
            contentDisposition: response.headers.get("content-disposition") || "",
            cacheControl: response.headers.get("cache-control") || "",
            size: contentLength ? parseInt(contentLength, 10) : 0,
            uploadedAt: lastModified ? new Date(lastModified) : /* @__PURE__ */ new Date(),
            etag: response.headers.get("etag") || ""
        }
    };
}
// src/list.ts
async function list(options) {
    var _a;
    const searchParams = new URLSearchParams();
    if (options == null ? void 0 : options.limit) {
        searchParams.set("limit", options.limit.toString());
    }
    if (options == null ? void 0 : options.prefix) {
        searchParams.set("prefix", options.prefix);
    }
    if (options == null ? void 0 : options.cursor) {
        searchParams.set("cursor", options.cursor);
    }
    if (options == null ? void 0 : options.mode) {
        searchParams.set("mode", options.mode);
    }
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestApi"])(`?${searchParams.toString()}`, {
        method: "GET",
        signal: options == null ? void 0 : options.abortSignal
    }, options);
    if ((options == null ? void 0 : options.mode) === "folded") {
        return {
            folders: (_a = response.folders) != null ? _a : [],
            cursor: response.cursor,
            hasMore: response.hasMore,
            blobs: response.blobs.map(mapBlobResult)
        };
    }
    return {
        cursor: response.cursor,
        hasMore: response.hasMore,
        blobs: response.blobs.map(mapBlobResult)
    };
}
function mapBlobResult(blobResult) {
    return {
        url: blobResult.url,
        downloadUrl: blobResult.downloadUrl,
        pathname: blobResult.pathname,
        size: blobResult.size,
        uploadedAt: new Date(blobResult.uploadedAt),
        etag: blobResult.etag
    };
}
// src/copy.ts
async function copy(fromUrlOrPathname, toPathname, options) {
    if (!options) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]("missing options, see usage");
    }
    if (options.access !== "public" && options.access !== "private") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"]('access must be "private" or "public", see https://vercel.com/docs/vercel-blob');
    }
    if (toPathname.length > __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MAXIMUM_PATHNAME_LENGTH"]) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"](`pathname is too long, maximum length is ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MAXIMUM_PATHNAME_LENGTH"]}`);
    }
    for (const invalidCharacter of __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["disallowedPathnameCharacters"]){
        if (toPathname.includes(invalidCharacter)) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BlobError"](`pathname cannot contain "${invalidCharacter}", please encode it if needed`);
        }
    }
    const headers = {};
    headers["x-vercel-blob-access"] = options.access;
    if (options.addRandomSuffix !== void 0) {
        headers["x-add-random-suffix"] = options.addRandomSuffix ? "1" : "0";
    }
    if (options.allowOverwrite !== void 0) {
        headers["x-allow-overwrite"] = options.allowOverwrite ? "1" : "0";
    }
    if (options.contentType) {
        headers["x-content-type"] = options.contentType;
    }
    if (options.cacheControlMaxAge !== void 0) {
        headers["x-cache-control-max-age"] = options.cacheControlMaxAge.toString();
    }
    if (options.ifMatch) {
        headers["x-if-match"] = options.ifMatch;
    }
    const params = new URLSearchParams({
        pathname: toPathname,
        fromUrl: fromUrlOrPathname
    });
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["requestApi"])(`?${params.toString()}`, {
        method: "PUT",
        headers,
        signal: options.abortSignal
    }, options);
    return {
        url: response.url,
        downloadUrl: response.downloadUrl,
        pathname: response.pathname,
        contentType: response.contentType,
        contentDisposition: response.contentDisposition,
        etag: response.etag
    };
}
// src/index.ts
var put = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPutMethod"])({
    allowedOptions: [
        "cacheControlMaxAge",
        "addRandomSuffix",
        "allowOverwrite",
        "contentType",
        "ifMatch"
    ]
});
var createMultipartUpload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCreateMultipartUploadMethod"])({
    allowedOptions: [
        "cacheControlMaxAge",
        "addRandomSuffix",
        "allowOverwrite",
        "contentType",
        "ifMatch"
    ]
});
var createMultipartUploader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCreateMultipartUploaderMethod"])({
    allowedOptions: [
        "cacheControlMaxAge",
        "addRandomSuffix",
        "allowOverwrite",
        "contentType",
        "ifMatch"
    ]
});
var uploadPart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createUploadPartMethod"])({
    allowedOptions: [
        "cacheControlMaxAge",
        "addRandomSuffix",
        "allowOverwrite",
        "contentType"
    ]
});
var completeMultipartUpload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$vercel$2f$blob$2f$dist$2f$chunk$2d$R7Q54W4V$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCompleteMultipartUploadMethod"])({
    allowedOptions: [
        "cacheControlMaxAge",
        "addRandomSuffix",
        "allowOverwrite",
        "contentType"
    ]
});
;
 //# sourceMappingURL=index.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__052e2760._.js.map