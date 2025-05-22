import React from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

const Overlays = ({ title, solution, handlePlayAgain }) => {
  const mountElement = document.getElementById("overlays");
  return createPortal(
    <Modal
      title={title}
      solution={solution}
      handlePlayAgain={handlePlayAgain}
    />,
    mountElement
  );
};

export default Overlays;
