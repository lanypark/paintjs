const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");  //fill&paint button
const saveBtn = document.getElementById("jsSave");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

context.fillStyle = "white";            //select color of the canvas background
context.fillRect(0,0, canvas.offsetWidth, canvas.offsetHeight);  //select the size of the canvas background
context.strokeStyle = "black";  //initial color
context.lineWidth =2.0;         //initial size

let painting = false;
let filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY; 
    if(!painting) {
        context.beginPath(); 
        context.moveTo(x, y); //if block -> choose starting and end point
    } else {
        context.lineTo(x,y);
        context.stroke();
    }   
}

function startPainting(event) {
    painting = true;
}

function stopPainting(event) {
    painting = false;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    context.strokeStyle =color; //override the color of the pen from initial color(black)
    context.fillStyle = color;

}

function handleRangeChange(event) {
    const size = event.target.value;
    context.lineWidth = size;
}
function handleModeClick() {  //painting or filling option button
    if (filling) {
        filling = false;
        modeBtn.innerText = "Fill";
    } else {
        filling = true;
        modeBtn.innerText = "Paint";
    }
}
function handleCanvasClick() {
    if (filling) {
        context.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    }
}
function handleCM(event) {
    event.preventDefault();
}
function handleSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS😎";
    link.click();
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("contextmenu", handleCM);

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

range.addEventListener("input", handleRangeChange);

modeBtn.addEventListener("click", handleModeClick);

saveBtn.addEventListener("click", handleSaveClick);