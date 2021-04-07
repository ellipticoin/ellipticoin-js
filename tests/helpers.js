const test = require("ava");
const Transaction = require("../src/Transaction");
const { encodeActions } = require("../src/helpers");
const { BASE_FACTOR, MS } = require("../src/constants");
const { ethers } = require("ethers");
const { arrayify } = ethers.utils;

test("#encodeActions - Pay", (t) => {
  t.deepEqual(
    encodeActions(
      `Pay 0xAdfe2B5BeAc83382C047d977db1df977FD9a7e41 600,000.000000 MS`
    ),
    [
      {
        Pay: [
          Array.from(arrayify("0xAdfe2B5BeAc83382C047d977db1df977FD9a7e41")),
          600000000000n,
          Array.from(Buffer.from(MS, "base64")),
        ],
      },
    ]
  );
});

test("#encodeActions - Create Order", (t) => {
  t.deepEqual(
    encodeActions(
      "Create a limit order to sell 500.000000 MS for $ 1.000000 each"
    ),
    [
      {
        CreateOrder: [
          "Sell",
          500000000n,
          Array.from(Buffer.from(MS, "base64")),
          1000000n,
        ],
      },
    ]
  );
});
