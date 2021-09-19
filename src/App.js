import React, {useState } from "react";
import './App.css';
import Search from "./components/Search";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nextpage from "./Nextpage";

function App() {
  const [inputText, setInputText] = useState("");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/Nextpage">
            <Nextpage />
          </Route>
          <Route path="/">
            <h1>BusiSearch</h1>
            <Search setInputText={setInputText}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
