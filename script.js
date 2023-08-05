//-- Accion: Genera los Block y los Fragments y los ponen en el Board
const nBlocks = 81;
const getBoard = document.getElementById('board'); 

function createFragments(index) {
  const fragments = document.createElement("div");
  fragments.className = `fragments fragment-${index}`;
  return fragments;
}

function createBlocks() {
  const blocks = document.createElement("div");
  blocks.className = "blocks";

  for (let i = 1; i <= 8; i++) {
    blocks.appendChild(createFragments(i));
  }

  return blocks;
}

for (let i = 1; i <= nBlocks; i++) {
  getBoard.appendChild(createBlocks(i));
}



//-- Accion: Pintar
let statusColor = true
const getColorPicker = document.querySelector("#colorPicker")
const getFragments = document.querySelectorAll(".fragments")
getFragments.forEach((i)=>i.addEventListener("click",paintFragments))


function paintFragments(){
  let color = getColorPicker.value
  this.style.backgroundColor = statusColor ? color : colorSwatch
}

//-- Crea los Swatches y pinta apartir de seleccionar los Swatches
const barSwatches = document.querySelector("#barSwatches")
let colorSwatch = ""

function createSwatches(){
  statusColor = true
  const swatch = document.createElement("div")
  swatch.style.backgroundColor = getColorPicker.value
  swatch.className = "swatches"
  barSwatches.appendChild(swatch)
  
  const getSwatches = document.querySelectorAll(".swatches")
  getSwatches.forEach((i)=>i.classList.remove("swatchOn"))

  swatch.classList.add("swatchOn") 

  getSwatches.forEach((i)=>i.addEventListener("click", pickSwatches))
}

function pickSwatches(){
  statusColor = false
  colorSwatch = this.style.backgroundColor
  
  const getSwatches = document.querySelectorAll(".swatches")
  getSwatches.forEach((i)=>i.classList.remove("swatchOn"))
  this.classList.add("swatchOn")
}

getColorPicker.addEventListener("change", createSwatches)




//-- Boton: Borrar Todo
const getCleaner = document.querySelector("#cleaner")
const getEraser = document.querySelector("#eraser")
getCleaner.addEventListener("click", cleanBoard)
const colorWhite = "var(--color-base-white)"

function cleanBoard(){
  getEraser.classList.remove("on")
  getFragments.forEach((i) => i.style.backgroundColor = colorWhite)
  stopEraser()
}


//--  Prende y apaga las Tools
const getTools = document.querySelectorAll(".tool")
const getEdits = document.querySelectorAll(".edit")
const getFractals = document.querySelectorAll(".fractal")

getTools.forEach((i) => i.addEventListener("click", toggleTools))

function toggleTools(){

  let isOn = this.classList.contains("on")

  if(this.classList.contains("edit")){
    getEdits.forEach((i) => i.classList.replace("on","off"))
    this.classList.remove("off")

    this.classList.toggle("on", !isOn)
  }

  if(this.classList.contains("tool")){
    this.classList.toggle("on", !isOn)
  }

  if(this.classList.contains("fractal")){
    getFractals.forEach((i) => i.classList.replace("on","off"))
    this.classList.remove("off")

    this.classList.toggle("on")
  }
}



//--  Activa el Borrador
getEraser.addEventListener("click",activeEraser)

function activeEraser(){
  this.classList.contains("on") ? startEraser() : stopEraser();
}
function startEraser(){
  console.log("entra")
  getFragments.forEach((i) => i.addEventListener("mouseover",colorEraser))
}
function stopEraser(){
  console.log("sale")
  getFragments.forEach((i) => i.removeEventListener("mouseover",colorEraser))
}
function colorEraser(){
  this.style.backgroundColor = colorWhite
}

//-- Activa el eraser con la tecla E
getEraser.addEventListener("keydown", pressEraser);
let isEraserOn = true;

function pressEraser(event) {
  if (event.code === "KeyE") {
    toggleEraser();
  }
}

function toggleEraser() {
  isEraserOn = !isEraserOn;
  if (isEraserOn) {
    startEraser();
    console.log("reiniciar");
  } else {
    stopEraser();
    console.log("parar");
  }
  getEraser.classList.toggle("on", isEraserOn);
}




