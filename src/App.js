import React, { useState } from "react";
import './lib/style.css'
import { ReactMultiEmailInput } from './lib';

function App() {
  const [emailList, setEmailList] = useState(null)

  return (
    <div style={{textAlign: "center"}}>
      <header className="App-header">
        <p>react multi emails input</p>
        <div>
          <ReactMultiEmailInput
            placeholder="placeholder"
            emails={emailList}
            setEmails={setEmailList}
        /></div>
        {emailList && <p id="result">{emailList.join(', ') || 'empty'}</p>}
      </header>
    </div>
  );
}

export default App;
