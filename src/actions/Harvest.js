const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt} = require("../helpers");
const base64url = require("base64url");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Harvest {
  encodeCBOR (encoder) {
    return encoder.pushAny({
        Harvest: []
    })
 }

  toSignatureString () {
      return `Harvest`;
  }
}
