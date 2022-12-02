let numColumnas = 8;
crear();
caminoCorrecto=[0,3,5,7,9,11, 12, 14, 17];
let cuadrados = document.getElementsByClassName("cuadrado");
const columnas = document.getElementsByClassName('columna');
for (let index = 0; index < cuadrados.length; index++) {
    cuadrados[index].addEventListener("click",(e)=>{
        console.log(e.target.id);
        let numeroCuadrado=0;
        numeroCuadrado = Number.parseInt(e.target.id);
        console.log(numeroCuadrado);
        let elementoArray = Math.floor(numeroCuadrado/2);
        console.log(elementoArray);
        if(e.target.id!=caminoCorrecto[elementoArray]){
            console.log("Ostion")
            e.target.style.backgroundColor="red";
            fin();
        }
        else{
            console.log("Siga usted buen hombre")
            movLinealPersonaje();
            if(numeroCuadrado%2==0){
                desactivar(elementoArray,1); 
            }
            else if(numeroCuadrado%2==1){
                desactivar(elementoArray,0)
            }
            e.target.style.backgroundColor="green";

        }

    });   
}

function desactivar(numeroColumna,posicionCuadrado){
    const columna = columnas[numeroColumna];
    let cuadrado = columna.getElementsByTagName("DIV")[posicionCuadrado];
    console.log(cuadrado);
    cuadrado.style.backgroundColor = "red";
}

function crear(){
    let contadorID=0;
    const container = document.createElement('div');
    container.classList.add("container");
    document.body.appendChild(container);
    let divPersonaje = document.createElement("DIV");
    divPersonaje.classList.add("personaje");
    let imagenPersonaje = document.createElement("IMG");
    imagenPersonaje.setAttribute("src","css/Imagenes/Idle__000.png");
    divPersonaje.append(imagenPersonaje);
    document.body.append(divPersonaje);
    
    for(i = 0; i <= numColumnas; i++){
        const columna = document.createElement('div');
        columna.classList.add("columna");
        container.appendChild(columna)
        for(j=0;j<2;j++){
            let cuadrado = document.createElement("DIV");
            cuadrado.classList.add("cuadrado");
            cuadrado.setAttribute("id",`${contadorID}`);
            columna.appendChild(cuadrado);
            contadorID++;
        }
    }
}

function fin(){
    let h1 = document.createElement("H1");
    h1.innerText="Fin del juego";
    document.body.appendChild(h1);
    const boton = document.createElement('button');
    boton.setAttribute("onclick", "borrar()");
    boton.innerText = "Volver";
    document.body.appendChild(boton);
}

function borrar(){
    let container = document.getElementsByClassName("container")[0];
    container.remove();
    let h1 = document.querySelectorAll('h1');
    h1[0].remove();
    let boton = document.querySelectorAll('button');
    boton[0].remove();
    crear();
}

function movLinealPersonaje(){
    let divPersonaje = document.getElementsByClassName("personaje")[0];
    var style = divPersonaje.currentStyle || window.getComputedStyle(divPersonaje);
    console.log(style.marginTop);
}

//movimiento linea margin: valor actual auto auto valor actual+9
//movimiento horizontal margin: valor actual+17 auto auto valor actual+9
/*
Movimiento lineal
margin: valorActual+17 auto auto valorActual+9
*/
/*
Movimiento horizontal
*/

//1 vh = 6,792px