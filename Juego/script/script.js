let caminoCorrecto=[];
let intentos = 0;
let cuadroActual=-1;
let numColumnas= 0;
menu();
const columnas = document.getElementsByClassName('columna');

function aniadirEvento(){
     cuadroActual=-1;
    let cuadrados = document.getElementsByClassName("cuadrado");
    let direccion;
    for (let index = 0; index < cuadrados.length; index++) {
        cuadrados[index].addEventListener( "click",(e)=>{
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
                let udsSaltoAbajoArrriba=17;
                console.log("Siga usted buen hombre")
                console.log("El cuadrado en el que estabas era" + cuadroActual)
                if(cuadroActual==-1){
                    udsSaltoAbajoArrriba = 8;
                    if(numeroCuadrado%2==0){
                        // setTimeout(desactivar(elementoArray,1),500);
                        setTimeout(desactivar(elementoArray,1),500);                        
                        direccion = "arriba"
                        movDiagonalPersonaje(direccion, udsSaltoAbajoArrriba);
                    }
                    else{
                        // setTimeout(desactivar(elementoArray,0),500);
                        setTimeout(desactivar(elementoArray,0),500);
                        direccion = "abajo"
                        movDiagonalPersonaje(direccion, udsSaltoAbajoArrriba);
                    }
                    activarEvento(direccion, numeroCuadrado);

                }
                else{
                    if(numeroCuadrado%2==0){
                        udsSaltoAbajoArrriba = 17;
                        setTimeout(desactivar(elementoArray,1),500);
                        if(cuadroActual%2==1){
                            direccion = "arriba";
                                direccion = "arriba";
                                if(numeroCuadrado>(2*(columnas.length-1))){
                                    activarEvento(direccion, cuadroActual);
                                }
                                else{
                                    activarEvento(direccion, numeroCuadrado);
                                }
                                movDiagonalPersonaje("arriba", udsSaltoAbajoArrriba);

                        }
                        else{
                            movimientoLateral();
                            direccion = "arriba";
                            if(numeroCuadrado>(2*(columnas.length-1))){
                                activarEvento(direccion, cuadroActual);
                            }
                            else{
                                activarEvento(direccion, numeroCuadrado);
                            }
                        }
                    }
                    else if(numeroCuadrado%2==1){
                        setTimeout(desactivar(elementoArray,0),500);
                        if(cuadroActual%2==0){
                            direccion = "abajo";
                            if(numeroCuadrado>(2*(columnas.length-1))){
                                activarEvento(direccion, cuadroActual);
                            }
                            else{
                                activarEvento(direccion, numeroCuadrado);
                            }
                            movDiagonalPersonaje(direccion, udsSaltoAbajoArrriba);
                            desactivar(elementoArray,0);                        
                        }
                        else{
                            if(cuadroActual!=0){
                                direccion="abajo";
                                if(numeroCuadrado>(2*(caminoCorrecto.length-2))){
                                    activarEvento(direccion, cuadroActual);
                                }
                                else{
                                    activarEvento(direccion, numeroCuadrado);
                                }
                                movimientoLateral();
                            }
                            direccion = "abajo";                            
                        }
                    }
                    
                }

                console.log(cuadroActual);


                
                desactivarEvento(direccion, numeroCuadrado);
                setTimeout(function reseteoPersonaje() {
                    let divPersonaje = document.getElementsByClassName("personaje")[0];
                    divPersonaje.style.transition="none";
                    console.log(divPersonaje);
                    divPersonaje.style.width="50px";
                    let imagenPersonaje = divPersonaje.getElementsByTagName("img")[0];
                    imagenPersonaje.src = "css/Imagenes/Idle__000.png";
                    console.log("asdasdasdasdasdas");
                    e.target.style.backgroundColor="green";
                    cuadroActual = Number.parseInt(e.target.id);
                    let cuadradoACaer;
                    if(direccion=="abajo"){
                        cuadradoACaer = document.getElementById(`${cuadroActual-1}`);
                    }
                    else if(direccion=="arriba"){
                        cuadradoACaer = document.getElementById(`${cuadroActual+1}`);
                    }
                    cuadradoACaer.style.animation="caida 750ms forwards";
                    setTimeout(()=>{
                    },600)

                },500)
            }
    
        });   
    }
}

