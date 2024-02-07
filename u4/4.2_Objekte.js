/*function Person(name, besesenesAuto) {
    this.name = name;
    this.besesenesAuto = [];
}

function Auto(kennzeichen, marke){
    this.kennzeichen = kennzeichen;
    this.marke = marke;
    this.besitzer = null;
}*/
import {Person, Auto} from '../u4/individuell_objekten.js';
//  Funktion, um zu überprüfen, ob ein Auto von mehr als einer Person besessen wird
function conflict(auto){
    const besitzer = auto.besitzer;
    return besitzer && besitzer.length > 1;
}
// Beispiel: Erstellen von Personen
const person1 = new Person("Tom");
const person2 = new Person("My");

// Beispiel: Erstellen von Autos
const car1 = new Auto("1", "Ford");
const car2 = new Auto("2", "BMW");

// Personen besitzen Autos
person1.besesenesAuto.push(car1);
car1.besitzer =[person1];

person2.besesenesAuto.push(car2);
car2.besitzer=[person2];

// Überprüfen auf Konflikte
console.log("Konflikt für Auto 1:", conflict(car1)); // false, da nur eine Person Auto 1 besitzt
console.log("Konflikt für Auto 2:", conflict(car2)); // false, da nur eine Person Auto 2 besitzt

// Teilen eines Autos zwischen zwei Personen
person2.besesenesAuto.push(car1);
car1.besitzer.push(person2);

// Überprüfen auf Konflikte nach dem Teilen
console.log("Konflikt für Auto 1 nach dem Teilen:", conflict(car1)); // true, da Auto 1 von zwei Personen besessen wird

