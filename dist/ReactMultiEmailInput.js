"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.string.split.js");

var React = _interopRequireWildcard(require("react"));

var _isEmail = _interopRequireDefault(require("./isEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// refactor from https://github.com/jsdevkr/react-multi-email/blob/master/src/react-multi-email/ReactMultiEmail.tsx
function ReactMultiEmailInput(_ref) {
  let {
    emails,
    setEmails,
    placeholder,
    className,
    style,
    noClass
  } = _ref;
  const [inputValue, setInput] = React.useState('');
  const [focused, setFocus] = React.useState(false);
  const emailInputRef = /*#__PURE__*/React.createRef();
  React.useEffect(() => {
    if (!emails) setEmails([]);
  }, []);

  function findEmailAddress(value) {
    let isEnter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let validEmails = [];
    let inputValue = '';
    const re = /[ ,;]/g;
    const isEmail = _isEmail.default;

    const addEmails = email => {
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

    setEmails([...emails, ...validEmails]);
    setInput(inputValue);
  }

  ;

  function removeEmail(index, isDisabled) {
    if (isDisabled) {
      return;
    }

    setEmails([...emails.slice(0, index), ...emails.slice(index + 1)]);
  }

  ;

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
  }

  ;

  function handleOnKeyup(e) {
    switch (e.which) {
      case 13:
      case 9:
        findEmailAddress(e.currentTarget.value, true);
        break;

      default:
    }
  }

  ;

  function handleOnChange(e) {
    findEmailAddress(e.currentTarget.value);
  }

  ;

  function handleOnBlur(e) {
    setFocus(false);
    findEmailAddress(e.currentTarget.value, true);
  }

  ;

  function handleOnFocus() {
    setFocus(true);
  }

  function MailLabel(email, index, removeEmailFn) {
    const remove = removeEmailFn || removeEmail;
    return /*#__PURE__*/React.createElement("div", {
      "data-tag": true,
      key: index
    }, email, /*#__PURE__*/React.createElement("span", {
      "data-tag-handle": true,
      onClick: () => remove(index)
    }, "  x"));
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(className, " ").concat(noClass ? '' : 'react-multi-email', " ").concat(focused ? 'focused' : '', " ").concat(inputValue === '' && (emails === null || emails === void 0 ? void 0 : emails.length) === 0 ? 'empty' : ''),
    style: style,
    onClick: () => {
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
    }
  }, placeholder ? /*#__PURE__*/React.createElement("span", {
    "data-placeholder": true
  }, placeholder) : null, emails === null || emails === void 0 ? void 0 : emails.map((email, index) => MailLabel(email, index, removeEmail)), /*#__PURE__*/React.createElement("input", {
    ref: emailInputRef,
    type: "text",
    value: inputValue,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    onChange: handleOnChange,
    onKeyDown: handleOnKeydown,
    onKeyUp: handleOnKeyup
  }));
}

var _default = ReactMultiEmailInput;
exports.default = _default;