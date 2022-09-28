// refactor from https://github.com/jsdevkr/react-multi-email/blob/master/src/react-multi-email/ReactMultiEmail.tsx

import * as React from 'react';
import isEmailFn from './isEmail';

function ReactMultiEmailInput({ emails, setEmails, placeholder, className, style, noClass }) {
  const [inputValue, setInput] = React.useState('')
  const [focused, setFocus] = React.useState(false)
  const emailInputRef = React.createRef();

  React.useEffect(()=>{
    if(!emails)setEmails([])
  },[])

  function findEmailAddress(value, isEnter = false) {
    let validEmails = [];
    let inputValue = '';
    const re = /[ ,;]/g;
    const isEmail = isEmailFn;

    const addEmails = (email) => {
      for (let i = 0, l = emails.length; i < l; i++) {
        if (emails[i] === email) {
          return false;
        }
      }
      validEmails.push(email);
      return true;
    };

    if (value !== '') {
      if (re.test(value)) {
        let splitData = value.split(re).filter(n => {
          return n !== '' && n !== undefined && n !== null;
        });

        const setArr = new Set(splitData);
        let arr = [...setArr];

        do {
          if (isEmail('' + arr[0])) {
            addEmails('' + arr.shift());
          } else {
            if (arr.length === 1) {
              inputValue = '' + arr.shift();
            } else {
              arr.shift();
            }
          }
        } while (arr.length);
      } else {
        if (isEnter) {
          if (isEmail(value)) {
            addEmails(value);
          } else {
            inputValue = value;
          }
        } else {
          inputValue = value;
        }
      }
    }
    setEmails([...emails, ...validEmails])
    setInput(inputValue)
  };

  function removeEmail(index, isDisabled) {
    if (isDisabled) {
      return;
    }
    setEmails([...emails.slice(0, index), ...emails.slice(index + 1)])
  };

  function handleOnKeydown(e) {
    switch (e.which) {
      case 13:
      case 9:
        e.preventDefault();
        break;
      case 8:
        if (!e.currentTarget.value) {
          removeEmail(emails.length - 1, false);
        }
        break;
      default:
    }
  };

  function handleOnKeyup(e) {
    switch (e.which) {
      case 13:
      case 9:
        findEmailAddress(e.currentTarget.value, true);
        break;
      default:
    }
  };

  function handleOnChange(e) { findEmailAddress(e.currentTarget.value) };

  function handleOnBlur(e) { setFocus(false); findEmailAddress(e.currentTarget.value, true); };

  function handleOnFocus() { setFocus(true); }

  function MailLabel(email, index, removeEmailFn) {
    const remove = removeEmailFn || removeEmail;
    return <div data-tag key={index}>{email}<span data-tag-handle onClick={() => remove(index)}>  x</span></div>
  }

  return (
    <div
      className={`${className} ${noClass ? '' : 'react-multi-email'} ${focused ? 'focused' : ''
        } ${inputValue === '' && emails?.length === 0 ? 'empty' : ''}`}
      style={style}
      onClick={() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }}
    >
      {placeholder ? <span data-placeholder>{placeholder}</span> : null}
      {emails?.map((email, index) =>
        MailLabel(email, index, removeEmail),
      )}
      <input
        ref={emailInputRef}
        type="text"
        value={inputValue}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onKeyDown={handleOnKeydown}
        onKeyUp={handleOnKeyup}
      />
    </div>
  );
}

export default ReactMultiEmailInput;