const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Redeem {
  constructor(amount, token) {
    this.amount = amount
    this.token = token

  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        Redeem: [this.amount, encodeAddress(this.token)]

    })
  }

  toSignatureString () {
      return `Redeem ${formatBigInt(this.amount)} ${formatToken(this.token)}`;
  }
}
