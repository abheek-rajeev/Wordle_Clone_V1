import React from "react";

const Modal = ({ title, solution, handlePlayAgain }) => {
  return (
    <div className="fixed h-screen w-screen flex justify-center items-center top-0 left-0 z-10 bg-gray-900/95">
      <div className="max-w-[25rem] min-w-[25rem] min-h-[15rem] max-h-[15rem] m-auto rounded-lg bg-zinc-900/70 shadow-lg shadow-slate-900 flex flex-col justify-center items-center gap-5">
        <h2 className={`text-3xl font-bold text-white`}>{title}</h2>
        <h2 className={`text-2xl font-bold text-white capitalize`}>
          {solution && `solution: ${solution}`}
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
          onClick={handlePlayAgain}
        >
          Play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
