import { Slide, ToastContainer } from "react-toastify";
import "./App.css";
import Wordle from "./components/Wordle";

function App() {
  return (
    <div className="h-lvh flex justify-center items-center">
      <Wordle />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" transition={Slide}/>
    </div>
  );
}

export default App;
