import React from "react";
import Entry, { AddEntry } from "./Entry";
import emojipedia from "../emojipedia";

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">{emojipedia.map(AddEntry)}</dl>
    </div>
  );
}

export default App;
