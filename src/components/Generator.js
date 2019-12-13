// www.net-comber.com/charset.html
import React, { useState } from "react";

const Generator = () => {
  const [length, setLength] = useState(20);
  const [password, setPassword] = useState("");
  const [options, setOptions] = useState({
    hasLower: true,
    hasUpper: true,
    hasNumber: true,
    hasSymbol: true
  });
  const { hasUpper, hasLower, hasSymbol, hasNumber } = options;

  const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  };

  const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  };

  const getRandomNumber = () => {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  };

  const getRandomSymbol = () => {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
  };

  const generatePassword = (lower, upper, number, symbol, length) => {
    let generatedPassword = "";
    let checkedValueCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      item => Object.values(item)[0]
    );
    console.log(typesArr);
    // Doesn't have a selected type
    if (checkedValueCount === 0) {
      return "";
    }

    // create a loop
    for (let i = 0; i < length; i++) {
      // typesArr.forEach(type => {
      //   const funcName = Object.keys(type)[0];
      //   generatedPassword += randomFunc[funcName]();
      // });
      const random = Math.floor(Math.random() * typesArr.length);
      const funcName = Object.keys(typesArr[random])[0];
      generatedPassword += randomFunc[funcName]();
    }
    const finalPassword = generatedPassword.slice(0, length);

    setPassword(finalPassword);
  };

  const copyToClipboard = text => {
    let textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert("Password copied");
  };

  const onLengthChange = e => {
    setLength(+e.target.value);
  };

  const onCheckChange = e => {
    let name = e.target.name;
    let updatedOptions = Object.assign({}, options, { [name]: !options[name] });
    setOptions(updatedOptions);
  };

  return (
    <div>
      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <span id="result">{password}</span>
          <button className="btn" id="clipboard">
            <i
              className="fa fa-clipboard"
              onClick={() => copyToClipboard(password)}
            ></i>
          </button>
        </div>
        <div className="settings">
          <div className="setting">
            <label>Password length</label>
            <input
              type="number"
              id="length"
              min="4"
              max="20"
              value={length}
              onChange={onLengthChange}
            />
          </div>
          <div className="setting">
            <label>Include uppercase letters</label>
            <input
              type="checkbox"
              name="hasUpper"
              checked={hasUpper}
              onChange={onCheckChange}
            />
          </div>
          <div className="setting">
            <label>Include lowercase letters</label>
            <input
              type="checkbox"
              checked={hasLower}
              onChange={onCheckChange}
              name="hasLower"
            />
          </div>
          <div className="setting">
            <label>Include numbers</label>
            <input
              type="checkbox"
              checked={hasNumber}
              onChange={onCheckChange}
              name="hasNumber"
            />
          </div>
          <div className="setting">
            <label>Include symbols</label>
            <input
              type="checkbox"
              checked={hasSymbol}
              onChange={onCheckChange}
              name="hasSymbol"
            />
          </div>
        </div>
        <button
          className="btn btn-large"
          id="generate"
          onClick={() =>
            generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
          }
        >
          Generate password
        </button>
      </div>
    </div>
  );
};

export default Generator;
