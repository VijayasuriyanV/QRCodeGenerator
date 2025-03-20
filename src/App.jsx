import {useState} from "react";
import "./App.css";
import QrCode from "../QrCode";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QrCode />
    </>
  );
}

export default App;
