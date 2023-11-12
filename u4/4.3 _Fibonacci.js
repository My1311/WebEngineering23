
var i;
var fib = [0, 1]; // Initialize array!

var LAST_SAFE_FIBONACCI = 0;
var LAST_SAFE_MAXVALUE = 0;

function Fibonacci(){
    for (i = 2; i <= 2000; i++) {
        // Next fibonacci number = previous + one before previous
        fib[i] = fib[i - 2] + fib[i - 1];
        if (fib[i] < Number.MAX_SAFE_INTEGER) {
            LAST_SAFE_FIBONACCI = i;
        }
        if (fib[i] < Number.MAX_VALUE) {
            LAST_SAFE_MAXVALUE = i;
        }
        //console.log("The value of the " +(i-1) + " number in Fibonacci string is " +fib[i]);
    }
    console.log(LAST_SAFE_FIBONACCI + ": " + fib[LAST_SAFE_FIBONACCI]);
    console.log(LAST_SAFE_MAXVALUE + ": " + fib[LAST_SAFE_MAXVALUE]);
}


// 3
var i;
var fib = [0n, 1n]; // Initialize array!

function Fibonacci(){
    for (i = 2; i <= 2000; i++) {
        // Next fibonacci number = previous + one before previous
        // Translated to JavaScript:
        fib[i] = fib[i - 2] + fib[i - 1];
        console.log("The value of the " +(i) + " number in Fibonacci string is " +fib[i]);
    }
}
Fibonacci();


