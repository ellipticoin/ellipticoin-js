const { DEFAULT_FEE, BASE_FACTOR } = require("./constants");
const { find } = require("lodash");

module.exports = class ExchangeCalculator {
  constructor({ fee = DEFAULT_FEE, liquidityTokens = [], baseTokenAddress }) {
    this.fee = fee;
    this.liquidityTokens = liquidityTokens;
    this.baseTokenAddress = baseTokenAddress;
  }

  getOutputAmount(inputAmount, inputTokenAddress, outputTokenAddress) {
    const baseTokenAmount = this.baseTokenAmount(
      inputAmount,
      inputTokenAddress
    );
    return this.tokenAmount(baseTokenAmount, outputTokenAddress);
  }

  getFee(inputAmount, inputTokenAddress, outputTokenAddress) {
    let inputFee;
    let baseTokenAmount;
    if (inputTokenAddress == this.baseTokenAddress) {
      inputFee = 0n;
      baseTokenAmount = inputAmount;
    } else {
      inputFee = (inputAmount * this.fee) / BASE_FACTOR;
      baseTokenAmount = this.baseTokenAmount(inputAmount, inputTokenAddress);
      if (!baseTokenAmount) return;
    }
    let outputFee;
    if (outputTokenAddress == this.baseTokenAddress) {
      outputFee = 0n;
    } else {
      const outputFeeInBaseToken = (baseTokenAmount * this.fee) / BASE_FACTOR;
      if (inputTokenAddress == this.baseTokenAddress) {
        outputFee = outputFeeInBaseToken;
      } else {
        const { poolSupplyOfBaseToken, poolSupplyOfToken } = find(
          this.liquidityTokens,
          ["tokenAddress", inputTokenAddress]
        );
        if (poolSupplyOfToken === 0n) return;
        outputFee =
          (poolSupplyOfToken * outputFeeInBaseToken) / poolSupplyOfBaseToken;
      }
    }
    return inputFee + outputFee;
  }

  getExchangeRate(inputAmount, inputTokenAddress, outputTokenAddress) {
    if (inputTokenAddress == this.baseTokenAddress) {
      return (
        ((inputAmount -
          this.getFee(inputAmount, inputTokenAddress, outputTokenAddress)) *
          BASE_FACTOR) /
        this.getOutputAmount(inputAmount, inputTokenAddress, outputTokenAddress)
      );
    } else {
      const { poolSupplyOfBaseToken, poolSupplyOfToken } = find(
        this.liquidityTokens,
        ["tokenAddress", inputTokenAddress]
      );
      return (
        ((poolSupplyOfBaseToken *
          (inputAmount -
            this.getFee(inputAmount, inputTokenAddress, outputTokenAddress))) /
          poolSupplyOfToken /
          this.getOutputAmount(
            inputAmount,
            inputTokenAddress,
            outputTokenAddress
          )) *
        BASE_FACTOR
      );
    }
  }

  baseTokenAmount(inputAmount, inputTokenAddress) {
    if (inputTokenAddress == this.baseTokenAddress) return inputAmount;
    const { poolSupplyOfToken, poolSupplyOfBaseToken } = find(
      this.liquidityTokens,
      ["tokenAddress", inputTokenAddress]
    );
    return this.calculateOutputAmount(
      poolSupplyOfToken,
      poolSupplyOfBaseToken,
      this.applyFee(inputAmount)
    );
  }

  tokenAmount(baseTokenAmount, outputTokenAddress) {
    if (outputTokenAddress == this.baseTokenAddress) return baseTokenAmount;
    const { poolSupplyOfBaseToken, poolSupplyOfToken } = find(
      this.liquidityTokens,
      ["tokenAddress", outputTokenAddress]
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
