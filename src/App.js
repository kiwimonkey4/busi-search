import React, {useState } from "react";
import './App.css';
import Search from "./components/Search"

function App() {
  const [inputText, setInputText] = useState("");
  return (
    <div className="App">
      <h1>BusiSearch</h1>
      <Search setInputText={setInputText}/>
    </div>
  );
}

export default App;
