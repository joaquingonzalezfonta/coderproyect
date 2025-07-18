const inputNombre = document.querySelector('#nombre');
const buttonGuardar = document.querySelector('#guardar');
const nombreUsuario = document.querySelector('#nombreUsuario');
const edadInput = document.querySelector('#inputedad');
const inputPresupuesto = document.querySelector('#presupuesto');
const tituloPrincipal = document.querySelector('.principalTitle');
const container = document.querySelector(".cardsContainer");

let paquetesViajes = [];
let destinos = ["Canada", "Estados Unidos", "Francia", "Italia", "China", "Portugal", "Brasil"];


fetch('paquetes.json')
    .then(response => response.json())
    .then(data => {
        paquetesViajes = data;
        console.log("Paquetes cargados:", paquetesViajes);
    })
    .catch(error => console.error("Error al cargar los paquetes:", error));


buttonGuardar.addEventListener("click", () => {
    const nuevoNombre = inputNombre.value;
    const edad = parseInt(edadInput.value);
    const presupuesto = parseInt(inputPresupuesto.value);

    if (nuevoNombre) {
        localStorage.setItem("Nombre", nuevoNombre);
        nombreUsuario.textContent = nuevoNombre;
    }

    if (edad) localStorage.setItem("Edad", edad);
    if (presupuesto) localStorage.setItem("Presupuesto", presupuesto);

    tituloPrincipal.textContent = "Bien hecho, estas mas cerca del viaje!";
    inputNombre.value = '';
    edadInput.value = '';
    inputPresupuesto.value = '';

    if (isNaN(edad)) {
        Swal.fire({
            title: "No valido",
            text: "Por favor, ingrese una edad valida",
            icon: "info"
        });;
        return;
    }

    filtroPorPresupuesto(edad, presupuesto);

});

function validarInputs() {
    buttonGuardar.disabled = !(
        inputNombre.value.trim() &&
        edadInput.value.trim() &&
        inputPresupuesto.value.trim() 
    );
}

[inputNombre, edadInput, inputPresupuesto].forEach(input => {
    input.addEventListener('input', validarInputs);
});

function filtroPorPresupuesto(edad, presupuesto) {
    if (isNaN(presupuesto)) {
        Swal.fire({
            title: "No valido",
            text: "Por favor, ingrese un presupuesto valido",
            icon: "info"
        });
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
                        Precio: <span class="precioProducto"> $${paquete.precio} </span> 
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

