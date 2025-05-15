import React, { useEffect, useState } from "react";


const CountdownTimer = ({ text = "Ends in ", endTime,className='text-12 text-C8789C3' }) => {
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

  return (
    <p className={`ml-6  ${className}`} >{text} {formatTime(timeLeft)}</p>
  );
};

export default CountdownTimer;
