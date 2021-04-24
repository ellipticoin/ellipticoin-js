const { DEFAULT_FEE, BASE_FACTOR } = require("./constants");
const { find } = require("lodash");

module.exports = class ExchangeCalculator {
  constructor({ fee = DEFAULT_FEE, liquidityTokens = [], baseTokenAddress }) {
    this.FEE = fee;
    this.liquidityTokens = liquidityTokens;
    this.baseTokenAddress = baseTokenAddress;
  }

  getOutputAmount(inputAmount, inputTokenAddress, outputTokenAddress) {
    const baseTokenAmount = this.sell(inputAmount, inputTokenAddress);
    console.log(`base token amount: ${baseTokenAmount}`)
    console.log(`token amount: ${this.buy(baseTokenAmount, outputTokenAddress)}`)
    return this.buy(baseTokenAmount, outputTokenAddress);
  }

  getFee(inputAmount, inputTokenAddress, outputTokenAddress) {
    let inputFee;
    let baseTokenAmount;
    if (inputTokenAddress == this.baseTokenAddress) {
      inputFee = 0n;
      baseTokenAmount = inputAmount;
    } else {
      inputFee = (inputAmount * this.FEE) / BASE_FACTOR;
      baseTokenAmount = this.sell(inputAmount, inputTokenAddress);
      if (!baseTokenAmount) return;
    }
    let outputFee;
    if (outputTokenAddress == this.baseTokenAddress) {
      outputFee = 0n;
    } else {
      const outputFeeInBaseToken = (baseTokenAmount * this.FEE) / BASE_FACTOR;
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

  sell(inputAmount, inputTokenAddress) {
    if (inputTokenAddress == this.baseTokenAddress) return inputAmount;
    const { poolSupplyOfToken, poolSupplyOfBaseToken } = find(
      this.liquidityTokens,
      ["tokenAddress", inputTokenAddress]
    );
    return this.calculateOutputAmount(
      poolSupplyOfToken,
      poolSupplyOfBaseToken,
      inputAmount - this.fee(inputAmount)
    );
  }

  buy(baseTokenAmount, outputTokenAddress) {
    if (outputTokenAddress == this.baseTokenAddress) return baseTokenAmount;
    const { poolSupplyOfBaseToken, poolSupplyOfToken } = find(
      this.liquidityTokens,
      ["tokenAddress", outputTokenAddress]
    );
    console.log(`pool supply of token: ${poolSupplyOfToken}`)
    console.log(`pool supply of base token: ${poolSupplyOfBaseToken}`)
    return this.calculateOutputAmount(
      poolSupplyOfBaseToken,
      poolSupplyOfToken,
      baseTokenAmount - this.fee(baseTokenAmount)
    );
  }

  calculateOutputAmount(inputSupply, outputSupply, inputAmount) {
    const invariant = inputSupply * outputSupply;
    const newOutputSupply = invariant / (inputSupply + inputAmount);
    return outputSupply - newOutputSupply;
  }

  fee(amount) {
    const fee = (amount * this.FEE) / BASE_FACTOR;
    return fee === 0n ? 1n : fee;
  }
};
