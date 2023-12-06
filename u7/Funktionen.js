// Stack Verarbeitung reicht nicht für Fkt Verarbeitung
// 1
function curry(fn,arg1) {
    return function (arg2) {
        return fn(arg1,arg2);
    }
}
// Beispiel mit einer add-Funktion
function add(a,b){
    return a+b;
}


const adder3 = curry(add,3);
console.log(adder3(4));

// Beispiel mit einer mul-Funktion
function mul(a,b){
    return a*b;
}

console.log(curry(mul,5) (6));
// 2
// Variante 1: Verwendung von addf
function addf(a){
    return function (b){
        return a + b;
    };
}

function inc1(x){
    return addf(1)(x);
}
console.log(inc1(5));
// Variante 2: Verwendung von addf
function applyf(methode){
    return function (a){
        return function (b){
            return methode(a, b);
        };
    };
}
function add(a,b){
    return a+b;
}
const inc2 = applyf(add)(1); // not applyf(add(1))
console.log(inc2(5));

// Variante 3: Verwendung von curry
const inc3 = curry(add,1);
console.log(inc3(5));

//3
// die eine binäre Funktion (z.B. add oder mul) in eine unäre Methode verwandelt.
function methodize(f){
    return function(x){
        return f(this,x);
    }
}

Number.prototype.add = methodize(add);

console.log((3).add(4));

//4 die eine unäre Methode (z.B. add oder mul) in eine binäre Funktion umwandelt.
function demethodize(f) {
    return function (x,y) {
        return f(x,y);
    };
}
Number.prototype.add = add;
console.log(demethodize(Number.prototype.add)(5, 6));

//5
function twice(f){
    return function(x){
        return f(x,x);
    };
}
var double = twice(add);
var square = twice(mul);
console.log(double(11));
console.log(square(11));

//6
function composeu(f,g){
    return function (x){
        return g(f(x));
    }
}
console.log(composeu(double,square)(3));

//7
function composeb(f,g){
    return function (a,b,c){
        return g(c, f(b,a));
    }
}
console.log(composeb(add,mul)(2,3,5));

//8
function once(f){
    var check = false;
    return function (a,b) {
        if(check) {
            return("Fehlerabbruch!")
        } else{
            check = true; // check wird hier außer der Scope verändert werden.
            return f(a,b);
        }
    }
}
const add_once = once(add);
console.log(add_once(3,4));
console.log(add_once(3,4));

//9
function counterf(x){
    return{
        inc: () => {return ++x},
        dec: () => {return --x}
    };
}
const counter = counterf(10);
console.log(counter.inc());
console.log(counter.dec());
// 10
function revocalbe(f){
    return {
        isRevok: false,
        invoke: (a) => {
            if(!this.isRevok){
                f(a);
            }else {
                return ("Sie haben diese Fkt wieder gerufen.")
            }
        },
        revoke: () => {
            this.isRevok = true;
        }
    };
}
const temp = revocalbe(add);
temp.invoke(7);
temp.revoke();
console.log(temp.invoke(8));

//11 Array Wrapper
function vector(){
    let v=[];
    return{
        append:(x) => {v.push(x);} ,
        store: (index, x) => {v[index] = x;},
        get: (index) => {return v[index];}
        }
}
my_vector = vector();
my_vector.append(7);
my_vector.store(1,8);
console.log(my_vector.get(0));
console.log(my_vector.get(1));