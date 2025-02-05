import React from "react";

function ValidateBid(bidAmount, latestBid) {
  if (isNaN(bidAmount) || bidAmount <= 0) {
    return "Please enter a valid bid amount.";
  }
  if (bidAmount <= latestBid) {
    return `Bid must be higher than $${latestBid}.`;
  }
  return "";
}

export default ValidateBid;
