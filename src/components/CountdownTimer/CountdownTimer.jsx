import React, { useEffect, useState } from "react";

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(
    endTime - Math.floor(Date.now() / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = endTime - now;
      setTimeLeft(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval); // Clean up on unmount
  }, [endTime]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  console.log(formatTime(timeLeft));

  return (
    <p className="ml-6 text-12 text-C8789C3">Ends in {formatTime(timeLeft)}</p>
  );
};

export default CountdownTimer;
