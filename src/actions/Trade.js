const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Trade {
  constructor(inputAmount, inputToken, minimumOutputAmount, outputToken) {
    this.inputAmount = inputAmount
    this.inputToken = inputToken
    this.minimumOutputAmount = minimumOutputAmount
    this.outputToken = outputToken

  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        Trade: [this.inputAmount, encodeAddress(this.inputToken), this.minimumOutputAmount, encodeAddress(this.outputToken)]

    })
  }

  toSignatureString () {
      console.log(this)
      return `Trade ${formatBigInt(this.inputAmount)} ${formatToken(this.inputToken)} for at least ${formatBigInt(this.minimumOutputAmount)} ${formatToken(this.outputToken)}`;
  }
}
