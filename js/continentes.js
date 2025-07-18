const contenedor = document.getElementById('contenedor-paquetes');


const nombrePagina = window.location.pathname.split('/').pop().split('.')[0]; 
const continenteActual = nombrePagina.charAt(0).toUpperCase() + nombrePagina.slice(1); 

fetch('../paquetes.json')  
    .then(response => response.json())
    .then(paquetes => {
        const paquetesFiltrados = paquetes.filter(p => p.continente === continenteActual);

        renderizarPaquetes(paquetesFiltrados);
    })
    .catch(error => console.error('Error al cargar los paquetes:', error));

function renderizarPaquetes(paquetes) {
    if (!contenedor) return;

    paquetes.forEach(paquete => {
        contenedor.innerHTML += `
            <div class="cardContainer">
                <div class="imgCardContainer">
                    <img src="${paquete.img}" alt="${paquete.pais}" />
                </div>
                <div class="bodyCardContainer">
                    <div class="titleCardContainer">
                        <h4 class="nombreProducto">${paquete.pais} - ${paquete.localidad}</h4>
                    </div>
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
                </div>
            </div>
        `;
    });

    activarBotonesAgregar();
}