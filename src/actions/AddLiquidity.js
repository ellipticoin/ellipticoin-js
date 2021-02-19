const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const base64url = require("base64url");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");

module.exports = class AddLiquidity  {
  constructor(amount, token) {
    this.amount = amount
    this.token = token
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        AddLiquidity: [this.amount, encodeAddress(this.token)]
    })
 }

  toSignatureString () {
      return `Add ${formatBigInt(this.amount)} ${formatToken(this.token)} to the liquidity pool`;
  }
}
