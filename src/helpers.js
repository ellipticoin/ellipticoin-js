const { ethers } = require("ethers");
const { capitalize } = require("lodash");
const { BASE_FACTOR, TICKERS, BTC } = require("../src/constants");
const { arrayify, hexlify, getAddress, isAddress } = ethers.utils;

const ACTIONS = [
  {
    f: "Pay",
    regexp: /Pay (.*) (.*) (.*)/,
    types: ["address", "u64", "address"],
  },
  {
    f: "CreateOrder",
    regexp: /Create a limit order to (.*) (.*) (.*) for \$(.*) each/,
    types: ["OrderType", "u64", "address", "u64"],
  },
];
function formatToken(token) {
  return TICKERS[token] ? TICKERS[token] : formatAddress(token);
}

function formatAddress(token) {
  return getAddress(hexlify(Buffer.from(token, "base64")));
}

function encodeAddress(address) {
  return Array.from(arrayify(hexlify(Buffer.from(address, "base64"))));
}

function encodeFormattedAddress(address) {
  if (Object.keys(TICKERS)[Object.values(TICKERS).indexOf(address)]) {
    address = hexlify(
      Buffer.from(
        Object.keys(TICKERS)[Object.values(TICKERS).indexOf(address)],
        "base64"
      )
    );
  }

  if (isAddress(address)) {
    return Array.from(arrayify(address));
  }
}

function encodeFormattedBigInt(bigInt) {
  const number = parseFloat(bigInt.replace(",", ""));

  return isNaN(number) ? null : BigInt(number * Number(BASE_FACTOR));
}

function encodeActions(string) {
  if (string === "") return [];
  const actions = string.split("\n").map(encodeAction);
  if (actions.some((action) => action === null)) return null;
  return actions;
}

function encodeAction(string) {
  const action = ACTIONS.find((actions) => actions.regexp.exec(string));
  if (!action) return null;
  const arguments = action.regexp.exec(string).slice(1);

  return {
    [action.f]: arguments.map((argument, argumentIndex) => {
      switch (action.types[argumentIndex]) {
        case "address":
          return encodeFormattedAddress(argument);
        case "u64":
          return encodeFormattedBigInt(argument);
        case "OrderType":
          return capitalize(argument);
      }
    }),
  };
}

function formatBigInt(n) {
  const [number, decimal] = (Number(n) / Number(BASE_FACTOR))
    .toFixed(6)
    .toString()
    .split(".");
  return `${numberWithCommas(number)}.${decimal}`;
}

function formatPercentage(n) {
  return (Number(n * 100n) / Number(BASE_FACTOR)).toFixed(4).toString() + "%";
}

function numberWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
module.exports = {
  encodeActions,
  encodeAddress,
  formatAddress,
  formatBigInt,
  formatPercentage,
  formatToken,
};
