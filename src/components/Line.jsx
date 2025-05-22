import React from "react";

const Line = ({ guess, index, checkColour, solution }) => {
  const guessArr = guess.split("");
  const getColor = (i) => {
    if (checkColour) {
      if (solution.includes(guessArr[i])) {
        if (solution[i] === guessArr[i]) {
          return "green";
        }
        return "yellow";
      }
      return "#D3D3D3";
    }
  };
  return (
    <div className="flex gap-2" key={index}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-12 h-12 bg-inherit border-2 border-black flex items-center justify-center font-bold text-3xl shadow-md shadow-black"
          style={{
            backgroundColor: getColor(i),
            transitionDelay: checkColour ? `${i * 150}ms` : "0ms",
          }}
        >
          {guessArr[i]?.toUpperCase() || ""}
        </div>
      ))}
    </div>
  );
};

export default Line;
