const makeBigger = () => {
   var currFontSize = window.getComputedStyle(document.querySelector("h1")).fontSize;
   var valCurrFontSize = parseInt(currFontSize.replace("px", ""));
   var newFontSize = valCurrFontSize + 2 + "px";
   document.querySelector("h1").style.fontSize = newFontSize;

   var currFontSize = window.getComputedStyle(document.querySelector("div .content")).fontSize;
   var valCurrFontSize = parseInt(currFontSize.replace("px", ""));
   var newFontSize = valCurrFontSize + 2 + "px";
   document.querySelector("div .content").style.fontSize = newFontSize;
};

const makeSmaller = () => {
   var currFontSize = window.getComputedStyle(document.querySelector("h1")).fontSize;
   var valCurrFontSize = parseInt(currFontSize.replace("px", ""));
   var newFontSize = valCurrFontSize - 2 + "px";
   document.querySelector("h1").style.fontSize = newFontSize;

   var currFontSize = window.getComputedStyle(document.querySelector("div .content")).fontSize;
   var valCurrFontSize = parseInt(currFontSize.replace("px", ""));
   var newFontSize = valCurrFontSize - 2 + "px";
   document.querySelector("div .content").style.fontSize = newFontSize;
};

document.querySelector("#a1").addEventListener('click', makeBigger);
document.querySelector("#a2").addEventListener('click', makeSmaller);
