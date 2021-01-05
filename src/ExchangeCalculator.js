const { DEFAULT_FEE, BASE_FACTOR } = require("./constants");
const { find } = require("lodash");

module.exports = class ExchangeCalculator {
  constructor({ fee = DEFAULT_FEE, liquidityTokens = [], baseTokenId }) {
    this.fee = fee;
    this.liquidityTokens = liquidityTokens;
    this.baseTokenId = baseTokenId;
  }

  getOutputAmount(inputAmount, inputTokenId, outputTokenId) {
    const baseTokenAmount = this.baseTokenAmount(inputAmount, inputTokenId);
    return this.tokenAmount(baseTokenAmount, outputTokenId);
  }

  getFee(inputAmount, inputTokenId, outputTokenId) {
    let inputFee;
    let baseTokenAmount;
    if (inputTokenId == this.baseTokenId) {
      inputFee = 0n;
      baseTokenAmount = inputAmount;
    } else {
      inputFee = (inputAmount * this.fee) / BASE_FACTOR;
      baseTokenAmount = this.baseTokenAmount(inputAmount, inputTokenId);
      if (!baseTokenAmount) return;
    }
    let outputFee;
    if (outputTokenId == this.baseTokenId) {
      outputFee = 0n;
    } else {
      const outputFeeInBaseToken = (baseTokenAmount * this.fee) / BASE_FACTOR;
      if (inputTokenId == this.baseTokenId) {
        outputFee = outputFeeInBaseToken;
      } else {
        const { poolSupplyOfBaseToken, poolSupplyOfToken } = find(
          this.liquidityTokens,
          ["id", inputTokenId]
        );
        if (poolSupplyOfToken === 0n) return;
        outputFee =
          (poolSupplyOfToken * outputFeeInBaseToken) / poolSupplyOfBaseToken;
      }
    }
    return inputFee + outputFee;
  }

  getExchangeRate(inputAmount, inputTokenId, outputTokenId) {
    if (inputTokenId == this.baseTokenId) {
      return (
        ((inputAmount - this.getFee(inputAmount, inputTokenId, outputTokenId)) /
          this.getOutputAmount(inputAmount, inputTokenId, outputTokenId)) *
        BASE_FACTOR
      );
    } else {
      const { poolSupplyOfBaseToken, poolSupplyOfToken } = find(
        this.liquidityTokens,
        ["id", inputTokenId]
      );
      return (
        ((poolSupplyOfBaseToken *
          (inputAmount -
            this.getFee(inputAmount, inputTokenId, outputTokenId))) /
          poolSupplyOfToken /
          this.getOutputAmount(inputAmount, inputTokenId, outputTokenId)) *
        BASE_FACTOR
      );
    }
  }

  baseTokenAmount(inputAmount, inputTokenId) {
    if (inputTokenId == this.baseTokenId) return inputAmount;
    const { poolSupplyOfToken, poolSupplyOfBaseToken } = find(
      this.liquidityTokens,
      ["id", inputTokenId]
    );
    return this.calculateOutputAmount(
      poolSupplyOfToken,
      poolSupplyOfBaseToken,
      this.applyFee(inputAmount)
    );
  }

  tokenAmount(baseTokenAmount, outputTokenId) {
    if (outputTokenId == this.baseTokenId) return baseTokenAmount;
    const { poolSupplyOfBaseToken, poolSupplyOfToken } = find(
      this.liquidityTokens,
      ["id", outputTokenId]
    );
    return this.calculateOutputAmount(
      poolSupplyOfBaseToken,
      poolSupplyOfToken,
      this.applyFee(baseTokenAmount)
    );
  }

  calculateOutputAmount(inputSupply, outputSupply, inputAmount) {
    const invariant = inputSupply * outputSupply;
    const newOutputSupply = invariant / (inputSupply + inputAmount);
    return outputSupply - newOutputSupply;
  }

  applyFee(amount) {
    return amount - (amount * this.fee) / BASE_FACTOR;
  }
};
