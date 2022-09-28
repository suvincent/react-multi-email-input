# react-multi-email-input
(fork from react-multi-email)

A react component to format multiple email as the user types.

- Simple code
- No dependency

## Installation

```shell-script
npm install react-multi-email-input
```

## Usage

``` jsx
import React, { useState } from "react";
import './lib/style.css'
import { ReactMultiEmailInput } from './lib';

function App() {
  const [emailList, setEmailList] = useState([])

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
```

## License

[MIT](https://opensource.org/licenses/MIT)