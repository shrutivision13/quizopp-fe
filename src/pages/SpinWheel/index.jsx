import React, { useRef, useState, useEffect } from 'react';
import spinbtn from "../../assets/images/spinwheel_pointer.png";
import sliceImage from "../../assets/images/coin.png";  // Add your image for the slice
import emoji from "../../assets/images/emoji.png";  // Add your image for the slice

const WheelCanvas = () => {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const wheelData = [
    { label: '100', color1: '#561DB0', color2: '#8747ec', image: sliceImage, textColor: '#FFFFFF' },
    { label: '25', color1: '#FFFF', color2: '#F3F3F3', image: sliceImage, textColor: '#000000' },
    { label: '', color1: '#E0BE0B', color2: '#fcdc31', image: emoji, textColor: '#FFFFFF' },
    { label: '500', color1: '#FFFF', color2: '#F3F3F3', image: sliceImage, textColor: '#000000' },
    { label: '20', color1: '#561DB0', color2: '#8747ec', image: sliceImage, textColor: '#FFFFFF' },
    { label: '50', color1: '#FFFF', color2: '#F3F3F3', image: sliceImage, textColor: '#000000' },
    { label: '', color1: '#E0BE0B', color2: '#fcdc31', image: emoji, textColor: '#FFFFFF' },
  ];



  // Pre-load images
  const images = useRef([]);

  useEffect(() => {
    // Create image objects and load them
    const imagePromises = wheelData.map(slice => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = slice.image;
        img.onload = () => {
          images.current.push(img); // Store the loaded images
          resolve();
        };
      });
    });

    // Wait for all images to load
    Promise.all(imagePromises).then(() => {
      //  setImagesLoaded(true); // All images are loaded
    });
  }, []);


  const drawWheel = (ctx) => {
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = canvasRef.current.width / 2;
    const sliceAngle = (2 * Math.PI) / wheelData.length;

    wheelData.forEach((slice, index) => {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, slice.color1);
      gradient.addColorStop(1, slice.color2);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        sliceAngle * index,
        sliceAngle * (index + 1)
      );
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw text on the slices with space above it
      ctx.save();
      const textX = centerX + Math.cos(sliceAngle * (index + 0.5)) * radius * 0.7;
      const textY = centerY + Math.sin(sliceAngle * (index + 0.5)) * radius * 0.7; // Space above text

      ctx.translate(textX, textY);
      ctx.rotate(sliceAngle * (index + 0.5) + Math.PI / 2);
      ctx.fillStyle = slice.textColor; // Use the text color from the array
      ctx.font = '600 24px Math';
      ctx.fillText(slice.label, -ctx.measureText(slice.label).width / 2, 20);

      // Adjust the position of the image to have space from the text
      const img = new Image();
      img.src = slice.image;
      // const img = images.current[index];
      if (img) {
        // ctx.drawImage(img, imageX, imageY, 25, 25); // Adjust image size and position
        ctx.drawImage(img, slice?.label ? -10 : -20, slice?.label ? -30 : -15, slice?.label ? 25 : 40, slice?.label ? 25 : 40); // Adjust image size and position
      }

      ctx.restore();
    });

  };




  const handleSpin = () => {
    setRotation(0);
    if (isSpinning) return;

    setIsSpinning(true);

    const spinDuration = Math.random() * 3000 + 3000; // Random spin duration
    const spinSpeed = Math.random() * 10 + 5; // Random speed

    let currentRotation = rotation;

    const spinInterval = setInterval(() => {
      currentRotation += spinSpeed;
      setRotation(currentRotation);
    }, 10);

    setTimeout(() => {
      clearInterval(spinInterval);
      setIsSpinning(false);
    }, spinDuration);
  };


  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 340;
    canvas.height = 340;

    // Re-render the wheel whenever the rotation state changes
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous rendering
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); // Move to center of canvas
    ctx.rotate((rotation * Math.PI) / 180); // Apply rotation
    ctx.translate(-canvas.width / 2, -canvas.height / 2); // Move back to original position

    drawWheel(ctx); // Draw the wheel
    ctx.restore();
  }, [rotation]);

  return (
    <div className='flex items-center justify-center relative'>
      <canvas ref={canvasRef}></canvas>
      <button
        onClick={handleSpin}
        style={{
          position: 'absolute',
          top: '48%',  // Center vertically
          left: '50%', // Center horizontally
          zIndex: 10,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transform: 'translate(-50%, -50%)'  // Precisely center the button
        }}
      >
        <img
          src={spinbtn}  // Image for the spin button
          alt="spin button"
          style={{ width: '68px', height: '77px' }} // You can adjust the image size
        />
      </button>
    </div>
  );
};

export default WheelCanvas;


