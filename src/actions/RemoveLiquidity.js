const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const base64url = require("base64url");
const {formatPercentage, formatToken, encodeAddress} = require("../helpers");

module.exports = class RemoveLiquidity  {
  constructor(percentage, token) {
    this.percentage = percentage
    this.token = token
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        RemoveLiquidity: [this.percentage, encodeAddress(this.token)]
    })
 }

  toSignatureString () {
      return `Remove ${formatPercentage(this.percentage)} of my ${formatToken(this.token)} from the liquidity pool`;
  }
}