function desactivar(numeroColumna,posicionCuadrado){
    const columna = columnas[numeroColumna];
    let cuadrado = columna.getElementsByTagName("div")[posicionCuadrado];
    console.log(cuadrado);
    // cuadrado.style.animation="caida 750ms forwards";
}

function crear(dificultad){
    borrar();
    switch(dificultad){
        case "facil":
            intentos = 9;
            numColumnas = 6;
            rellenarArray(numColumnas);
            break;
        case "normal":
            intentos = 7;
            numColumnas = 8;
            rellenarArray(numColumnas);
            break;
        case "dificil":
            intentos = 4;
            numColumnas = 10;
            rellenarArray(numColumnas);
            break;
    }
    // rellenarArray(numColumnas);
    let contadorID=0;
    let containerPadre = document.createElement("div");
    containerPadre.classList.add('containerPadre');

    document.body.appendChild(containerPadre);
    
    const container = document.createElement('div');
    container.classList.add("container");

    let plataformaInicial = document.createElement('div');
    plataformaInicial.classList.add('plataformaInicial');

    containerPadre.appendChild(plataformaInicial);
    containerPadre.appendChild(container);

    let divPersonaje = document.createElement("div");
    divPersonaje.classList.add("personaje");
    let imagenPersonaje = document.createElement("img");
    imagenPersonaje.setAttribute("src","css/Imagenes/Idle__000.png");
    divPersonaje.append(imagenPersonaje);
    document.body.append(divPersonaje);
    let parrafoIntentos = document.createElement("p");
    parrafoIntentos.innerHTML=`Numero de intentos: ${intentos + 1}`;
    parrafoIntentos.classList.add("intentos");
    document.body.appendChild(parrafoIntentos);
    
    for(i = 0; i < numColumnas; i++){
        const columna = document.createElement('div');
        columna.classList.add("columna");
        container.appendChild(columna)
        for(j=0;j<2;j++){
            let cuadrado = document.createElement("div");
            cuadrado.classList.add("cuadrado");
            cuadrado.setAttribute("id",`${contadorID}`);
            columna.appendChild(cuadrado);
            if(contadorID==0 || contadorID==1){
                cuadrado.style.pointerEvents="all";
            }
            else{
                
            }
            contadorID++;
        }
    }
    aniadirEvento();
}

function fin(){
    
    borrar();
    let divFin = document.createElement("DIV");
    divFin.classList.add("fin");
    let h1 = document.createElement("H1");
    const boton = document.createElement('button');
    if(intentos>0){
        h1.innerText="Ops! Te has caido";
        boton.setAttribute("onclick", "reiniciar();");
        boton.innerText = "Inténtalo otra vez";
        intentos--;
    }
    else{
        h1.innerText="Fin del juego";
        boton.setAttribute("onclick", "empezar();");
        boton.innerText = "Jugar otra vez";
        document.getElementsByClassName('intentos')[0].remove();
    }
    divFin.appendChild(h1);
    divFin.appendChild(boton);
    document.body.appendChild(divFin);
}

function borrar(){
    if(document.getElementsByClassName("containerPadre")[0] != null){
        document.getElementsByClassName("containerPadre")[0].remove();
    }
    if(document.getElementsByClassName("contenedor")[0] != null){
        document.getElementsByClassName("contenedor")[0].remove();
    }
    if(document.getElementsByClassName("explicacion")[0] != null){
        document.getElementsByClassName("explicacion")[0].remove();
    }
    if(document.getElementsByClassName("personaje")[0] != null){
        document.getElementsByClassName("personaje")[0].remove();
    }
}

function reiniciar(){
    borrarDivFin();
    let intentos = document.getElementsByClassName("intentos")[0];
    intentos.remove();
    crear();
}

function borrarDivFin() {
    if(document.getElementsByClassName("fin").length > 0){
        document.getElementsByClassName("fin")[0].remove();
    }
}

function empezar() {
    borrarDivFin();
    crear();
}

function numeroRandomEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function rellenarArray(numeroColumnas){
    if(caminoCorrecto.length>0){
        caminoCorrecto=[];
    }

    
    for(let i = 0; i < numeroColumnas; i++){
         caminoCorrecto.push(numeroRandomEntre(i+i,i+i+1));
    }
    console.table(caminoCorrecto);
}

