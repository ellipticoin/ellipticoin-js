const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const base64url = require("base64url");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");

module.exports = class CreatePool {
  constructor(amount, token, intialPrice) {
    this.amount = amount
    this.token = token
    this.intialPrice = intialPrice
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        CreatePool: [this.amount, encodeAddress(this.token), this.intialPrice]
    })
 }

  toSignatureString () {
      return `Create a pool of ${formatBigInt(this.amount)} ${formatToken(this.token)} at an initial price of $${formatBigInt(this.intialPrice)} USD`;
  }
}
