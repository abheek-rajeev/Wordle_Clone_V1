import React, { useEffect, useRef, useState } from "react";
import Overlays from "./Overlays";
import Line from "./Line";
import { toast } from "react-toastify";

const Wordle = () => {
  const [words, setWords] = useState([]);
  const [wordsSet, setWordsSet] = useState(new Set());
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(new Array(5).fill(""));
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("playing");
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const lastEnterPressTime = useRef(0);
  const [clue, setClue] = useState({});

  const getRandomWord = (val) => val[Math.floor(Math.random() * val.length)];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(
        //   "https://dummyjson.com/c/e5f9-8e24-4816-af3e"
        // );
        // if (!response.ok) {
        //   throw new Error("no response");
        // }
        // const data = await response.json();
        // setWords(data.words);

        // const val = getRandomWord(data.words);
        const response = await fetch(
          "https://random-word-api.herokuapp.com/word?length=5&number=10000"
        );
        if (!response.ok) {
          throw new Error("no response");
        }
        const data = await response.json();
        setWords(data);
        const dataSet = new Set(data);
        setWordsSet(dataSet);
        const val = getRandomWord(data);
        setSolution(val);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(words);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (/^[a-z]$/.test(key)) {
        setCurrentGuess((prev) => (prev.length < 5 ? prev + key : prev));
      } else if (key === "backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (key === "enter") {
        const now = Date.now();
        if (now - lastEnterPressTime.current < 500) {
          return;
        }
        lastEnterPressTime.current = now;
        if (currentGuess.length !== 5) {
          toast.error("Invalid length: Word must be 5 letters");
          return;
        }

        if (!wordsSet.has(currentGuess)) {
          toast.error("Word not found in Wordle dictionary");
          return;
        }

        const updatedGuess = [...guesses];
        if (currentRow >= 0 && currentRow <= 5) {
          updatedGuess[currentRow] = currentGuess;
          setGuesses(updatedGuess);

          if (currentGuess === solution) {
            setSuccess(true);
            setStatus("Won");
            setIsOpen(true);
          }

          if (currentRow + 1 >= 5 && currentGuess !== solution) {
            console.log(guesses);
            setStatus("Lost");
            setSuccess(false);
            setIsOpen(true);
          }

          setCurrentRow((prev) => prev + 1);
        }

        console.log(guesses, currentRow);
        setCurrentGuess("");
      }
    };
    if (!success && status === "playing") {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window?.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses, success, currentRow, solution, status, words]);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setShowOverlay(true);
      }, 1000); // 1 second delay

      return () => clearTimeout(timeout); // Cleanup
    } else {
      setShowOverlay(false); // Hide if isOpen is false
    }
  }, [isOpen]);

  // useEffect(() => {
  //   const fetchClue = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.dictionaryapi.dev/api/v2/entries/en/${solution}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("no response");
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //       setClue(data[0]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (solution.length === 5) {
  //     fetchClue();
  //   }
  // }, [solution]);

  const handlePlayAgain = () => {
    setIsOpen(false);
    setStatus("playing");
    setCurrentGuess("");
    setGuesses(new Array(5).fill(""));
    setCurrentRow(0);
    setSuccess(false);
    const newWord = getRandomWord(words);
    setSolution(newWord);
  };

  // console.log("clue", clue);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center items-center pb-10 gap-1">
        {`WORDLE`.split("").map((letter, index) => (
          <div
            key={index}
            className="text-4xl text font-extrabold w-14 h-fit border-slate-950 border-2 text-center p-1 hover:bg-green-500 transition-colors delay-500 duration-2000 hover:animate-spin-y flex justify-center items-center"
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 p-5 justify-center items-center">
        {guesses.map((guess, index) => (
          <Line
            key={index}
            guess={index === currentRow ? currentGuess : guess}
            index={index}
            checkColour={index < currentRow}
            solution={solution}
          />
        ))}
        {/* <p>{solution}</p> */}
      </div>
      {showOverlay && (
        <Overlays
          title={status}
          solution={solution}
          handlePlayAgain={handlePlayAgain}
        />
      )}

    </div>
  );
};

export default Wordle;
