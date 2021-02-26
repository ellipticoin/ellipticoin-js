const { BLOCKS_PER_ERA, BASE_FACTOR, BTC, ETH } = require("./constants");
export function blockReward(blockNumber, token) {
  if (blockNumber === null) return 0n;
  const era = Math.round(Number(blockNumber) / Number(BLOCKS_PER_ERA));

  if ([BTC, ETH].includes(token)) {
    return (BASE_FACTOR * 128n * 10n ** 6) / 2n ** era / 10n ** 8 / 2n;
  } else {
    return 0n;
  }
}