//-- Activa el rayBrush con Click
const getRayBrush = document.querySelector("#rayBrush")
getRayBrush.addEventListener("click",activeRayBrush)

getRayBrush.addEventListener("touchemove",activeRayBrush)
getRayBrush.addEventListener("touchstart",activeRayBrush)

function activeRayBrush(){
  this.classList.contains("on") ? startRayBrush() : stopRayBrush();
}
function startRayBrush(){
  getFragments.forEach((i)=>i.addEventListener("mouseover",paintFragments))
}
function stopRayBrush(){
  getFragments.forEach((i)=>i.removeEventListener("mouseover",paintFragments))
}

//-- Activa el rayBrush con la tecla Z
getRayBrush.addEventListener("keydown", pressRayBrush);
let isBrushOn = true;

function pressRayBrush(event) {
  if (event.code === "KeyZ") {
    toggleBrush();
  }
}

function toggleBrush() {
  isBrushOn = !isBrushOn;
  if (isBrushOn) {
    startRayBrush();
    console.log("reiniciar");
  } else {
    stopRayBrush();
    console.log("parar");
  }
  getRayBrush.classList.toggle("on", isBrushOn);
}






// ------------fractales
const getF1 = document.querySelectorAll(".fragment-1")
const getF2 = document.querySelectorAll(".fragment-2")
const getF3 = document.querySelectorAll(".fragment-3")
const getF4 = document.querySelectorAll(".fragment-4")
const getF5 = document.querySelectorAll(".fragment-5")
const getF6 = document.querySelectorAll(".fragment-6")
const getF7 = document.querySelectorAll(".fragment-7")
const getF8 = document.querySelectorAll(".fragment-8")

const getFractalSwitch = document.querySelector("#fractalSwitch")
const statusFractals = true

getFractalSwitch.addEventListener("click", setFractals)

function setFractals(){
  getFractalSwitch.classList.contains("on") ? activeFractales() : removeFractals()
}

function activeFractales (){
  let display = !statusFractals ? "none" : "block"
  getF1.forEach((i) => i.style.clipPath = "polygon(0% 0%, 50% 0%, 50% 50%, 50% 50%)")

  getF2.forEach((i) => i.style.clipPath = "polygon(50% 50%, 100% 0%, 100% 50%, 50% 50%)")
  
  getF3.forEach((i) => i.style.clipPath = "polygon(50% 50%, 50% 50%, 100% 100%, 50% 100%)")
  
  getF4.forEach((i) => i.style.clipPath = "polygon(0% 50%, 50% 50%, 50% 50%, 0% 100%)")

  getF5.forEach((i) => {i.style.display = display;
    i.style.clipPath = "polygon(50% 0%, 100% 0%, 50% 50%, 50% 50%)"})
  
  getF6.forEach((i) => {i.style.display = display;
    i.style.clipPath = "polygon(50% 50%, 100% 50%, 100% 100%, 50% 50%)"})

  getF7.forEach((i) => {i.style.display = display;
    i.style.clipPath = "polygon(50% 50%, 50% 50%, 50% 100%, 0% 100%)"})
  
  getF8.forEach((i) => {i.style.display = display;
    i.style.clipPath = "polygon(0% 00%, 50% 50%, 50% 50%, 0% 50%)"})
}

function removeFractals (){
  let display = statusFractals ? "none" : "block"

  getF1.forEach((i) => i.style.clipPath = "polygon(0% 0%, 100% 0%, 50% 50%, 50% 50%)")

  getF2.forEach((i) => i.style.clipPath = "polygon(50% 50%, 100% 0%, 100% 100%, 50% 50%)")
  
  getF3.forEach((i) => i.style.clipPath = "polygon(50% 50%, 50% 50%, 100% 100%, 0% 100%)")
  
  getF4.forEach((i) => i.style.clipPath = "polygon(0% 0%, 50% 50%, 50% 50%, 0% 100%)")

  getF5.forEach((i) => i.style.display = display)
  getF6.forEach((i) => i.style.display = display)
  getF7.forEach((i) => i.style.display = display)
  getF8.forEach((i) => i.style.display = display)
}



