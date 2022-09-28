# react-multi-email-input
(fork from [react-multi-email](https://www.npmjs.com/package/react-multi-email))

A react component to format multiple email easily.

- Simple code
- No dependency
## demo
<img src="https://raw.githubusercontent.com/suvincent/react-multi-email-input/main/doc/demo.gif" />

## Installation

```shell-script
npm install react-multi-email-input
```

## Usage

``` jsx
import React, { useState } from "react";
import { ReactMultiEmailInput } from 'react-multi-email-input';
import 'react-multi-email-input/dist/style.css'

function App() {
  const [emailList, setEmailList] = useState([])
  return (
    <>
        <p>react multi emails input</p>
        <div>
            <ReactMultiEmailInput
                placeholder="placeholder"
                emails={emailList}
                setEmails={setEmailList}
            />
        </div>
        {emailList && <p id="result">{emailList.join(', ') || 'empty'}</p>}
    </>
  );
}

export default App;
```

## License

[MIT](https://opensource.org/licenses/MIT)