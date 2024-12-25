import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime) : duration;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalId);
          onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    localStorage.setItem('timeLeft', timeLeft);

    return () => clearInterval(intervalId);
  }, [timeLeft, onComplete]);

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return <h1>{formatTime(timeLeft)}</h1>;
};

export default Timer;
