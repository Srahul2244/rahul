import { useEffect, useRef, useState } from "react";

const fixTimeString = (time) => (time < 10 ? `0${time}` : time);

const formatTimeToString = (time) => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const outputString = `00:${fixTimeString(minutes)}:${fixTimeString(seconds)}`;
  return outputString;
};

export default function Timer() {
  const [timer, setTimer] = useState(0);
  const ref = useRef(null); // i can access it anywhere
  // ref.current; { current : null }

  useEffect(() => {
    const cleanup = () => {
      stopTimer();
    };
    return cleanup;
  }, []);

  const startTimer = () => {
    if (ref.current !== null) return;
    ref.current = setInterval(() => {
      console.log(Date.now());
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  return (
    <div>
      <h1>{formatTimeToString(timer)}</h1>
      <button onClick={startTimer}>START</button>
      <button onClick={stopTimer}>STOP</button>
    </div>
  );
}
