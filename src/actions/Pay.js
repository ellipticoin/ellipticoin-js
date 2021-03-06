const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Pay {
  constructor(amount, token, recipient) {
    this.amount = amount
    this.token = token
    this.recipient = recipient
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        Pay: [Array.from(arrayify(this.recipient)), this.amount, encodeAddress(this.token)]

    })
  }

  toSignatureString () {
      return `Pay ${getAddress(this.recipient)} ${formatBigInt(this.amount)} ${formatToken(this.token)}`;
  }
}
