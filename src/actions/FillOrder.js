const { ethers } = require("ethers");
const {BASE_FACTOR} = require("../constants");
const base64url = require("base64url");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");

module.exports = class FillOrder {
  constructor(orderId, type, token, amount, price) {
    this.orderId = orderId
    this.type = type
    this.amount = amount
    this.token = token
    this.price = price
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        FillOrder: [this.orderId, this.type, this.amount, encodeAddress(this.token), this.price]
    })
 }

  toSignatureString () {
      return `${this.type == "Buy" ? "Sell": "Buy"}\nOrder Id: #${this.orderId}\nToken: ${formatToken(this.token)}\nAmount: ${formatBigInt(this.amount)}\nPrice: $ ${formatBigInt(this.price)} / ${formatToken(this.token)}\nTotal: $ ${formatBigInt(this.amount*this.price/BASE_FACTOR)}`;
  }
}
