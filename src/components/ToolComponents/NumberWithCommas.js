import React from "react";

export const NumberWithCommas = (num) => {
  const number = Math.floor(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return number;
};
