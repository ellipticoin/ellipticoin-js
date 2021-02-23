const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Transfer {
  constructor(amount, token, recipient) {
    this.amount = amount
    this.token = token
    this.recipient = recipient
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        Transfer: [this.amount, encodeAddress(this.token), Array.from(arrayify(this.recipient))]

    })
  }

  toSignatureString () {
      return `Transfer ${formatBigInt(this.amount)} ${formatToken(this.token)} to ${getAddress(this.recipient)}`;
  }
}
