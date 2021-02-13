const { ethers } = require("ethers");
const { TICKERS } = require("./constants");
const { formatBigInt } = require("./helpers");
const { arrayify, hexlify, getAddress } = ethers.utils;

module.exports = class Transaction {
  constructor({ networkId, transactionNumber, action }) {
    this.networkId = networkId;
    this.transactionNumber = transactionNumber;
    this.action = action;
  }

  toSignatureString() {
    return `Network ID: ${this.networkId}\nTransaction Number: ${
      this.transactionNumber
    }\nAction: ${this.action.toSignatureString()}`;
  }
};
