import React, { useEffect, useRef, useState } from "react";

const SpinWheel = () => {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const segments = [
    { id: 7, amount: 50, image: "https://static.quizzop.com/newton/assets/spinwheel-coins-white.png" },
    { id: 6, amount: 0, image: "https://static.quizzop.com/newton/assets/spinwheel-emoji-yellow.png" },
    { id: 5, amount: 100, image: "https://static.quizzop.com/newton/assets/spinwheel-coins-purple.png" },
    { id: 4, amount: 250, image: "https://static.quizzop.com/newton/assets/spinwheel-coins-white.png" },
    { id: 3, amount: 0, image: "https://static.quizzop.com/newton/assets/spinwheel-emoji-yellow.png" },
    { id: 2, amount: 500, image: "https://static.quizzop.com/newton/assets/spinwheel-coins-white.png" },
    { id: 1, amount: 20, image: "https://static.quizzop.com/newton/assets/spinwheel-coins-purple.png" },
  ];

  const drawWheel = (ctx, size) => {
    const center = size / 2;
    const anglePerSegment = (2 * Math.PI) / segments.length;

    // Clear previous drawings
    ctx.clearRect(0, 0, size, size);

    segments.forEach((segment, i) => {
      const startAngle = anglePerSegment * i;
      const endAngle = anglePerSegment * (i + 1);
      const midAngle = (startAngle + endAngle) / 2;

      // Draw pie segment
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, center, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? '#FFD700' : '#FFEC8B';
      ctx.fill();

      // Load image and draw rotated
      const img = new Image();
      img.src = segment.image;
      img.onload = () => {
        const imgSize = 100;
        const radiusOffset = center * 0.65;
      
        ctx.save();
        ctx.translate(center, center);         // Move to center
        ctx.rotate(-140*i);    // Rotate image tangent to arc
        ctx.drawImage(
          img,
          radiusOffset - imgSize / 2,
          -imgSize / 2,
          imgSize,
          imgSize
        );
        ctx.restore();
      };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawWheel(ctx, 300);
  }, [rotation]);

  const spin = () => {
    if (spinning) return;

    const spins = 5 + Math.random() * 3;
    const degrees = 360 * spins;
    const newRotation = rotation + degrees;

    setSpinning(true);
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
    }, 4000);
  };
  const radius = 120; // distance from center
  const angleStep = 360 / segments.length;

  return (
    <div className="flex flex-col items-center bg-[#0b0d26] min-h-screen py-8 px-4 text-white">
      <h1 className="text-xl font-bold mb-4 text-center">Spin the wheel and win coins!</h1>

      <div className="relative w-[300px] h-[300px]">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 4s ease-out" : "none",
            borderRadius: "50%",
            border: "8px solid #222",
          }}
        />
 <div className="wheel">
      {segments.map((segment, index) => {
        const angle = angleStep * index;
        console.log("🚀 ~ {segments.map ~ angle:", angle)
        const style = {
          transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle-20}deg)`,
        };

        return (
          <div key={segment.id} className="segment" style={style}>
            <img src={segment.image} alt={`Prize ${segment.amount}`} />
          </div>
        );
      })}
    </div>
        <img
          src="https://static.quizzop.com/newton/assets/spinwheel_pointer.png"
          alt="pointer"
          className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 w-8 z-30"
        />

        <button
          onClick={spin}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white w-16 h-16 rounded-full border-4 border-white z-20 font-bold shadow-lg"
        >
          SPIN
        </button>
      </div>

      <p className="text-center text-white mt-6 text-sm">
        Win up to <img src="https://static.quizzop.com/newton/assets/coin.png" alt="coin" className="inline h-4" />
        <span className="font-bold"> 500</span> with each spin.<br />Try your luck now!
      </p>

      <button
        onClick={spin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 mt-10 rounded-md font-bold shadow-lg border-b-4 border-yellow-400"
      >
        SPIN THE WHEEL
      </button>
    </div>
  );
};

export default SpinWheel;
