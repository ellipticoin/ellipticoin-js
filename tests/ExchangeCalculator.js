const test = require("ava");
const ExchangeCalculator = require("../src/ExchangeCalculator");
const { BASE_FACTOR } = require("../src/constants");

test("ExchangeCalculator#getOutputAmount", (t) => {
  const exchangeRateCalculator = new ExchangeCalculator({
    liquidityTokens: [
      {
        id: "APPLES",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
      {
        id: "BANANAS",
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

test("ExchangeCalculator#getFee", (t) => {
  const BASE_FACTOR = 1000000n;
  const exchangeRateCalculator = new ExchangeCalculator({
    liquidityTokens: [
      {
        id: "APPLES",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
      {
        id: "BANANAS",
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
        id: "APPLES",
        poolSupplyOfToken: 100n * BASE_FACTOR,
        poolSupplyOfBaseToken: 100n * BASE_FACTOR,
      },
      {
        id: "BANANAS",
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
