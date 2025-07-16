let productosEnCarrito = JSON.parse(localStorage.getItem("productoCarrito")) || [];

const nombreGuardado = localStorage.getItem("Nombre");
if (nombreGuardado) {
    nombreUsuario.textContent = nombreGuardado;
}

function actualizarContador() {
    const total = productosEnCarrito.reduce((sum, prod) => sum + prod.cantidad, 0);
    document.getElementById('contadorCarrito').textContent = total;
}

function renderizarProductoEnCarrito(producto) {
    const listaCarrito = document.querySelector("#lista-carrito");
    let li = document.querySelector(`#lista-carrito li[data-product="${producto.nombre}"]`);

    if (!li) {
        li = document.createElement("li");
        li.setAttribute('data-product', producto.nombre);

        li.innerHTML = `${producto.nombre} - Cantidad: <span class="cantidad">${producto.cantidad}</span> <button class="buttonCart">Eliminar</button>`;

        li.querySelector('.buttonCart').addEventListener('click', () => eliminarProductoCarrito(producto.nombre, li));
        listaCarrito.appendChild(li);
    } else {
        li.querySelector('.cantidad').textContent = producto.cantidad;
    }
}

function eliminarProductoCarrito(nombreProducto, liElement) {
    productosEnCarrito = productosEnCarrito.filter(p => p.nombre !== nombreProducto);
    localStorage.setItem('productoCarrito', JSON.stringify(productosEnCarrito));
    liElement.remove();
    actualizarContador();

    Swal.fire({ title: "Paquete eliminado", icon: "success" });
}

productosEnCarrito.forEach(producto => renderizarProductoEnCarrito(producto));
actualizarContador();

const btnCarrito = document.getElementById('btn-carrito');
const carrito = document.getElementById('carrito');
const overlay = document.getElementById('overlay');
const cerrarCarrito = document.getElementById('cerrar-carrito');

btnCarrito.addEventListener('click', () => {
    carrito.classList.remove('oculto');
    overlay.classList.remove('oculto');
});

cerrarCarrito.addEventListener('click', cerrarCarritoOverlay);
overlay.addEventListener('click', cerrarCarritoOverlay);

function cerrarCarritoOverlay() {
    carrito.classList.add('oculto');
    overlay.classList.add('oculto');
}

function activarBotonesAgregar() {
    document.querySelectorAll('.buttonCard').forEach(boton => {
        boton.addEventListener('click', () => {
            const nombreProducto = boton.closest('.bodyCardContainer').querySelector('.nombreProducto').textContent.trim();

            if (nombreProducto) {
                const productoExistente = productosEnCarrito.find(p => p.nombre === nombreProducto);

                if (productoExistente) {
                    productoExistente.cantidad++;
                    renderizarProductoEnCarrito(productoExistente);
                } else {
                    const nuevoProducto = { nombre: nombreProducto, cantidad: 1 };
                    productosEnCarrito.push(nuevoProducto);
                    renderizarProductoEnCarrito(nuevoProducto);
                }

                localStorage.setItem('productoCarrito', JSON.stringify(productosEnCarrito));
                renderizarProductoEnCarrito(productoExistente || { nombre: nombreProducto, cantidad: 1 });
                actualizarContador();

                Toastify({
                    text: "Producto agregado!",
                    gravity: "bottom",
                    position: "right",
                    duration: 1500,
                    style: {
                        background: "linear-gradient(to right, #8eb69b, #235347)"
                    }
                }).showToast();
            }
        });
    });
}