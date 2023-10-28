import Timer from "./components/Timer";
import "./styles.css";
import { useState, useRef, useEffect } from "react";

const fixTimeString = (time) => (time < 10 ? `0${time}` : time);

const formatTimeToString = (time) => {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60) % 60;
  const outputString = `00:${fixTimeString(minutes)}:${fixTimeString(seconds)}`;
  return outputString;
};

export default function App() {
  const [timer, setTimer] = useState(61);
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

  const resetTimer = () => {
    // it should stop timer
    stopTimer();
    // it should change value back to zero;
    setTimer(0);
  };
  console.log(ref);

  return (
    <div className="App">
      <h1>{formatTimeToString(timer)}</h1>
      <button onClick={startTimer}>START</button>
      <button onClick={stopTimer}>STOP</button>
      <button onClick={resetTimer}>RESET</button>
      <Timer />
    </div>
  );
}
