import React, { useRef, useState, useEffect } from 'react';
import spinbtn from "../../assets/images/spinwheel_pointer.png";
import sliceImage from "../../assets/images/coin.png";  // Add your image for the slice
import emoji from "../../assets/images/emoji.png";  // Add your image for the slice
import wheelImage from "../../assets/images/spinwheel_modal.webp";  // Add your image for the slice
import CloseIcon from '../../components/Icons/CloseIcon';
import Coins from '../../components/Icons/Coins';
import AdVideoIcon from '../../components/Icons/AdVideoIcon';
import { ApiGetSpinWheel, ApiSpinWheel } from '../../api-wrapper/SpinWheel/ApiSpinWheel';
import { toast } from 'react-toastify';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';

const WheelCanvas = () => {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [spinCount, setSpinCount] = useState(2);
  const [spinTimer, setSpinTimer] = useState(0);
  const [rotate, setRotate] = useState(false);
  const [winCoin, setWinCoin] = useState(0);
  const [firstTimeout, setFirstTimeout] = useState(false);
  const [wheelData, setwheelData] = useState([
    { label: '100', color1: '#561DB0', color2: '#8747ec', image: sliceImage, textColor: '#FFFFFF' },
    { label: '25', color1: '#FFFF', color2: '#F3F3F3', image: sliceImage, textColor: '#000000' },
    { label: '', color1: '#E0BE0B', color2: '#fcdc31', image: emoji, textColor: '#FFFFFF' },
    { label: '500', color1: '#FFFF', color2: '#F3F3F3', image: sliceImage, textColor: '#000000' },
    { label: '20', color1: '#561DB0', color2: '#8747ec', image: sliceImage, textColor: '#FFFFFF' },
    { label: '50', color1: '#FFFF', color2: '#F3F3F3', image: sliceImage, textColor: '#000000' },
    { label: '', color1: '#E0BE0B', color2: '#fcdc31', image: emoji, textColor: '#FFFFFF' },
  ]
  );



  // Pre-load images
  const images = useRef([]);

  const imagePromises = async () => {
    if (images.current.length > 0) {
      return;
    }
    const imagePromises = wheelData.map(slice => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = slice.image;
        img.onload = () => {
          images.current.push(img); 
          resolve();
        };
      });
    });

    await Promise.all(imagePromises).then(() => {
      //  setImagesLoaded(true); // All images are loaded
    });
  };

  useEffect(() => {
    imagePromises();
    getSpinData()

  }, []);

  const getSpinData = async()=>{
    await ApiGetSpinWheel().then(({data}) => {
      setSpinCount(data?.spinCount);
      setSpinTimer(data?.nextSpinAllowedAt);
      if(data?.spinCount == 2){
        setRotate(true);
      }
      
    }).catch((err) => toast.error(err?.data?.error || err?.message, {
      className: "custom-error-toast",
      bodyClassName: "custom-error-toast-body",
      closeButton: false,
      progress: undefined,
    }));
  }

  function shuffleArray(array) {

    const times = Math.floor(Math.random() * 3) + 2; 

    const count = times % array.length;
    return array.slice(count).concat(array.slice(0, count));

  }



  const drawWheel = async (ctx) => {
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;
    const radius = canvasRef.current.width / 2;
    const sliceAngle = (2 * Math.PI) / wheelData.length;

    if (!firstTimeout) {
      await new Promise(resolve => setTimeout(() => { setFirstTimeout(true); resolve() }, 100));
    }

    wheelData.forEach(async (slice, index) => {
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
      ctx.save();
      const textX = centerX + Math.cos(sliceAngle * (index + 0.5)) * radius * 0.7;
      const textY = centerY + Math.sin(sliceAngle * (index + 0.5)) * radius * 0.7; // Space above text

      ctx.translate(textX, textY);
      ctx.rotate(sliceAngle * (index + 0.5) + Math.PI / 2);
      ctx.fillStyle = slice.textColor; 
      ctx.font = '600 24px Math';
      ctx.fillText(slice.label, -ctx.measureText(slice.label).width / 2, 20);

      const newimg = new Image();
      newimg.src = slice.image;
      let img = newimg||images.current[index];
    
      if (img) {
        ctx.drawImage(img, slice?.label ? -10 : -20, slice?.label ? -30 : -15, slice?.label ? 25 : 40, slice?.label ? 25 : 40); // Adjust image size and position
      }

      ctx.restore();
    });

  };




  const handleSpin = () => {
    setDrawer(false);
    if (rotate) {
      setDrawer(true);
      setRotate(false);
      return
    }
    
    if (isSpinning) return;

    setIsSpinning(true);

    const spinDuration = Math.random() * 3000 + 3000; 
    const spinSpeed = Math.random() * 10 + 5; 
    
    let currentRotation = rotation;

    const spinInterval = setInterval(() => {
      currentRotation += spinSpeed;
      setRotation(currentRotation);
    }, 10);

    setTimeout(() => {
      clearInterval(spinInterval);
      setIsSpinning(false);
      const newData = shuffleArray(wheelData);
      setwheelData(newData);
      handleSpinForCoin(true,newData[5]?.label);
      setWinCoin(newData[5]?.label);
      setRotation(0);
    }, spinDuration);
  };

  
  const handleSpinForCoin = async (rotateStatus,amount) => {
    await ApiSpinWheel(Number(amount||0)).then((res) => {
      if (res?.isSuccess) {
        setRotate(rotateStatus);
        setDrawer(false);
        setSpinTimer(res?.data?.nextSpinAllowedAt);
        setSpinCount(res?.data?.spinCount);
     
      }
      else {
        toast.error(res?.data?.error||  res?.data?.message || res?.message, {
          className: "custom-error-toast",
          bodyClassName: "custom-error-toast-body",
          closeButton: false,
          progress: undefined,
        });


      }
    }).catch((err) => toast.error(err?.data?.error || err?.message, {
      className: "custom-error-toast",
      bodyClassName: "custom-error-toast-body",
      closeButton: false,
      progress: undefined,
    }));
  }

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 340;
    canvas.height = 340;

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2); 
    ctx.rotate((rotation * Math.PI) / 180); 
    ctx.translate(-canvas.width / 2, -canvas.height / 2); 

    drawWheel(ctx); 
    ctx.restore();
  }, [rotation]);

  return (
    <>
      <div class="max-w-[500px] w-full h-dynamic-screen relative bg-CFFFFFF dark:bg-C191A32 hide-scroll-bar" id="shell">
        <div class=" hide-scroll-bar overflow-y-scroll pt-80 pb-20 spinwheel-backdrop">
          <div class="flex flex-col h-full">
            <div class="mt-30 mx-20 flex-1 spinwheel-bottom-padding">
              <div class="flex flex-col">
                <div>
                  <p class="font-bold text-18 text-center dark:text-CFFFFFF">{spinCount == 2 ?"You don’t have any Spin right now!":"Spin the wheel and win coins!"}</p>
                </div>
                <div class=" my-30">
                  <div class="">
                    <div class={`flex items-center mt-6 justify-center relative relative text-center spinwheel-box ${spinCount == 2 ? 'blur' : ''}`}>
                      <canvas ref={canvasRef}></canvas>
                      <button
                        onClick={handleSpin}
                        disabled={rotate}
                        style={{
                          position: 'absolute',
                          top: '48%',  
                          left: '50%', 
                          zIndex: 10,
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          transform: 'translate(-50%, -50%)'  
                        }}
                      >
                        <img
                          src={spinbtn} 
                          alt="spin button"
                          style={{ width: '68px', height: '77px' }} 
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {!isSpinning  ? <div class="spinwheel-bottom-text">
                  {!rotate ? <p class="text-18 text-center text-C676767 dark:text-CFFFFFF">
                    Win up to <img class="inline h-20" src="https://static.quizzop.com/newton/assets/coin.png" />
                    500 with each spin.<br />Try your luck now!
                  </p> :
                    <>
                      <p class="uppercase text-18 text-center text-C676767 dark:text-CFFFFFF">{winCoin ? "You have won" : spinCount < 2 ? "Better luck next time !":""}</p>
                      {winCoin && <p class="flex justify-center items-center text-C2C2C2C dark:text-CFFFFFF text-24 font-bold text-center">
                        <img src="https://static.quizzop.com/newton/assets/coin.png" class="h-20 w-20 mr-4" alt="" />{winCoin}</p>}
                    </>

                  }
                </div> : null}
              </div>
            </div>
            {!isSpinning &&  <div class="fixed w-full max-w-maxW bottom-0 z-50 bg-CFAFAFA dark:bg-C26284C ">
              <div class="my-30 mx-20">
                <button data-testid="spin-wheel-button" disabled={spinCount === 2} onClick={handleSpin} className={`py-12 text-center w-full inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-C0DB25B primary-button px-36 mt-30 mx-auto flex-row lifeline-button  cursor-pointer flex items-center flex-col select-none ${spinCount === 2 ? "opacity-70" :"opacity-100"

                }`}>
                  <p class="text-2xl">{rotate ? spinCount === 1 ? "Spin Again":" " : "Spin the Wheel"} {spinCount === 2 &&spinTimer && <CountdownTimer endTime={spinTimer} text='Next Spin In ' className='text-2xl'/>}</p>
                </button>
              </div>
            </div>}
          </div>
        </div>
        {drawer && <div class="z-50  h-full w-full max-w-maxW flex flex-col-reverse  fixed top-0 bottom-0 bg-C000000DE">
          <div class=" animate__animated bottomsheet_animated relative bg-CFFFFFF w-full rounded-t-10 text-center py-20 px-20 transition-opacity h-min-360 max-w-maxW dark:bg-C20213F dark:border-C404380 dark:border-1 z-100">
            <div class="flex justify-center -mt-60 mb-20 ">
              <div class="p-4 rounded-full scale-125 bg-CFFFFFF dark:bg-C20213F">
                <img alt="modalImage" loading="lazy" width="120" height="120" decoding="async" data-nimg="1" style={{ color: "transparent" }} src={wheelImage} />
              </div>
            </div>
            <div data-testid="cross-button" class="dark:text-CFFFFFF flex flex-row-reverse cursor-pointer absolute top-15 right-15" onClick={() => {
              setRotate(true);
              setDrawer(false)
            }}>
              <CloseIcon />
            </div>
            <div>
              <div class="font-bold text-18 dark:text-CFFFFFF">Spin the Wheel Again!</div>
              <div class="px-20 mt-8 text-14 text-C676767 dark:text-C8789C3">Select one of the options below to spin the wheel again</div>
              <div data-testid="spin-for-free-button" class="py-12 text-center inline-block uppercase font-bold text-16 text-CFFFFFF rounded-5 bg-C0DB25B defaultButton px-36 mt-30 mx-auto flex-row lifeline-button  cursor-pointer flex items-center flex-col select-none opacity-100">
                <AdVideoIcon />
                <p class="text-2xl">Spin for Free</p>
              </div>
              <p class="px-20 mt-20 font-bold text-14 dark:text-C8789C3">OR</p>
              <div data-testid="spin-100-coins-button" onClick={handleSpin} class="border justify-center text-center border-C2C2C2C rounded-3 inline-block px-24 py-6 font-bold text-14 uppercase dark:text-C8789C3 dark:border-C8789C3 dark:bg-C20213F mt-10 mx-auto py-14 lifeline-button text-lg  cursor-pointer flex items-center flex-col select-none opacity-100">
                <p class="text-2xl">Spin for</p>
                <Coins />
                <p class="text-2xl">100 Coins</p>
              </div>
            </div>
          </div>
        </div>}
      </div>
      
    </>

  );
};

export default WheelCanvas;


