const { BLOCKS_PER_ERA, BASE_FACTOR, BTC, ETH } = require("./constants");
export function blockReward(blockNumber, token) {
  if (blockNumber === null) return 0n;
  const era = blockNumber / BLOCKS_PER_ERA;

  if ([BTC, ETH].includes(token)) {
    return (BASE_FACTOR * 128n * 10n ** 6n) / 2n ** era / 10n ** 8n / 2n;
  } else {
    return 0n;
  }
}
