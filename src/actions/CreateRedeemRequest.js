const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt, formatToken, encodeAddress} = require("../helpers");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class CreateRedeemRequest {
  constructor(amount, token) {
    this.amount = amount
    this.token = token

  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        CreateRedeemRequest: [this.amount, encodeAddress(this.token)]

    })
  }

  toSignatureString () {
      return `Redeem ${formatBigInt(this.amount)} ${formatToken(this.token)}`;
  }
}
