import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import playerYou from '../../../assets/images/players/player-0.webp';
import versusImage from '../../../assets/images/players/Versus.webp';
import logo from '../../../assets/images/quizzop-logo-dark.svg';
import useCookie from '../../../hooks/useCookie';

import player1 from '../../../assets/images/players/player-1.webp';
import player2 from '../../../assets/images/players/player-2.webp';
import player3 from '../../../assets/images/players/player-3.webp';
import player4 from '../../../assets/images/players/player-4.webp';
import player5 from '../../../assets/images/players/player-5.webp';
import player6 from '../../../assets/images/players/player-6.webp';
import player7 from '../../../assets/images/players/player-7.png';
import player8 from '../../../assets/images/players/player-8.webp';
import player9 from '../../../assets/images/players/player-9.png';
import player10 from '../../../assets/images/players/player-10.webp';
import player11 from '../../../assets/images/players/player-11.webp';
import player12 from '../../../assets/images/players/player-12.webp';
import player13 from '../../../assets/images/players/player-13.webp';
import player14 from '../../../assets/images/players/player-14.webp';
import player15 from '../../../assets/images/players/player-15.webp';
import player16 from '../../../assets/images/players/player-16.webp';

const opponentPlayers = [
    player8, player9, player5, player12, player15, player3, player13, player16,
    player6, player10, player14, player11, player1, player4, player7, player2
];

const FindOponent = () => {
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState(null);
    const [opponent, setOpponent] = useState(null);
    const [category] = useState('Bollywood');
    const [shuffledPlayers, setShuffledPlayers] = useState([]);
    const [isRotating, setIsRotating] = useState(true);
    const [matchFound, setMatchFound] = useState(false); // Track if match is found
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [countdown, setCountdown] = useState(null);
    const { getCookie } = useCookie();

    useEffect(() => {
        const authToken = getCookie("authToken");
        if (!authToken) {
            return;
        }

        const socketConnection = io('http://localhost:3000', {
            extraHeaders: { Authorization: `Bearer ${authToken}` },
            autoConnect: false
        });

        socketConnection.connect();
        setSocket(socketConnection);

        socketConnection.on('connect', () => {
            if (!matchFound) {
                socketConnection.emit('findOponent', { category });
            }
        });

        socketConnection.on('match_found', (data) => {
            if (data.status === 'success' && !matchFound) {
                setRoomId(data.roomId);
                setOpponent(data.opponent);
                setMatchFound(true);
                setIsRotating(false);

                setTimeout(() => {
                    setCountdown(3);
                    const countdownInterval = setInterval(() => {
                        setCountdown(prev => {
                            if (prev === 1) {
                                clearInterval(countdownInterval);
                                setTimeout(() => {
                                    navigate(`/login`);
                                }, 1000);
                            }
                            return prev - 1;
                        });
                    }, 1000);
                }, 5000);
            }
        });

        setTimeout(() => {
            if (!matchFound) setIsRotating(false);
        }, 5000);

        return () => {
            socketConnection.disconnect();
            setSocket(null);
        };
    }, []);

    const retryFindingOpponent = () => {
        setMatchFound(false);
        setRoomId(null);
        setOpponent(null);
        setCountdown(null);
        setIsRotating(true);

        const shuffled = [...opponentPlayers];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setShuffledPlayers(shuffled);

        socket.emit('findOponent', { category });

        setTimeout(() => {
            if (!matchFound) setIsRotating(false);
        }, 5000);
    };

    useEffect(() => {
        if (isRotating) {
            const shuffled = [...opponentPlayers];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            setShuffledPlayers(shuffled);
        }
    }, [isRotating]);


    return (
        <main className="flex flex-col items-center justify-center hide-scroll-bar h-screen">
            <div className="mt-14 flex items-center justify-center">
                <img alt="Logo" src={logo} width={100} height={100} />
            </div>

            <div className="mt-20 w-3/5 h-1 mx-auto bg-gradient-to-r from-C40438000 via-C404380 to-C40438000" />

            <div className="text-CBBBDDD text-[12px] mb-10 text-center">
                <p className="text-[18px] font-bold text-CBBBDDD my-28 text-center">
                    {matchFound && countdown !== null ? (
                        <>
                            <span>Starting in</span>
                            <br />
                            <span className="text-CE63737 text-[32px]">{countdown}</span>
                        </>
                    ) : (
                        'Finding a Worthy Opponent'
                    )}
                </p>
            </div>

            <div className="mb-24 w-3/5 h-1 mx-auto bg-gradient-to-r from-C40438000 via-C404380 to-C40438000" />

            <div className="flex items-center justify-between mr-40 last:mr-0 mx-44 mb-24 w-4/5">
                <div>
                    <img alt="You" src={playerYou} width={80} height={80} />
                    <p className="text-[14px] text-CFAFAFA text-center mt-10">You</p>
                </div>

                <div>
                    <img alt="Versus" src={versusImage} width={35} height={50} />
                </div>

                <div className="relative h-80 w-80 rounded-full overflow-hidden">
                    <div className="absolute battle-opponent-animation-8">
                        {isRotating && shuffledPlayers.map((img, index) => (
                            <img key={index} alt={`Player ${index + 1}`} src={img} width={80} height={80} className="pb-20" />
                        ))}
                        {!isRotating && matchFound && shuffledPlayers.map((img, index) => (
                            <img
                                key={index}
                                alt={`Player ${index + 1}`}
                                src={img}
                                width={80}
                                height={80}
                                className={`pb-20 ${index === currentImageIndex ? 'highlighted' : ''}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {roomId && opponent && (
                <div className="mt-10">
                    <p>Match Found!</p>
                    <p>Opponent: {opponent.name}</p>
                    <p>Room ID: {roomId}</p>
                </div>
            )}

            {!matchFound && (
                <button
                    onClick={retryFindingOpponent}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Retry Finding Opponent
                </button>
            )}

            <div className="flex justify-center border-y border-y-C8789C3 py-8 bg-C0C0D26 displayad-wrapper">
                <div id="mg-ad-quizzopBattlesJoinQuiz" data-type="_mgwidget" data-widget-id="1659065" data-src-id="4239" style={{ minHeight: '250px', width: '300px' }} data-uid="0ffac">
                    <div id="mgw1659065_0ffac" style={{ minHeight: '1px', width: '100%' }}></div>
                </div>
            </div>
        </main>
    );
};

export default FindOponent;