// cambiar cantidad de Blocks
const getNumb3 = document.querySelector("#number5")
const getNumb7 = document.querySelector("#number7")
const getNumb9 = document.querySelector("#number9")

getNumb3.addEventListener("click", switchTo5)
getNumb7.addEventListener("click", switchTo7)
getNumb9.addEventListener("click", switchTo9)
let getBlokes = document.querySelectorAll(".blocks")

function switchTo5 (){
  // cleanBoard()
  getBlokes.forEach((i)=> i.style.width = "var(--size-5)")
}
function switchTo7 (){
  // cleanBoard()
  getBlokes.forEach((i)=> i.style.width = "var(--size-7)")
}
function switchTo9 (){
  // cleanBoard()
  getBlokes.forEach((i)=> i.style.width = "var(--size-9)")
}



// Ejemplos de Imagenes   
const mainPicture = document.querySelector("#mainPicture")
const pictureName = document.querySelector("#mainPictureName")
const getSamplePictures = document.querySelectorAll(".samplePictures")

let firstSampleSrc = getSamplePictures[0].getAttribute("src")
let firstSampleTitle = getSamplePictures[0].getAttribute("title")
mainPicture.setAttribute("src", firstSampleSrc)
pictureName.innerText = firstSampleTitle

getSamplePictures.forEach((i) => i.addEventListener("click",changeSample))

function changeSample(){
  let title = this.getAttribute("title")
  let src = this.getAttribute("src")
  console.log(src)

  pictureName.innerText = title
  mainPicture.setAttribute("src", src)
  mainPicture.setAttribute("title", title)
}




// Descargar Board como archivo JSON
const titleBoard = document.querySelector("#title")

function descargarJSON() {

  let myPoligon = {
    board: getBoard.innerHTML,
    nameBoard: titleBoard.value
  }

  // Convertir el objeto JSON a una cadena de texto
  const contenidoTexto = JSON.stringify(myPoligon);

  // Crear un objeto Blob con el contenido del archivo
  const blob = new Blob([contenidoTexto], { type: "application/json" });

  // Crear un objeto URL para el Blob
  const url = URL.createObjectURL(blob);

  // Crear un enlace (ancla) temporal
  const a = document.createElement("a");
  a.href = url;
  a.download = "datos.json"; // Nombre del archivo a descargar
  a.style.display = "none";

  // Agregar el enlace al documento
  document.body.appendChild(a);

  // Simular un clic en el enlace para iniciar la descarga
  a.click();

  // Liberar el objeto URL y eliminar el enlace
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Asociar la función de descarga al clic del botón
const descargarBtn = document.getElementById("saveBoard");
descargarBtn.addEventListener("click", descargarJSON);




// Cargar elemento JSON
document.addEventListener("DOMContentLoaded", () => {
  const archivoJSONInput = document.getElementById("archivoJSONInput");
  const resultadoDiv = document.getElementById("board");


  archivoJSONInput.addEventListener("change", cargarArchivoJSON);

  function cargarArchivoJSON() {
    const archivo = archivoJSONInput.files[0];

    if (!archivo) {
      alert("Por favor, selecciona un archivo JSON.");
      return;
    }

    const lector = new FileReader();

    lector.onload = function (evento) {
      try {
        const contenidoTexto = evento.target.result;
        const contenidoJSON = JSON.parse(contenidoTexto);
        const clave = "board"; // Cambia "nombre" por la clave que desees mostrar
        const clave2 = "nameBoard"; // Cambia "nombre" por la clave que desees mostrar

        if (contenidoJSON.hasOwnProperty(clave)) {
            resultadoDiv.innerHTML = contenidoJSON[clave];
            titleBoard.value = contenidoJSON[clave2];
          } else {
            resultadoDiv.textContent = "La clave especificada no existe en el archivo seleccionado.";
          }
          
      } catch (error) {
        resultadoDiv.textContent = "Error al cargar el archivo. No es un formato válido.";
      }
    };

    lector.readAsText(archivo);
  }
});