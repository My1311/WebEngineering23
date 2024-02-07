function Person(name, besesenesAuto) {
    this.name = name;
    this.besesenesAuto = [];
}

function Auto(kennzeichen, marke){
    this.kennzeichen = kennzeichen;
    this.marke = marke;
    this.besitzer = null;
}
export { Person, Auto}; // export the 2 classes