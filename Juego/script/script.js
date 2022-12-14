let caminoCorrecto=[];
let intentos = 0;
let cuadroActual=-1;
let numColumnas= 0;
let caminoCompletado=false;
let audio = new Audio('audios/SnapSave.io - Sword Draw Sound Effect (128 kbps).mp3');
let audio2 = new Audio('audios/musicaFondo.mp3');
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
                var audioSalto = new Audio('audios/salto.mp3');
                audioSalto.play();
                audioSalto.volume = 0.5;
                let udsSaltoAbajoArrriba=17;
                console.log("Siga usted buen hombre")
                console.log("El cuadrado en el que estabas era" + cuadroActual)
                //El personaje empieza en la plataforma inicial, por lo que el valor de cuadroActual es -1.
                if(cuadroActual==-1){
                    //Desde la plataforma inicial, hay que saltar menos distancia, por lo que las variable de uds
                    // de salto es mas baja
                    udsSaltoAbajoArrriba = 8;
                    
                    //Cuando la variable numeroCuadrado es par, significa que el personaje quiere ir hacia la fila de arriba
                    if(numeroCuadrado%2==0){
                        setTimeout(desactivar(elementoArray,1),500);
                        
                        direccion = "arriba"
                        movDiagonalPersonaje(direccion, udsSaltoAbajoArrriba);
                    }
                    //En caso contrario, va hacia abajo
                    else{
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
                        //Una vez dentro del camino, se pueden dar dos casos:
                        //-----El primero de ellos es que el personaje esté en la fila de abajo, y quiera ir a la fila 
                        //-----de arriba.
                        if(cuadroActual%2==1){
                            direccion = "arriba";
                                direccion = "arriba";
                                if(((numeroCuadrado/2)+1)==(caminoCorrecto.length)){
                                    activarEvento(direccion, cuadroActual-1);
                                }
                                else{
                                    activarEvento(direccion, numeroCuadrado);
                                }
                                movDiagonalPersonaje("arriba", udsSaltoAbajoArrriba);

                        }
                        //Y el otro caso, es que quiera avanzar, pero seguir en la misma fila. En ese caso, el movimiento
                        //pasa a ser un movimiento lateral.
                        else{
                            movimientoLateral();
                            // La variable dirección se iguala a arriba porque, aunque se haga un movimiento lateral,
                            // se encuentra en la fila de arriba. Esto cobra sentido, cuando se explique la implementación
                            // del método activar evento.

                            direccion = "arriba";

                            //En caso de que estemos en la penúltima columna, y vayamos a hacer el salto final, el método 
                            //de activar evento cambia de parámetro, y pasa a ser el valor del cuadro en el que nos encontramos
                            //ahora.
                            if(((numeroCuadrado/2)+1)==(caminoCorrecto.length)){
                                activarEvento(direccion, cuadroActual);
                            }
                            else{
                                activarEvento(direccion, numeroCuadrado);
                            }
                        }
                    }

                    //Los mismos casos que se han mencionado cuando queremos ir a un cuadro de la fila de arriba
                    //ocurren cuando queremos ir a la fila de abajo. Simplemente, los valore son los contrarios.
                    else if(numeroCuadrado%2==1){
                        setTimeout(desactivar(elementoArray,0),500);
                        if(cuadroActual%2==0){
                            direccion = "abajo";
                            if(((numeroCuadrado/2)+1)==(caminoCorrecto.length)){
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
                                if(((numeroCuadrado/2)+1)==(caminoCorrecto.length)){
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
                console.log(numeroCuadrado);
                let final = caminoCorrecto.length-1;
                console.log(caminoCorrecto[final]);
                //Si el cuadrado al que vamos a saltar, es correcto, y además es el último, se muestra el mensaje
                // de felicitación por completar el camino.
                if(numeroCuadrado==caminoCorrecto[final]){
                    caminoCompletado = true;
                    console.log("Entra")
                    fin();
                }
                //En caso contrario,se hace lo siguiente.
                else{
                    //Las columnas que ya hemos pasado, se desactivan
                    desactivarEvento(direccion, numeroCuadrado);
                    //Se resetea la postura del personaje 
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

                        //El cuadro incorrecto de la columna, se cae
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
    //En función de la dificultad que se elija se asignaran un número de intentos y un número de columnas que dictaminan como de largo será el camino
    //El número de columnas se pasará al método que crea el camino.
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
    //Creación del camino
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

    let volver = document.createElement('button');
    volver.classList.add("menuInicio");
    volver.setAttribute("onclick", "menu()");
    volver.innerHTML = "Volver al inicio";
    document.body.appendChild(volver);

    aniadirEvento();
}
//Este método comprueba por que motivo se ha acabado el juego y enseña el menú correspondiente.(Intento fallido, ganar, perder)
function fin(){
    borrar();
    let divFin = document.createElement("DIV");
    divFin.classList.add("fin");
    let h1 = document.createElement("H1");
    const boton = document.createElement('button');
    if(intentos>0 && caminoCompletado==false){
        h1.innerText="Ops! Te has caido";
        boton.setAttribute("onclick", "empezar();");
        boton.innerText = "Inténtalo otra vez";
        intentos--;
    }
    else if(caminoCompletado){
        audio2.pause();
        h1.innerText="¡Enhorabuena! ¡Has completado el camino!";
        boton.setAttribute("onclick", "menu();");
        boton.innerText = "Jugar otra vez";
        divFin.setAttribute("style","background:#075d07");
        // document.getElementsByClassName('intentos')[0].remove();
    }
    else{
        audio2.pause();
        h1.innerText="Fin del juego";
        boton.setAttribute("onclick", "menu();");
        boton.innerText = "Jugar otra vez";
        // document.getElementsByClassName('intentos')[0].remove();
    }
    divFin.appendChild(h1);
    divFin.appendChild(boton);
    document.body.appendChild(divFin);
}
//El método comprueba que existen los siguientes apartados y en caso de que existan los borra.
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
    if(document.getElementsByClassName("fin")[0] != null){
        document.getElementsByClassName("fin")[0].remove();
    }
    if(document.getElementsByClassName("menuInicio")[0] != null){
        document.getElementsByClassName("menuInicio")[0].remove();
    }
    if(document.getElementsByClassName("intentos")[0] != null){
        document.getElementsByClassName("intentos")[0].remove();
    }

}

//Este método borra lo que hay en pantalla y llama al método que crea la interfaz del juego
function empezar() {
    borrar();
    crear();
}
//Crea un número aleatorio entre dos valores
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

/**
 * Método encargado de realizar el movimiento diagonal del personaje.
 * @param {"Direccion hacia la que se va a mover el personaje"} direccion 
 * @param {"Distancia que va a saltar el personaje"} udsSaltoAbajoArrriba 
 */
function movDiagonalPersonaje(direccion,udsSaltoAbajoArrriba){
    let  divPersonaje = document.getElementsByClassName("personaje")[0];
    imagenPersonaje = divPersonaje.getElementsByTagName("img")[0];
    //Se cambia la postura del personaje, cambiando su imagen.
    divPersonaje.setAttribute("style","width:80px;");
    imagenPersonaje.src="css/Imagenes/Glide_004.png";
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

    // Se obtiene donde se encuentra ahora el personaje.
    pixelesMTopOriginal = Number.parseFloat(marginTop);
    pixelesMLeftOriginal = Number.parseFloat(marginLeft);
    let pixelesDespuesSaltoAbajo;
    let pixelesDespuesSaltoLado;
    switch(direccion){
        case "abajo":
            //Si la dirección es hacia abajo, se aumenta el margen top, y se añade más margen lateral.
            pixelesDespuesSaltoAbajo = pixelesMTopOriginal + (6.792*udsSaltoAbajoArrriba);
            pixelesDespuesSaltoLado = pixelesMLeftOriginal + (6.792*20);
            console.log(pixelesDespuesSaltoLado);
            divPersonaje.style.marginLeft = pixelesDespuesSaltoLado.toString().concat("px");
            divPersonaje.style.marginTop = pixelesDespuesSaltoAbajo.toString().concat("px");
            break;
        case "arriba":
            //Si la dirección es hacia arriba, se resta el margen top,y se añade más margen lateral.
            pixelesDespuesSaltoAbajo = pixelesMTopOriginal - (6.792*udsSaltoAbajoArrriba);
            pixelesDespuesSaltoLado = pixelesMLeftOriginal + (6.792*20);
            console.log(pixelesDespuesSaltoLado);
            divPersonaje.style.marginLeft = pixelesDespuesSaltoLado.toString().concat("px");
            divPersonaje.style.marginTop = pixelesDespuesSaltoAbajo.toString().concat("px");
    }

}

/**
 * Método encargado del movimiento en lateral del personaje.
 */
function movimientoLateral(){
    let  divPersonaje = document.getElementsByClassName("personaje")[0];
    imagenPersonaje = divPersonaje.getElementsByTagName("img")[0];

    //Se cambia la postura del personaje, cambiando su imagen.
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
    // Se añade margen lateral.
    pixelesDespuesSaltoLado = pixelesMLeftOriginal + (6.792*20);
    console.log(pixelesDespuesSaltoLado);
    divPersonaje.style.marginLeft = pixelesDespuesSaltoLado.toString().concat("px");
    divPersonaje.style.marginTop = (marginNumTop+(0*6.792)).toString().concat("px");
}


/**
 * Método encargado de desactivar los eventos de los cuadrados que ya no lo necesiten.
 * @param {"Dirección a la que va el personaje."} direccion 
 * @param {"El número del cuadrado, a partir del cual se desactivarán los eventos"} numeroCuadrado 
 */
function desactivarEvento(direccion, numeroCuadrado){
    let cuadrado1;
    let cuadrado2;
    switch(direccion){
        //Si el personaje va, o se mantiene en la fila de abajo, se desactivará, el cuadrado en el que estaba antes,
        // y el de arriba.
        case "abajo":
            cuadrado1 = document.getElementById(`${numeroCuadrado}`);
            cuadrado2 = document.getElementById(`${numeroCuadrado - 1}`);
            break;
        case "arriba":
        //Si el personaje va, o se mantiene en la fila de arriba, se desactivará, el cuadrado en el que estaba antes,
        // y el de abajo.
            cuadrado1 = document.getElementById(`${numeroCuadrado}`);
            cuadrado2 = document.getElementById(`${numeroCuadrado + 1}`);
            break;
    }
    cuadrado1.style.pointerEvents = "none";
    cuadrado2.style.pointerEvents = "none";
}

/**
 * Método encargado de activar los eventos de la columna siguiente a la que vamos a saltar.
 * @param {"Dirección a la que va el personaje."} direccion 
 * @param {"El número del cuadrado, a partir del cual se activarán los eventos"} numeroCuadrado 
 */
function activarEvento(direccion, numeroCuadrado){
    let cuadrado1;
    let cuadrado2;
    if(numeroCuadrado==caminoCorrecto[caminoCorrecto.length-1]){
        numeroCuadrado=cuadroActual;
    }

    //Se activarán los cuadros a los que el personaje podrá saltar, la vez siguiente.
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

//Crea el menu de inicio
function menu(){
    caminoCompletado = false;
    borrar();
    const contenedor = document.createElement('div');
    contenedor.classList.add("contenedor");
    document.body.appendChild(contenedor);

    const divH1 = document.createElement("div");
    divH1.classList.add("titulo");
    contenedor.appendChild(divH1);

    const titulo = document.createElement('h1');
    titulo.innerHTML = "NINJA JUMPER";
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

//Crea la explicacion del juego y los botones de las dificultades
function explicacion(){

    audio2.currentTime = 0;
    audio2.play();
    audio2.volume = 0.1;
    audio.play();
    audio.volume = 0.5;
    borrar();

    //Creacion del contenedor y el titulo del juego
    const contenedor = document.createElement('div');
    contenedor.classList.add("contenedor");
    document.body.appendChild(contenedor);


    const divH1 = document.createElement("div");
    divH1.classList.add("titulo");
    contenedor.appendChild(divH1);

    const titulo = document.createElement('h1');
    titulo.innerHTML = "NINJA JUMPER";
    divH1.appendChild(titulo);

    //Explicacion del juego
    const explicacion = document.createElement('div');
    explicacion.classList.add("explicacion");
    contenedor.appendChild(explicacion);


    const personajeExplicacion = document.createElement("div");
    personajeExplicacion.classList.add("personajeExplicacion");
    explicacion.appendChild(personajeExplicacion)


    const descripcionJuego = document.createElement('div');
    descripcionJuego.classList.add("descripcionJuego");
    const pDescJuego = document.createElement("p");
    pDescJuego.innerHTML = "¡Bienvenido a Ninja Jumper!En este juego, tendrás que recorrer el camino hasta el final, evitando sus trampas. Si consigues llegar al final antes de quedate sin oportunidades, habrás ganado. Dependiendo de la dificultad, tu camino será mas o menos largo, y tendrás mas o menos oportunidades. ";
    descripcionJuego.appendChild(pDescJuego);
    explicacion.appendChild(descripcionJuego);

    //botones de las dificultades y su correspondiente contenedor
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
