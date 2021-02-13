const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt} = require("../helpers");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Transfer {
  constructor(amount, token, recipient) {
    this.amount = amount
    this.token = token
    this.recipient = recipient
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        Transfer: [this.amount, Array.from(Buffer.from(this.token, "base64")), Array.from(arrayify(this.recipient))]

    })
  }

  toSignatureString () {
      const tokenString = TICKERS[this.token]
          ? TICKERS[this.token]
          : getAddress(hexlify(this.token));
      return `Transfer ${formatBigInt(this.amount)} ${tokenString} to ${getAddress(hexlify(this.recipient))}`;
  }
}
