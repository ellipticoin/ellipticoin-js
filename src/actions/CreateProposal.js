const { ethers } = require("ethers");
const {TICKERS} = require("../constants");
const base64url = require("base64url");
const {encodeActions} = require("../helpers");

module.exports = class CreateProposal {
  constructor(title, subtitle, content, actions) {
    this.title = title
    this.subtitle = subtitle
    this.content = content
    this.actions = actions
  }

  encodeCBOR (encoder) {
    console.log(this.actions)
    console.log(encodeActions(this.actions))
    return encoder.pushAny({
        CreateProposal: [this.title, this.subtitle, this.content, encodeActions(this.actions)]
    })
 }

  toSignatureString () {
      return `Create Proposal\nTitle: ${this.title}\nSubtitle: ${this.subtitle}\nContent: ${this.content}\nActions: ${this.actions}`;
  }
}