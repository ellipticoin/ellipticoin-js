const test = require("ava");
const Transaction = require("../src/Transaction");
const Transfer = require("../src/actions/Transfer");
const { encodeActions } = require("../src/helpers");
const { BASE_FACTOR, ELC } = require("../src/constants");
const { ethers } = require("ethers");
const { arrayify } = ethers.utils;

test("#encodeActions", (t) => {
  t.deepEqual(
    encodeActions(
      `Pay 600,000.000000 ELC to 0xAdfe2B5BeAc83382C047d977db1df977FD9a7e41`
    ),
    [
      {
        Pay: [
          600000000n,
          Array.from(Buffer.from(ELC, "base64")),
          Array.from(arrayify("0xAdfe2B5BeAc83382C047d977db1df977FD9a7e41")),
        ],
      },
    ]
  );
});
