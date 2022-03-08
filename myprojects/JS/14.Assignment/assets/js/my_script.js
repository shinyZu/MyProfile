let color1 = $("section:nth-child(2) > div:nth-child(1) > div:first-child ").css("background-color");
let color2 = $("section:nth-child(2) > div:nth-child(3) > div:first-child ").css("background-color");
let color3 = $("section:nth-child(2) > div:nth-child(3) > div:nth-child(2) ").css("background-color");
let color4 = $("section:nth-child(2) > div:nth-child(3) > div:nth-child(3) ").css("background-color");
let color5 = $("section:nth-child(2) > div:nth-child(3) > div:nth-child(4) ").css("background-color");
let color6 = $("section:nth-child(2) > div:nth-child(5) > div:first-child ").css("background-color");

let colors = [color1,color2,color3,color4,color5,color6];
// console.log(colors);

let box1 = $("section:nth-child(2) > div:nth-child(1) > div:first-child");
let box2 = $("section:nth-child(2) > div:nth-child(3) > div:first-child ");
let box3 = $("section:nth-child(2) > div:nth-child(3) > div:nth-child(2) ");
let box4 = $("section:nth-child(2) > div:nth-child(3) > div:nth-child(3) ");
let box5 = $("section:nth-child(2) > div:nth-child(3) > div:nth-child(4) ");
let box6 = $("section:nth-child(2) > div:nth-child(5) > div:first-child ");

let boxes = [box1,box2,box3,box4,box5,box6];
// console.log(boxes);

function changeColors(){
    let lastColor = colors.pop();
    colors.unshift(lastColor);

    for (let i in boxes) {
        boxes[i].css("background-color",colors[i]);
    }

}

// changeColors();

(function () {
    setInterval(changeColors,500);
})();