function movDiagonalPersonaje(direccion,udsSaltoAbajoArrriba){
    let  divPersonaje = document.getElementsByClassName("personaje")[0];
    imagenPersonaje = divPersonaje.getElementsByTagName("img")[0];
    divPersonaje.setAttribute("style","width:80px;");
    imagenPersonaje.src="css/Imagenes/Glide_004.png"; 
    // setTimeout(()=>{
    //     imagenPersonaje.src="css/Imagenes/Idle__000.png"; 
    // },300);
    var style = divPersonaje.currentStyle || window.getComputedStyle(divPersonaje);
    var marginTop = "";
    var marginLeft="";
    marginLeft = style.marginLeft;
    marginTop = style.marginTop;
    marginLeft = marginLeft.substring(0,marginLeft.length-2);
    marginTop = marginTop.substring(0,marginTop.length-2);
    console.log(marginTop);
    console.log(marginLeft);
    let pixelesMTopOriginal=0;
    let pixelesMLeftOriginal=0;
    pixelesMTopOriginal = Number.parseFloat(marginTop);
    pixelesMLeftOriginal = Number.parseFloat(marginLeft);
    let pixelesDespuesSaltoAbajo;
    let pixelesDespuesSaltoLado;
    switch(direccion){
        case "abajo":
            pixelesDespuesSaltoAbajo = pixelesMTopOriginal + (6.792*udsSaltoAbajoArrriba);
            pixelesDespuesSaltoLado = pixelesMLeftOriginal + (6.792*20);
            console.log(pixelesDespuesSaltoLado);
            divPersonaje.style.marginLeft = pixelesDespuesSaltoLado.toString().concat("px");
            divPersonaje.style.marginTop = pixelesDespuesSaltoAbajo.toString().concat("px");
            break;
        case "arriba":
            pixelesDespuesSaltoAbajo = pixelesMTopOriginal - (6.792*udsSaltoAbajoArrriba);
            pixelesDespuesSaltoLado = pixelesMLeftOriginal + (6.792*22);
            console.log(pixelesDespuesSaltoLado);
            divPersonaje.style.marginLeft = pixelesDespuesSaltoLado.toString().concat("px");
            divPersonaje.style.marginTop = pixelesDespuesSaltoAbajo.toString().concat("px");
    }
    // imagenPersonaje.src = "css/Imagenes/Idle__000.png";

}

function movimientoLateral(){
    let  divPersonaje = document.getElementsByClassName("personaje")[0];
    imagenPersonaje = divPersonaje.getElementsByTagName("img")[0];
    divPersonaje.setAttribute("style","width:80px;");
    imagenPersonaje.src="css/Imagenes/Glide_004.png"; 
    var style = divPersonaje.currentStyle || window.getComputedStyle(divPersonaje);
    var marginLeft="";
    var marginTop ="";
    marginLeft = style.marginLeft;
    marginLeft = marginLeft.substring(0,marginLeft.length-2);
    marginTop = style.marginTop;
    marginTop = marginTop.substring(0,marginTop.length-2);

    let marginNumTop = Number.parseFloat(marginTop);
    console.log(marginLeft);
    let pixelesMLeftOriginal=0;
    pixelesMLeftOriginal = Number.parseFloat(marginLeft);
    let pixelesDespuesSaltoLado;
    pixelesDespuesSaltoLado = pixelesMLeftOriginal + (6.792*20);
    console.log(pixelesDespuesSaltoLado);
    divPersonaje.style.marginLeft = pixelesDespuesSaltoLado.toString().concat("px");
    divPersonaje.style.marginTop = (marginNumTop+(0*6.792)).toString().concat("px");
}


function desactivarEvento(direccion, numeroCuadrado){
    let cuadrado1;
    let cuadrado2;
    switch(direccion){
        case "abajo":
            cuadrado1 = document.getElementById(`${numeroCuadrado}`);
            cuadrado2 = document.getElementById(`${numeroCuadrado - 1}`);
            break;
        case "arriba":
            cuadrado1 = document.getElementById(`${numeroCuadrado}`);
            cuadrado2 = document.getElementById(`${numeroCuadrado + 1}`);
            break;
    }
    cuadrado1.style.pointerEvents = "none";
    cuadrado2.style.pointerEvents = "none";
}

