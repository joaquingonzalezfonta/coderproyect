const inputNombre = document.querySelector('#nombre');
const buttonGuardar = document.querySelector('#guardar');
const nombreUsuario = document.querySelector('#nombreUsuario')
const edadInput = document.querySelector('#inputedad')
const inputPresupuesto = document.querySelector('#presupuesto')
const inputPasajeros = document.querySelector('#pasajeros')
const tituloPrincipal = document.querySelector('.principalTitle')

const nuevaEdad = edadInput.value

buttonGuardar.addEventListener("click", () => {
    const nuevoNombre = inputNombre.value
    const edad = parseInt(edadInput.value);
    const presupuesto = parseInt(inputPresupuesto.value)
    const pasajeros = parseInt(inputPasajeros.value)

    nombreUsuario.textContent = nuevoNombre
    tituloPrincipal.textContent = "Bien hecho, estas mas cerca del viaje!"
    inputNombre.value = '';
    edadInput.value = '';
    inputPresupuesto.value = '';
    inputPasajeros.value = '';


    if (isNaN(edad)) {
        console.log("Por favor ingresa una edad válida.");
        return;
    }

    mostrarPaquetes(edad);
    filtroPorPresupuesto(edad, presupuesto);

    if (edad >= 18) {
        if (isNaN(pasajeros) || pasajeros <= 0) {
            console.log("Por favor ingresa una cantidad válida de pasajeros.");
            return;
        }
        calcularPrecioPaquetes(paquetesViajes, pasajeros);
    }


})

function filtroPorPresupuesto(edad, presupuesto) {



    if (edad < 18) {
        console.log("Sos menor de edad, no puedes reservar paquetes")
        return;
    }

    if (isNaN(presupuesto)) {
        console.log("Por favor ingrese un presupuesto valido")
        return;
    }

    let paquetesFiltrados = []

    if (presupuesto <= 1000) {
        paquetesFiltrados = paquetesViajes.filter(paquetesViajes => paquetesViajes.precio <= 1000)

    } else if (presupuesto <= 2000) {
        paquetesFiltrados = paquetesViajes.filter(paquetesViajes => paquetesViajes.precio <= 2000)

    } else if (presupuesto <= 3000) {
        paquetesFiltrados = paquetesViajes.filter(paquetesViajes => paquetesViajes.precio <= 3000)

    } else {
        paquetesFiltrados = paquetesViajes;

    }

    console.log("Estos son los paquetes para el presupuesto: ", paquetesFiltrados)
}

function mostrarPaquetes(edad) {
    if (edad >= 18) {
        console.log("Podes entrar a ver los paquetes")
        console.log(paquetesViajes)
    } else {
        console.log("Sos menor, solo podes ver los destinos")
        let idx = 1
        for (let pais of destinos) {
            console.log(idx + ". " + pais)
            idx++;
        }
    }
}


function calcularPrecioPaquetes(paquetesViajes, pasajeros) {
    const resultado = paquetesViajes.map(paquete => {
        return {
            pais: paquete.pais,
            precioPorPersona: paquete.precio,
            pasajeros: pasajeros,
            precioTotal: paquete.precio * pasajeros
        };
    });

    console.table(resultado)
}


let destinos = ["Canada", "Estados Unidos", "Francia", "Italia", "China", "Portugal", "Brasil"]

let paquetesViajes = [
    {
        pais: "Canada",
        localidad: "Vancouver",
        estadia: "Cabaña",
        excursion: "Kayak",
        precio: 1250
    },
    {
        pais: "Estados Unidos",
        localidad: "New York",
        estadia: "Hotel",
        excursion: "Visita a museo",
        precio: 1540
    },
    {
        pais: "Francia",
        localidad: "Paris",
        estadia: "Hotel",
        excursion: "Visita a torre Eifel",
        precio: 2300
    },
    {
        pais: "Italia",
        localidad: "Roma",
        estadia: "Hotel",
        excursion: "Visita a coliseo romano",
        precio: 2125
    },
    {
        pais: "China",
        localidad: "Shanhaiguan",
        estadia: "Cabaña",
        excursion: "Visita a la Gran Muralla China",
        precio: 3000
    },
    {
        pais: "Portugal",
        localidad: "Lisboa",
        estadia: "Hotel",
        excursion: "Snorkel",
        precio: 1700
    }
]


