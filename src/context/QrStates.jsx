import React, { useState } from "react";
import QrContext from "./QrContext";

const QrStates = (props) => {

  // Current QR value
  const [qrValue, setQrValue] = useState("");

  // Load history from localStorage
  const [qrHistory, setQrHistory] = useState(
    JSON.parse(localStorage.getItem("qrHistory")) || []
  );

  // Function to update history
  const updateQrHistory = (value) => {

    if (!value) return;

    let updatedHistory = [
      value,
      ...qrHistory.filter((item) => item !== value)
    ];

    // Keep only last 10
    updatedHistory = updatedHistory.slice(0, 10);

    setQrHistory(updatedHistory);

    localStorage.setItem("qrHistory", JSON.stringify(updatedHistory));
  };

  // Optional: clear history
  const clearQrHistory = () => {
    setQrHistory([]);
    localStorage.removeItem("qrHistory");
  };

  return (
    <QrContext.Provider
      value={{
        qrValue,
        setQrValue,
        qrHistory,
        updateQrHistory,
        clearQrHistory
      }}
    >
      {props.children}
    </QrContext.Provider>
  );
};

export default QrStates;
