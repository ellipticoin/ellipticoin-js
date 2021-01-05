const {
  BLOCKS_PER_ERA,
  NUMBER_OF_ERAS,
  LAST_BLOCK_OF_FIRST_ERA,
  BASE_FACTOR,
  FIRST_ERA_ISSUANCE_PER_BLOCK,
} = require("./constants");
export function blockReward(blockNumber) {
  if (blockNumber === undefined) return 0n;
  if (blockNumber > BLOCKS_PER_ERA * NUMBER_OF_ERAS) {
    return 0n;
  }

  if (blockNumber <= LAST_BLOCK_OF_FIRST_ERA) {
    return FIRST_ERA_ISSUANCE_PER_BLOCK / BASE_FACTOR;
  }

  const era = BigInt(
    Math.floor(
      Number(
        BigInt(blockNumber || 0) - LAST_BLOCK_OF_FIRST_ERA / BLOCKS_PER_ERA
      )
    ) + 1
  );
  return (128n * BASE_FACTOR) / 2n ** era / BASE_FACTOR;
}
