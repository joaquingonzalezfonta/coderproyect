// --- Variables DOM ---
const inputNombre = document.querySelector('#nombre');
const buttonGuardar = document.querySelector('#guardar');
const nombreUsuario = document.querySelector('#nombreUsuario');
const edadInput = document.querySelector('#inputedad');
const inputPresupuesto = document.querySelector('#presupuesto');
const inputPasajeros = document.querySelector('#pasajeros');
const tituloPrincipal = document.querySelector('.principalTitle');
const container = document.querySelector(".cardsContainer");

// --- Variables globales ---
let paquetesViajes = [];
let destinos = ["Canada", "Estados Unidos", "Francia", "Italia", "China", "Portugal", "Brasil"];


// --- Cargar paquetes desde JSON al iniciar ---
fetch('paquetes.json')
    .then(response => response.json())
    .then(data => {
        paquetesViajes = data;
        console.log("Paquetes cargados:", paquetesViajes);
    })
    .catch(error => console.error("Error al cargar los paquetes:", error));

// --- Persistencia nombre ---


buttonGuardar.addEventListener("click", () => {
    const nuevoNombre = inputNombre.value;
    const edad = parseInt(edadInput.value);
    const presupuesto = parseInt(inputPresupuesto.value);
    const pasajeros = parseInt(inputPasajeros.value);

    if (nuevoNombre) {
        localStorage.setItem("Nombre", nuevoNombre);
        nombreUsuario.textContent = nuevoNombre;
    }

    if (edad) localStorage.setItem("Edad", edad);
    if (presupuesto) localStorage.setItem("Presupuesto", presupuesto);
    if (pasajeros) localStorage.setItem("Pasajeros", pasajeros);

    tituloPrincipal.textContent = "Bien hecho, estas mas cerca del viaje!";
    inputNombre.value = '';
    edadInput.value = '';
    inputPresupuesto.value = '';
    inputPasajeros.value = '';

    if (isNaN(edad)) {
        console.log("Por favor ingresa una edad válida.");
        return;
    }

    filtroPorPresupuesto(edad, presupuesto);

    if (edad >= 18) {
        if (isNaN(pasajeros) || pasajeros <= 0) {
            console.log("Por favor ingresa una cantidad válida de pasajeros.");
            return;
        }
        calcularPrecioPaquetes(paquetesViajes, pasajeros);
    } else {
        mostrarDestinos();
    }
});

function validarInputs() {
    buttonGuardar.disabled = !(
        inputNombre.value.trim() &&
        edadInput.value.trim() &&
        inputPresupuesto.value.trim() &&
        inputPasajeros.value.trim()
    );
}

[inputNombre, edadInput, inputPresupuesto, inputPasajeros].forEach(input => {
    input.addEventListener('input', validarInputs);
});

function filtroPorPresupuesto(edad, presupuesto) {
    if (isNaN(presupuesto)) {
        console.log("Por favor ingrese un presupuesto válido");
        return;
    }

    let paquetesFiltrados = paquetesViajes.filter(paquete => {
        if (presupuesto <= 1000) return paquete.precio <= 1000;
        if (presupuesto <= 2000) return paquete.precio <= 2000;
        if (presupuesto <= 3000) return paquete.precio <= 3000;
        return true;
    });

    container.innerHTML = '';

    if (edad < 18) {
        Swal.fire({
            title: "Eres menor de edad",
            text: "Solo podrás ver los destinos disponibles",
            icon: "info"
        });

        paquetesViajes.forEach(paquete => {
            container.innerHTML += renderCard(paquete, false);
        });

    } else {
        paquetesFiltrados.forEach(paquete => {
            container.innerHTML += renderCard(paquete, true);
        });
        activarBotonesAgregar();
    }
}

function renderCard(paquete, mostrarDetalles) {
    return `
        <div class="cardContainer">
            <div class="imgCardContainer">
                <img src="${paquete.img}" alt="${paquete.pais}" />
            </div>
            <div class="bodyCardContainer">
                <div class="titleCardContainer">
                    <h4 class="nombreProducto">${paquete.pais} - ${paquete.localidad}</h4>
                </div>
                ${mostrarDetalles ? `
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
                ` : ''}
            </div>
        </div>
    `;
}

function mostrarDestinos() {
    destinos.forEach((pais, idx) => console.log(`${idx + 1}. ${pais}`));
}

function calcularPrecioPaquetes(paquetes, pasajeros) {
    const resultado = paquetes.map(paquete => ({
        pais: paquete.pais,
        precioPorPersona: paquete.precio,
        pasajeros,
        precioTotal: paquete.precio * pasajeros
    }));

    console.table(resultado);
}