let paquetesViajes2 = paquetesViajes.push(
    {
        pais: "Brasil",
        localidad: "Rio de Janeiro",
        estadia: "Departamento",
        excursion: "Waterboard",
        precio: 800
    }
)

// // Referencia al contenedor
// const container = document.querySelector(".cardsContainer");

// // Recorremos y generamos un bloque HTML por cada paquete
// paquetesViajes.forEach(paquete => {
//     container.innerHTML += `
//     <div class="cardContainer">
//         <div class="imgCardContainer">
//             <img src="https://via.placeholder.com/300x200" alt="${paquete.pais}" />
//         </div>
//         <div class="bodyCardContainer">
//             <div class="titleCardContainer">
//                 <h4 class="nombreProducto" >${paquete.pais} - ${paquete.localidad}</h4>
//             </div>
//             <div class="descriptionCardContainer">
//                 <p>
//                     Estadia: ${paquete.estadia}<br>
//                     Excursión: ${paquete.excursion}<br>
//                     Precio: $${paquete.precio}
//                 </p>
//             </div>
//             <div class="buttonCardContainer">
//                 <button class="buttonCard"> Agregar </button>
//             </div>
//         </div>
//     </div>
//     `;
// });

// const itemListaCarrito = document.querySelectorAll('.productoAgregado')
// const btnAgregarAlCarrito = document.querySelectorAll('.buttonCard')
// const nombreProducto = document.querySelectorAll('.nombreProducto')


// btnAgregarAlCarrito.addEventListener('click', (evt) => {
//     const nuevoProducto = document.createElement("li");
//     nuevoProducto.textContent = nombreProducto.textContent;
//     itemListaCarrito.appendChild(nuevoProducto)

// })

const container = document.querySelector(".cardsContainer");

// Recorremos y generamos un bloque HTML por cada paquete
paquetesViajes.forEach(paquete => {
    container.innerHTML += `
    <div class="cardContainer">
        <div class="imgCardContainer">
            <img src="https://via.placeholder.com/300x200" alt="${paquete.pais}" />
        </div>
        <div class="bodyCardContainer">
            <div class="titleCardContainer">
                <h4 class="nombreProducto">${paquete.pais} - ${paquete.localidad}</h4>
            </div>
            <div class="descriptionCardContainer">
                <p>
                    Estadia: ${paquete.estadia}<br>
                    Excursión: ${paquete.excursion}<br>
                    Precio: $${paquete.precio}
                </p>
            </div>
            <div class="buttonCardContainer">
                <button class="buttonCard">Agregar</button>
            </div>
        </div>
    </div>
    `;
});

// Seleccionamos todos los botones
const btnsAgregar = document.querySelectorAll('.buttonCard');

// Contenedor donde vas a poner la lista del carrito
// Este debe estar en tu HTML:
const itemListaCarrito = document.querySelector('#productoAgregado');

// Para cada botón, asignamos su evento
btnsAgregar.forEach(boton => {
    boton.addEventListener('click', (evt) => {
        // Buscamos el <h4> más cercano
        const nombreProducto = boton.closest('.bodyCardContainer').querySelector('.nombreProducto');

        // Creamos el nuevo <li>
        const nuevoProducto = document.createElement("li");
        nuevoProducto.textContent = nombreProducto.textContent;

        // Lo agregamos a la lista
        itemListaCarrito.appendChild(nuevoProducto);
    });
});






















const btnCarrito = document.getElementById('btn-carrito');
const carrito = document.getElementById('carrito');
const overlay = document.getElementById('overlay');
const cerrarCarrito = document.getElementById('cerrar-carrito');

btnCarrito.addEventListener('click', () => {
    carrito.classList.remove('oculto');
    overlay.classList.remove('oculto');
});

// Cerrar al hacer clic en "Cerrar"
cerrarCarrito.addEventListener('click', () => {
    carrito.classList.add('oculto');
    overlay.classList.add('oculto');
});

// También cerrar si haces clic en el fondo
overlay.addEventListener('click', () => {
    carrito.classList.add('oculto');
    overlay.classList.add('oculto');
});