function activarEvento(direccion, numeroCuadrado){
    let cuadrado1;
    let cuadrado2;
    if(numeroCuadrado==caminoCorrecto[caminoCorrecto.length-1]){
        numeroCuadrado=cuadroActual;
    }
    switch(direccion){
        case "abajo":
            cuadrado1 = document.getElementById(`${numeroCuadrado +1}`);
            cuadrado2 = document.getElementById(`${numeroCuadrado +2}`);
            console.log(cuadrado1);
            console.log(cuadrado2);
            break;
        case "arriba":
            cuadrado1 = document.getElementById(`${numeroCuadrado + 2}`);
            cuadrado2 = document.getElementById(`${numeroCuadrado + 3}`);
            console.log(cuadrado1);
            console.log(cuadrado2);
            break;
    }
    cuadrado1.style.pointerEvents="all";
    cuadrado2.style.pointerEvents="all";
}

function obtenerNumeroDeMargin(margin){
    return  Number.parseFloat(margin.substring(0,marginLeft.length-2));
}

function menu(){
    borrar();
    const contenedor = document.createElement('div');
    contenedor.classList.add("contenedor");
    document.body.appendChild(contenedor);

    const divH1 = document.createElement("div");
    divH1.classList.add("titulo");
    contenedor.appendChild(divH1);

    const titulo = document.createElement('h1');
    titulo.innerHTML = "Juego de memoria";
    divH1.appendChild(titulo);

    const personajeMenuPpal = document.createElement("div");
    personajeMenuPpal.classList.add("personajeMenuPpal");
    // let imagenPersonaje = document.createElement("img");
    // personajeMenuPpal.appendChild(imagenPersonaje); 
    // imagenPersonaje.src="css/Imagenes/Idle__000.png";
    contenedor.append(personajeMenuPpal);

    const empezar = document.createElement('button');
    empezar.classList.add("empezar");
    empezar.innerHTML = "Empezar";
    empezar.setAttribute("onclick", "explicacion()");
    contenedor.appendChild(empezar);
}

function explicacion(){
    borrar();
    const contenedor = document.createElement('div');
    contenedor.classList.add("contenedor");
    document.body.appendChild(contenedor);


    const divH1 = document.createElement("div");
    divH1.classList.add("titulo");
    contenedor.appendChild(divH1);

    const titulo = document.createElement('h1');
    titulo.innerHTML = "Juego de memoria";
    divH1.appendChild(titulo);

    
    const explicacion = document.createElement('div');
    explicacion.classList.add("explicacion");
    contenedor.appendChild(explicacion);
    

    const personajeExplicacion = document.createElement("div");
    personajeExplicacion.classList.add("personajeExplicacion");
    explicacion.appendChild(personajeExplicacion)
    

    const descripcionJuego = document.createElement('div');
    descripcionJuego.classList.add("descripcionJuego");
    const pDescJuego = document.createElement("p");
    pDescJuego.innerHTML = "¡Bienvenido a (Nombre del juego)!En este juego, tendrás que recorrer el camino hasta el final, evitando sus trampas. Si consigues llegar al final antes de quedate sin oportunidades, habrás ganado. Dependiendo de la dificultad, tu camino será mas o menos largo, y tendrás mas o menos oportunidades. ";
    descripcionJuego.appendChild(pDescJuego);
    explicacion.appendChild(descripcionJuego);

    const botonesDiv = document.createElement('div');
    botonesDiv.classList.add("botonesDiv");
    contenedor.appendChild(botonesDiv);
    
    const facil = document.createElement('button');
    facil.classList.add("facil");
    facil.innerHTML = "Fácil";
    facil.setAttribute("onclick", "crear(\"facil\")");
    botonesDiv.appendChild(facil);

    const normal = document.createElement('button');
    normal.classList.add("normal");
    normal.innerHTML = "Normal";
    normal.setAttribute("onclick", "crear(\"normal\")");
    botonesDiv.appendChild(normal);

    const dificil = document.createElement('button');
    dificil.classList.add("dificil");
    dificil.innerHTML = "Dificil";
    dificil.setAttribute("onclick", "crear(\"dificil\")");
    botonesDiv.appendChild(dificil);
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