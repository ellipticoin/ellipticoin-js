const test = require("ava");
const ExchangeCalculator = require("../src/ExchangeCalculator");
const { BASE_FACTOR } = require("../src/constants");

test("ExchangeCalculator#getOutputAmount", (t) => {
  const exchangeRateCalculator = new ExchangeCalculator({
    liquidityTokens: [
      {
        tokenAddress: "APPLES",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
      {
        tokenAddress: "BANANAS",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
    ],
    baseToken: "USD",
  });
  t.is(
    exchangeRateCalculator.getOutputAmount(
      100n * BASE_FACTOR,
      "APPLES",
      "BANANAS"
    ),
    33_233_234n
  );
});

test("ExchangeCalculator#getOutputAmount for small amounts", (t) => {
  const exchangeRateCalculator = new ExchangeCalculator({
    liquidityTokens: [
      {
        tokenAddress: "APPLES",
        poolSupplyOfToken: 107548n,
        poolSupplyOfBaseToken: 317493391985n,
      },
      {
        tokenAddress: "BANANAS",
        poolSupplyOfToken: 1360361n,
        poolSupplyOfBaseToken: 143369453579n,
      },
    ],
    baseToken: "USD",
  });
  t.is(
    exchangeRateCalculator.getOutputAmount(
      172n,
      "APPLES",
      "BANANAS"
    ),
    4752n
  );
});

test("ExchangeCalculator#getFee", (t) => {
  const BASE_FACTOR = 1000000n;
  const exchangeRateCalculator = new ExchangeCalculator({
    liquidityTokens: [
      {
        tokenAddress: "APPLES",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
      {
        tokenAddress: "BANANAS",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
    ],
  });
  t.is(
    exchangeRateCalculator.getFee(100n * BASE_FACTOR, "APPLES", "BANANAS"),
    449774n
  );
});

test("ExchangeCalculator#getExchangeRate", (t) => {
  const exchangeRateCalculator = new ExchangeCalculator({
    liquidityTokens: [
      {
        tokenAddress: "APPLES",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
      {
        tokenAddress: "BANANAS",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
    ],
    baseToken: "USD",
  });
  t.is(
    exchangeRateCalculator.getExchangeRate(
      100n * BASE_FACTOR,
      "APPLES",
      "BANANAS"
    ),
    2000000n
  );
});
