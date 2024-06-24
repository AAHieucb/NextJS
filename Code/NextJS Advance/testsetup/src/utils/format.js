import BigNumber from "bignumber.js";
import { isNumeric } from "./index";

export function formatAddress(address) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export function formatTokenId(id, length = 6) {
  const preLength = length - String(id).length < 0 ? 0 : length - String(id).length;
  return "0".repeat(preLength) + String(id);
}

export function formatCollectionId(id, length = 6) {
  return "C" + formatTokenId(id, length);
}

// export function formatPrice(price) {
//   if (price < 1e6) return numberWithCommas(Number(price.toFixed(4)));
//   if (price < 1e15) return compactNumber(price);
//   return BigNumber(price).toExponential(1);
// }
export function formatPrice(price) {
  if (price < 1e6) return numberWithCommas(Number(price.toFixed(4)));
  if (price < 1e15) {
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixNum = Math.floor((("" + parseInt(price)).length - 1) / 3);
    let shortValue = parseFloat((price / Math.pow(1000, suffixNum)).toFixed(1));
    return shortValue + suffixes[suffixNum];
  } 
  return BigNumber(price).toExponential(1);
}

/**
 * Compact large number
 * @param {*} n The number
 * @param {Number} fractionDigits Number of digits after the decimal point
 */
export function compactNumber(n, fractionDigits = 1) {
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor((("" + parseInt(n)).length - 1) / 3);

  let shortValue = parseFloat((n / Math.pow(1000, suffixNum)).toPrecision(fractionDigits + 1));

  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(fractionDigits);
  }

  return shortValue + suffixes[suffixNum];
}

export function numberWithCommas(x, fractionDigits) {
  const [naturalPart, decimalPart] = x.toString().split(".");
  let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (decimalPart) {
    if (!isNumeric(fractionDigits)) {
      out += "." + decimalPart;
    } else if (decimalPart.length >= fractionDigits) {
      out += "." + decimalPart.substr(0, fractionDigits);
    } else {
      out += "." + decimalPart + "0".repeat(fractionDigits - decimalPart.length);
    }
  }
  return out;
}

export function seconds_to_days_hours_mins_secs_str(seconds) {
  // day, h, m and s
  var days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  var hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return (0 < days ? days + " days, " : "") + hours + " : " + minutes + " : " + Math.round(seconds);
}

export function seconds_to_hours_mins_secs_str(seconds) {
  // day, h, m and s
  var days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  var hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  var minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  hours += days * 24;
  return (
    (hours <= 9 ? "0" + hours : hours) +
    " : " +
    (minutes <= 9 ? "0" + minutes : minutes) +
    " : " +
    (Math.round(seconds) <= 9 ? "0" + Math.round(seconds) : Math.round(seconds))
  );
}
