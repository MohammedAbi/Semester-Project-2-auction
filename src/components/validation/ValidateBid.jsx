import React from "react";

function ValidateBid(bidAmount, latestBid = 0) {
  if (isNaN(bidAmount) || bidAmount <= 0) {
    return "Please enter a valid bid amount.";
  }
  if (bidAmount <= latestBid) {
    return `Bid must be higher than $${latestBid}.`;
  }
  return "";
}

export default ValidateBid;
