const containerDiv = document.getElementById('container');
containerDiv.setAttribute('style', 'height: 800px; width: 800px; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 1px solid black;');
var mouseIsDown = false
let strokeColor = 'black';

const Dimension = 100;        //Canvas Dimesion

const colorDrop = document.getElementById('colorDrop');
const colorInput = document.getElementById('favcolor');

//Function to convert style.backgroundColor value to hex
function rgbToHex(rgb) {
    // Create a canvas element (used to convert named colors to RGB)
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    // Check if the input is a named color
    ctx.fillStyle = rgb;
    let rgbColor = ctx.fillStyle; // This will return the RGB value or hex equivalent

    // If already in hex format, return it
    if (rgbColor[0] === "#") {
        return rgbColor;
    }

    // If it's in rgb format, convert to hex
    let rgbArray = rgbColor.match(/\d+/g);

    // Convert each number to hex and pad with zeroes if necessary
    let hex = rgbArray.map(num => {
        let hexValue = parseInt(num).toString(16);
        return hexValue.length === 1 ? '0' + hexValue : hexValue;
    });

    // Combine hex values and return the hex code with a "#" prefix
    return `#${hex.join('')}`;
}

let colorDropOn = false;
let ResetOn = false;

//Color Drop button - Get the color of the div and set it as the stroke color
colorDrop.addEventListener('click', function () {
    colorDropOn = true;
    colorDrop.setAttribute('style', 'border: 3px solid black;');
})

//Get color input from color wheel and set it as the stroke color
colorInput.addEventListener('input', function (event) {
    strokeColor = event.target.value;
})

//Reset Canvas
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    containerDiv.innerHTML = "";
    createCanvas();
})

function createCanvas() {
    for (let i = 0; i < Dimension; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.setAttribute('style', 'height: ' + `${800 / Dimension}` + 'px; width: 800px; display: flex; flex-direction: row; justify-content: center; align-items: center;');
        for (let j = 0; j < Dimension; j++) {
            const div = document.createElement('div');
            div.setAttribute('class', 'box');
            div.setAttribute('style', 'height:' + `${800 / Dimension}` + 'px; width: ' + `${800 / Dimension}` + 'px; background-color: white;');
            div.addEventListener('mousedown', function () { mouseIsDown = true })
            div.addEventListener('mouseup', function () { mouseIsDown = false })
            
            //on MouseDown, set div to stroke color
            //and if colorDropOn is true, set stroke color to div color
            div.addEventListener('mousedown', function () {
                if (colorDropOn) {
                    strokeColor = div.style.backgroundColor;
                    colorInput.value = rgbToHex(div.style.backgroundColor);
                    colorDrop.setAttribute('style', '');
                    colorDropOn = false;
                }
                div.setAttribute('style', 'height:' + `${800 / Dimension}` + 'px; width: ' + `${800 / Dimension}` + 'px; background-color:' + `${strokeColor}` + ';');
            })

            //on Mouse movement, set div to stroke color
            div.addEventListener("mouseover", (event) => {
                if (mouseIsDown) {
                    div.setAttribute('style', 'height:' + `${800 / Dimension}` + 'px; width: ' + `${800 / Dimension}` + 'px; background-color:' + `${strokeColor}` + ';');
                }
            })

            rowDiv.appendChild(div);
        }
        containerDiv.appendChild(rowDiv);
    }
}

createCanvas();




