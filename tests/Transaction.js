const test = require("ava");
const Transaction = require("../src/Transaction");
const Pay = require("../src/actions/Pay");
const { BASE_FACTOR, MS } = require("../src/constants");

test("Transaction#toString", (t) => {
  const action = new Pay(
    "0x1D6bB7047Fd6e47a935D816297e0b4f9113ed023",
    12345n * BASE_FACTOR,
    MS
  );
  const transaction = new Transaction({
    networkId: 1,
    transactionNumber: 1,
    action,
  });
  t.is(
    transaction.toSignatureString(),
    "Network ID: 1\nTransaction Number: 1\nAction: Pay 0x1D6bB7047Fd6e47a935D816297e0b4f9113ed023 12,345.000000 MS"
  );
});
