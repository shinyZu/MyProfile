let personA = $("section:nth-child(2) div:first-child > h2").text();
let personB = $("section:nth-child(2) div:nth-child(2) > h2").text();
let personC = $("section:nth-child(2) div:nth-child(3) > h2").text();
let personD = $("section:nth-child(2) div:nth-child(4) > h2").text();
let personE = $("section:nth-child(2) div:nth-child(5) > h2").text();
let personF = $("section:nth-child(2) div:nth-child(6) > h2").text();

let labelA = $("section:nth-child(2) div:first-child > h2");
let labelB = $("section:nth-child(2) div:nth-child(2) > h2");
let labelC = $("section:nth-child(2) div:nth-child(3) > h2");
let labelD = $("section:nth-child(2) div:nth-child(4) > h2");
let labelE = $("section:nth-child(2) div:nth-child(5) > h2");
let labelF = $("section:nth-child(2) div:nth-child(6) > h2");

let people = [personA,personB,personC,personD,personE,personF];

let labels = [labelA,labelB,labelC,labelD,labelE,labelF];

function moveForward(){
    let lastPerson = people.pop();
    people.unshift(lastPerson);
   
    for (let i in labels) {
        labels[i].text(people[i]);
    }
}

(function(){
    setInterval(moveForward,2000);
}
)();

