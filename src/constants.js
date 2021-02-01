const BASE_FACTOR = 1000000n;
const BLOCKS_PER_ERA = 8000000n;
const NUMBER_OF_ERAS = 8n;
const PROTOTYPE_ISSUANCE = 130036019000n;
const FIRST_ERA_ISSUANCE_PER_BLOCK = (BASE_FACTOR * 128n) / 100n;
const LAST_BLOCK_OF_FIRST_ERA =
  BLOCKS_PER_ERA * FIRST_ERA_ISSUANCE_PER_BLOCK -
  PROTOTYPE_ISSUANCE / FIRST_ERA_ISSUANCE_PER_BLOCK;
const DEFAULT_FEE = 3000n;
const ELC = Buffer.from(
    "0000000000000000000000000000000000000001",
    "hex"
  ).toString("base64")
const ETH = Buffer.from(
    "eb4c2781e4eba804ce9a9803c67d0893436bb27d",
    "hex"
  ).toString("base64")
const BTC = Buffer.from(
    "6b175474e89094c44da98b954eedeac495271d0f",
    "hex"
  ).toString("base64")
const USD = Buffer.from(
    "6b175474e89094c44da98b954eedeac495271d0f",
    "hex"
  ).toString("base64")
const TICKERS = {
  [ELC]: "ELC",
  [ETH]: "ETH",
  [BTC]: "BTC",
  [USD]: "USD",
};

module.exports = {
    BTC,
    ELC,
    ETH,
  BASE_FACTOR,
  BLOCKS_PER_ERA,
  DEFAULT_FEE,
  FIRST_ERA_ISSUANCE_PER_BLOCK,
  LAST_BLOCK_OF_FIRST_ERA,
  NUMBER_OF_ERAS,
  TICKERS,
USD,
};
