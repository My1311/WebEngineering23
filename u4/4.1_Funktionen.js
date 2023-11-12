function identity(wert){
    return wert;
}
console.log(identity(4));
/* Test
let number = 5;
console.log("wert: "+identity(number));
 */
function identity_function(wert){
    return identity(wert);
}
/*Test
let number = 10;
console.log("wert: "+identity_function(number));*/
function add(number1, number2){
    return number1 + number2;
}
/* Test
let number1 = 1;
let number2 = 2;
console.log("Die Summe davon ist " + add(number1,number2)); */

function mul(number1, number2){
    return number1 * number2;
}
console.log(mul(5,6));

function addf(num1) {
   return function (num2) { // anonymous function
   return num1 + num2;
   }
 }
 console.log(addf(2)(3));

function applyf(methode){
    return function (a){
        return function (b){
            return methode(a, b);
        };
    };
}
console.log(applyf(add)(5)(6));



