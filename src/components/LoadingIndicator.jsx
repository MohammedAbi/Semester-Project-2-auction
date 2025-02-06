import React from "react";

function LoadingIndicator({ size = "w-6 h-6", color = "border-blue-600" }) {
  return (
    <div
      className={`border-4 ${color} border-t-transparent rounded-full ${size} animate-spin`}
    ></div>
  );
}

export default LoadingIndicator;
