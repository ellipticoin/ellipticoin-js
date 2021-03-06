const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const {formatBigInt} = require("../helpers");
const base64url = require("base64url");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Vote {
  constructor(proposalId, affirmative) {
    this.proposalId = proposalId
    this.affirmative = affirmative
  }

  encodeCBOR (encoder) {
    return encoder.pushAny({
        Vote: [this.proposalId, this.affirmative? "For": "Against"]
    })
 }

  toSignatureString () {
      return `Vote ${this.affirmative? "Yes": "No"} on MS ${this.proposalId}`;
  }
}
