const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const base64url = require("base64url");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");

module.exports = class CreateOrder {
  constructor(type, amount, token, price) {
    this.type = type
    this.amount = amount
    this.token = token
    this.price = price
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        CreateOrder: [this.type, this.amount, encodeAddress(this.token), this.price]
    })
 }

  toSignatureString () {
      console.log(`Create a limit order to ${this.type.toLowerCase()} ${formatBigInt(this.amount)} ${formatToken(this.token)} for $ ${formatBigInt(this.price)} a piece`);
      return `Create a limit order to ${this.type.toLowerCase()} ${formatBigInt(this.amount)} ${formatToken(this.token)} for $ ${formatBigInt(this.price)} a piece`;
  }
}
