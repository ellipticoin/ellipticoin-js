const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt} = require("../helpers");
const base64url = require("base64url");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Migrate {
  constructor(legacyAddress, legacySignature) {
    this.legacyAddress = legacyAddress
    this.legacySignature = legacySignature
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        Migrate: [Array.from(this.legacyAddress), Array.from(this.legacySignature)]
    })
 }

  toSignatureString () {
      return `Migrate\nLegacy Address: ${base64url(this.legacyAddress)}\nLegacy Signature: ${base64url(this.legacySignature)}`;
  }
}
