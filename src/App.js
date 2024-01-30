// App.js

import React from "react";
import "./App.css";
import DocumentationInterface from "./components/DocumentationInterface";

import { CssBaseline } from "@mui/material";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <header className="App-header">
        <h1>Software Documentation Generator</h1>
      </header>
      <DocumentationInterface />
    </div>
  );
}

export default App;
