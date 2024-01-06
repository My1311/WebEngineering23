fetch("./data.xml").then(function (result) {
    console.log(result);
    result.text().then(function (result) {
        const xml = new DOMParser().parseFromString(result, "text/xml");
        console.log(xml);
        xml.querySelector("stand");
        // console.log(stand.textContent); // Ausgabe: 01.01.2024, 22:28
        // document: unsere HTML seite, xml: Daten Seite
        document.getElementById("stand").innerHTML = xml.querySelector("stand").textContent;
        document.getElementById("von").innerHTML = xml.querySelector("von").textContent;
        document.getElementById("bis").innerHTML = xml.querySelector("bis").textContent;
        //console.log(xml.querySelectorAll("baustein")); // Ausgabe: NodeList(12) [baustein, baustein,..]
        xml.querySelectorAll("baustein").forEach(function (baustein){
            // Fur jedes Element, Baustein macht man diese main (Titel + Table)
            // Wenn nur =, kriegt man nur das letzten Element,
            // += wird das Element nicht ersetzt. den alte Wert wird noch mal wiederholt+ den neuen Wert
            // => Performance intensiv
            document.querySelector("main").innerHTML += `
            <h2>${baustein.querySelector("baustein_name").textContent}</h2>
            <table>
            <tr>
                <th> Datum </th>
                <th>Uhrzeit</th>
                <th>Wert</th>
            </tr>
            </table>
            `;
            bautein.querySelectorAll("wert_detail").forEach(function (datensatz: ){
                const table = document.querySelectorAll("table");
            });
        });

    });
});