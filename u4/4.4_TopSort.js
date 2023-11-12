// Testvariablen

var relations1 =[["schlafen","studieren"], ["essen","studieren"],["studieren","prüfen"]];
var elements1 = ["schlafen", "studieren", "essen", "prüfen" ];

function vorgaenge_bestimmen(relations, elements){
    var order_number ={};
    elements.forEach(function (item) {
        order_number[item] = {name: item, number: 0, nachfolger:[]};
    })

    relations.forEach(function (items){
        order_number[items[1]].number +=1;
        if(!order_number[items[0]].nachfolger.includes(items[1])){
            order_number[items[0]].nachfolger.push(items[1]);
        }
    })

    return order_number;
}

function topsort(relations, elements){
    var order_number = vorgaenge_bestimmen(relations,elements)
    console.log(order_number);
    var next = [];
    var sortierung =[];

    for(key in order_number){
        if(order_number[key].number === 0){
            next.push(key);
        }
    }
    var k = 1; // Zählt die Durchläufe um ggfs. Zyklen zu erkennen

    // Falls es gibt keine Elemente in elements mehr
    if(next.length === 0){
        return -2;
    }

    do{
        var current_item = next.pop();
        sortierung.push(current_item);
        k +=1;
        order_number[current_item].nachfolger.forEach(function (item){
            if(order_number[item].number > 1) {
                order_number[item].number -=1;
            }else{
                next.push(item);
            }
        })
    } while (next.length !== 0);

    // Zyklus erkannt
    if(k !== elements.length + 1){
        return -1;
    }
    return sortierung;
}

console.log(topsort(relations1, elements1));