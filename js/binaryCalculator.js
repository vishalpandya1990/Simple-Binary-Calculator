const btn0      = document.getElementById("btn0");
const btn1      = document.getElementById("btn1");
const btnSum    = document.getElementById("btnSum");
const btnSub    = document.getElementById("btnSub");
const btnMul    = document.getElementById("btnMul");
const btnDiv    = document.getElementById("btnDiv");
const btnClr    = document.getElementById("btnClr");
const btnEql    = document.getElementById("btnEql");
var resField    = document.getElementById("res");

/* This calculator does 1 operation at a time. */
var currentOperation = null;

function addToResText (e) {
    var btn = e.target || e.srcElement;
    var str = document.getElementById(btn.id).innerHTML;
    resField.innerHTML += str;
    if(hasOperationSymbol(str) && currentOperation !== null) {
        window.alert("Multiple operations in one command is NOT supported. Retry.");
        resetOnError();
        return;
    }
    if(str == '+')
        currentOperation = '+';
    if(str == '-')
        currentOperation = '-';
    if(str == '*')
        currentOperation = '*';
    if(str == '/')
        currentOperation = '/';
}

btn0.onclick   = addToResText;
btn1.onclick   = addToResText;
btnSum.onclick = addToResText;
btnSub.onclick = addToResText;
btnMul.onclick = addToResText;
btnDiv.onclick = addToResText;

btnClr.onclick = function() {
    /* same as resetOnError() */
    resField.innerHTML = "";
    currentOperation = null;
}

btnEql.onclick = function() {
    var resText = resField.innerHTML;
    if(resText.length == 0 || currentOperation == null ) {
        window.alert("Either given input is empty or without an operation symbol. Retry.");
        resetOnError();
        return; 
    }
    var opPos = resText.indexOf(currentOperation);
    var num1Str = resText.substring(0, opPos);
    var num2Str = resText.substring(opPos+1, resText.length);
    if(hasOperationSymbol(num1Str) || hasOperationSymbol(num2Str)) { /* safety check - addToResText() already has this */ 
        window.alert("Multiple operations in one command is NOT supported. Retry.");
        resetOnError();
        return;
    }
    if(num1Str.length <= 0 || num2Str.length <= 0) {
        window.alert("Please provide both the binary operands. Retry.");
        resetOnError();
        return;
    }
    var num1Int = parseInt(num1Str, 2);
    var num2Int = parseInt(num2Str, 2);
    var res = 0;
    if(currentOperation == '/')
        res = Math.floor((num1Int / num2Int));
    if(currentOperation == '*')
        res = num1Int * num2Int;
    if(currentOperation == '+')
        res = num1Int + num2Int;
    if(currentOperation == '-')
        res = num1Int - num2Int;
    resField.innerHTML = res.toString(2);
    currentOperation = null;
}

var hasOperationSymbol = function (str) {
    if(typeof str !== "string" || str === undefined || str == null || str.length <= 0 )
        return false;
    var opArr = ['+', '-', '/', '*'];
    for(let i = 0; i < opArr.length; i++) {
        if(str.indexOf(opArr[i]) >= 0)
            return true;
    }
    return false;
}

var resetOnError = function () {
        resField.innerHTML = "";
        currentOperation = null;
        return;
}
