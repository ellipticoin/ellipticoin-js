const { ethers } = require("ethers");
const { BASE_FACTOR, TICKERS, BTC } = require("../src/constants");
const { arrayify, hexlify, getAddress } = ethers.utils;

function formatToken(token) {
  return TICKERS[token] ? TICKERS[token] : formatAddress(token);
}

function formatAddress(token) {
  return getAddress(hexlify(Buffer.from(token, "base64")));
}

function encodeAddress(address) {
  return Array.from(arrayify(hexlify(Buffer.from(address, "base64"))));
}

function formatBigInt(n) {
  const [number, decimal] = (Number(n) / Number(BASE_FACTOR))
    .toFixed(6)
    .toString()
    .split(".");
  return `${numberWithCommas(number)}.${decimal}`;
}

function formatPercentage(n) {
    return (Number(n * 100n) / Number(BASE_FACTOR))
    .toFixed(4)
    .toString() + "%";
}

function numberWithCommas(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
module.exports = {
  formatPercentage,
  encodeAddress,
  formatBigInt,
  formatToken,
};
