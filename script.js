// Assignment code here
window.addEventListener('load', function() {
  var plength = prompt("How many characters would you like your password to be?");

  while (plength < 8 || plength > 128) {
    plength = prompt("Length must be 8-128 characters. How many characters would you like your password to be?");
  }

  var cuppercase = confirm("Click OK to add uppercase letters");
  var clowercase = confirm("Click OK to add lowercase letters");
  var cnumbers = confirm("Click OK to add numbers");
  var csymbols = confirm("Click OK to add symbols");

  while (!(cuppercase || clowercase || cnumbers || csymbols)) {
    alert("You must select at least one character type!");

    cuppercase = confirm("Click OK to add uppercase letters");
    clowercase = confirm("Click OK to add lowercase letters");
    cnumbers = confirm("Click OK to add numbers");
    csymbols = confirm("Click OK to add symbols");
  }

  //DOM elements
  const resultEl = document.getElementById('password');

  document.getElementById('generate').addEventListener('click', () => {
    resultEl.value = generatePassword(clowercase, cuppercase, cnumbers, csymbols, plength);
  });
});


const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{
    lower
  }, {
    upper
  }, {
    number
  }, {
    symbol
  }].filter(item => Object.values(item)[0]);

  // create a loop
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generator functions
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
