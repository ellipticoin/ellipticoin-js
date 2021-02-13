const test = require("ava");
const Transaction = require("../src/Transaction");
const Transfer = require("../src/actions/Transfer");
const { BASE_FACTOR, ELC } = require("../src/constants");

test.only("Transaction#toString", (t) => {
  const action = new Transfer(
    12345n * BASE_FACTOR,
    ELC,
    "0x1D6bB7047Fd6e47a935D816297e0b4f9113ed023"
  );
  const transaction = new Transaction({
    networkId: 1,
    transactionNumber: 1,
    action,
  });
  t.is(
    transaction.toSignatureString(),
    "Network ID: 1\nNonce: 1\nAction: Transfer 12,345.000000 ELC to 0x1D6bB7047Fd6e47a935D816297e0b4f9113ed023"
  );
});
