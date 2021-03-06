const { BLOCKS_PER_ERA, BASE_FACTOR, BTC, ETH } = require("./constants");
export function blockReward(blockNumber, token) {
  if (blockNumber === null) return 0n;
  const era = Math.round(Number(blockNumber) / Number(BLOCKS_PER_ERA));

  if ([BTC, ETH].includes(token)) {
    return BigInt(
      (Number(BASE_FACTOR) * 128 * 10 ** 6) / 2 ** era / 10 ** 8 / 2
    );
  } else {
    return 0n;
  }
}
