import type { NextPage } from "next";
import Script from "next/script";
import Head from "next/head";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { VscDebugStart, VscDebugPause, VscDebugRestart } from "react-icons/vsc";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState, useRef } from "react";

const Home: NextPage = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timer, setTimer] = useState(25 * 60);
  const [timerString, setTimerString] = useState("25:00");
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    //update timer string
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    setTimerString(
      `${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`
    );

    if (timer === 0) {
      if (isBreak) {
        setTimeout(() => {
          setTimer(sessionLength * 60);
          setIsBreak(false);
        }, 1000);
        audioRef.current?.play();
      } else {
        setTimeout(() => {
          setTimer(breakLength * 60);
          setIsBreak(true);
        }, 1000);
        audioRef.current?.play();
      }
    }
  }, [timer, isRunning]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, timer]);

  useEffect(() => {
    setTimer(sessionLength * 60);
  }, [sessionLength]);

  const handleStartStop = () => {
    if (isRunning) {
      console.log("stop");
    } else {
      console.log("start");
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsBreak(false);
    setBreakLength(5);
    setSessionLength(25);
    setIsRunning(false);
    setTimer(25 * 60);

    if (audioRef.current) {
      audioRef.current.load();
    }
  };

  const handleBeakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const handleBeakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };
  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  return (
    <div className="">
      <Script
        src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"
        strategy="beforeInteractive"
      ></Script>
      <Head>
        <title>Pomodoro Technique</title>
        <meta name="description" content="Pomodoro Technique" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto mt-10 flex w-screen flex-col gap-2 rounded bg-cyan-700 md:max-w-xl">
        <div className="text-center text-3xl">Pomodoro Technique</div>
        <div className="flex flex-row justify-center text-2xl">
          <div className="basis-32">
            <div className="text-center" id="break-label">
              Break
            </div>
            <div className="flex flex-row items-center justify-center">
              <button
                id="break-decrement"
                className="h-[24px] rounded bg-cyan-800 active:bg-cyan-500 disabled:pointer-events-none disabled:opacity-50"
                onClick={handleBeakDecrement}
                disabled={isRunning}
              >
                <AiOutlineMinus />
              </button>
              <div id="break-length" className="mx-2">
                {breakLength}
              </div>
              <button
                id="break-increment"
                className="h-[24px] rounded bg-cyan-800 active:bg-cyan-500 disabled:pointer-events-none disabled:opacity-50"
                onClick={handleBeakIncrement}
                disabled={isRunning}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
          <div className="basis-32">
            <div className="text-center" id="session-label">
              Session
            </div>
            <div className="flex flex-row items-center justify-center">
              <button
                id="session-decrement"
                className="h-[24px] rounded bg-cyan-800 active:bg-cyan-500 disabled:pointer-events-none disabled:opacity-50"
                onClick={handleSessionDecrement}
                disabled={isRunning}
              >
                <AiOutlineMinus />
              </button>
              <div id="session-length" className="mx-2">
                {sessionLength}
              </div>
              <button
                id="session-increment"
                className="h-[24px] rounded bg-cyan-800 active:bg-cyan-500 disabled:pointer-events-none disabled:opacity-50"
                onClick={handleSessionIncrement}
                disabled={isRunning}
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-36 flex-col rounded border-2 border-cyan-800 py-2">
          <div className="text-center" id="timer-label">
            {isBreak ? "Break" : "Session"}
          </div>
          <div className="text-center text-5xl" id="time-left">
            {timerString}
          </div>
          <audio src="/time-up-ringtone.mp3" id="beep" ref={audioRef}></audio>
        </div>
        <div className="mb-2 flex flex-row justify-center gap-4">
          <button
            className="rounded bg-cyan-800 active:bg-cyan-500"
            id="start_stop"
            onClick={handleStartStop}
          >
            {isRunning ? (
              <VscDebugPause size={40} />
            ) : (
              <VscDebugStart size={40} />
            )}
          </button>
          <button
            className="rounded bg-cyan-800 active:bg-cyan-500"
            id="reset"
            onClick={handleReset}
          >
            <VscDebugRestart size={40} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
