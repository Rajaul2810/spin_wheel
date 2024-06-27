
// random color generate function
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function toRad(deg) {
    return deg * (Math.PI / 180.0);
}
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}
// get percent between 2 number
function getPercent(input, min, max) {
    return ((input - min) * 100) / (max - min) / 100;
}

//capture DOM element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = document.getElementById("canvas").width;
const height = document.getElementById("canvas").height;

const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2;

//get input value and remove space and empty data
let namesInput = document
    .getElementsByTagName("textarea")[0]
    .value.trim();
console.log(namesInput);
let items = namesInput
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name !== "");
console.log(items);

let currentDeg = 0;
let step = 360 / items.length;
let colors = [];
let itemDegs = {};

for (let i = 0; i < items.length + 1; i++) {
    colors.push(getRandomColor());
}

// create wheel function
function createWheel() {
    //get input value and remove space and empty data
    namesInput = document.getElementsByTagName("textarea")[0].value.trim();
    console.log(namesInput);
    items = namesInput
        .split("\n")
        .map((name) => name.trim())
        .filter((name) => name !== "");

    step = 360 / items.length;
    colors = [];
    for (let i = 0; i < items.length + 1; i++) {
        colors.push(getRandomColor());
    }
    draw();
}
draw();

// canvas drow function
function draw() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, toRad(0), toRad(360));
    ctx.fillStyle = `rgb(${33},${33},${33})`;
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    let startDeg = currentDeg;
    for (let i = 0; i < items.length; i++, startDeg += step) {
        let endDeg = startDeg + step;

        let color = colors[i];
        let colorStyle = color;

        ctx.beginPath();
        rad = toRad(360 / step);
        ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
        let colorStyle2 = color;
        ctx.fillStyle = colorStyle2;
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        ctx.beginPath();
        rad = toRad(360 / step);
        ctx.arc(
            centerX,
            centerY,
            radius - 30,
            toRad(startDeg),
            toRad(endDeg)
        );
        ctx.fillStyle = colorStyle;
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        // draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(toRad((startDeg + endDeg) / 2));
        ctx.textAlign = "center";

        ctx.fillStyle = "#fff";

        ctx.font = "bold 24px serif";
        ctx.fillText(items[i], 130, 10);
        ctx.restore();

        itemDegs[items[i]] = {
            startDeg: startDeg,
            endDeg: endDeg,
        };

    }
    
}


let speed = 0;
let maxRotation = randomRange(360 * 3, 360 * 6);
let pause = false;
function animate() {
    if (pause) {
        determineWinner();
        return;
    }
    speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
    if (speed < 0.01) {
        speed = 0;
        pause = true;

        
    }
    currentDeg += speed;
    draw();
    window.requestAnimationFrame(animate);
}

function spin() {
    if (speed != 0) {
        return;
    }

    maxRotation = 0;
    currentDeg = 0;
    createWheel();
    draw();

    maxRotation = randomRange(360 * 3, 360 * 6);
    itemDegs = {};
    console.log("max", maxRotation);
    console.log(itemDegs);
    pause = false;
    window.requestAnimationFrame(animate);
}

// check winner
function determineWinner() {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const startDeg = itemDegs[item].startDeg % 360;
        const endDeg = itemDegs[item].endDeg % 360;

        if (startDeg % 360 < 360 &&
                 startDeg % 360 > 270 &&
                endDeg % 360 > 0 &&
                endDeg % 360 < 90) {
            document.getElementById("winner").innerHTML = `"${item}" is Winner!`;
            document.getElementById('modal').classList.remove('invisible')
            document.getElementById("winner1").innerHTML = `"${item}" is Winner!`;
            break;
        }
    }
}

// modal handle 

function handleModal(){
    document.getElementById('modal').classList.add('invisible');
}
