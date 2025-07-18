document.addEventListener('DOMContentLoaded', () => {
    let productosEnCarrito = JSON.parse(localStorage.getItem("productoCarrito")) || [];

    const btnCarrito = document.getElementById('btn-carrito');
    const carrito = document.getElementById('carrito');
    const overlay = document.getElementById('overlay');
    const cerrarCarrito = document.getElementById('cerrar-carrito');
    const finzalizarButton = document.getElementById('finalizar-compra')
    const compraContenedor = document.getElementById('compra')
    const cerrarOrden = document.getElementById('cerrar-orden')
    const overlayCompra = document.getElementById('overlayCompra')
    const pagoDefinitivo = document.getElementById('pagoDefinitivo')
    const listaCarrito = document.querySelector("#lista-carrito");



    function calcularTotalCarrito() {
        const total = productosEnCarrito.reduce((sum, prod) => {
            return sum + (prod.precio * prod.cantidad);
        }, 0);

        document.getElementById('totalCarritoResumen').textContent = `Total: $${total}`;
    }


    // const nombreUsuario = document.getElementById('nombreUsuario');
    const nombreGuardado = localStorage.getItem("Nombre");
    if (nombreGuardado) {
        nombreUsuario.textContent = nombreGuardado;
    }

    const toggleFinalizarCompra = () => {
        if (listaCarrito.children.length === 0) {
            finzalizarButton.disabled = true;
        } else {
            finzalizarButton.disabled = false;
        }
    };

    function actualizarContador() {
        const total = productosEnCarrito.reduce((sum, prod) => sum + prod.cantidad, 0);
        document.getElementById('contadorCarrito').textContent = total;
    }

    function renderizarProductoEnCarrito(producto) {
        let li = document.querySelector(`#lista-carrito li[data-product="${producto.nombre}"]`);

        if (!li) {
            li = document.createElement("li");
            li.setAttribute('data-product', producto.nombre);

            li.innerHTML = `
            <div>${producto.nombre} x<span class="cantidad">${producto.cantidad}</span></div>
            <button class="buttonCart">Borrar</button>
        `;

            li.querySelector('.buttonCart').addEventListener('click', () => eliminarProductoCarrito(producto.nombre, li));
            listaCarrito.appendChild(li);
        } else {
            li.querySelector('.cantidad').textContent = producto.cantidad;
        }

        toggleFinalizarCompra();
        calcularTotalCarrito();
    }

    function eliminarProductoCarrito(nombreProducto, liElement) {
        productosEnCarrito = productosEnCarrito.filter(p => p.nombre !== nombreProducto);
        localStorage.setItem('productoCarrito', JSON.stringify(productosEnCarrito));
        liElement.remove();
        actualizarContador();

        Swal.fire({ title: "Paquete eliminado", icon: "success" });

        toggleFinalizarCompra();
        calcularTotalCarrito();
    }

    function eliminarTodosLosProductosCarrito() {
        productosEnCarrito = [];
        localStorage.setItem('productoCarrito', JSON.stringify(productosEnCarrito));

        if (listaCarrito) {
            listaCarrito.innerHTML = '';
        }

        actualizarContador();
        toggleFinalizarCompra();
        calcularTotalCarrito();
    }

    productosEnCarrito.forEach(producto => renderizarProductoEnCarrito(producto));
    actualizarContador();
    toggleFinalizarCompra();


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

    finzalizarButton.addEventListener('click', () => {
        compraContenedor.classList.remove('oculto');
        overlayCompra.classList.remove('oculto');
    });

    cerrarOrden.addEventListener('click', cerrarCompraOverlay);
    overlay.addEventListener('click', cerrarCompraOverlay);

    function cerrarCompraOverlay() {
        compraContenedor.classList.add('oculto');
        overlayCompra.classList.add('oculto');
    }

    pagoDefinitivo.addEventListener('click', () => {
        eliminarTodosLosProductosCarrito()
        cerrarCompraOverlay()
        cerrarCarritoOverlay()

        Swal.fire({
            title: "Compra exitosa",
            icon: "success",
            draggable: true
        });
    })


    const nameInput = document.getElementById('name')
    const mail = document.getElementById('mail')
    const number = document.getElementById('number')

    function validarInputsCompra() {
        pagoDefinitivo.disabled = !(
            nameInput.value.trim() &&
            mail.value.trim() &&
            number.value.trim()
        );
    }

    [nameInput, mail, number].forEach(input => {
        input.addEventListener('input', validarInputsCompra);
    });

    window.activarBotonesAgregar = function activarBotonesAgregar() {
        document.querySelectorAll('.buttonCard').forEach(boton => {
            boton.addEventListener('click', () => {

                // const nombreProducto = contenedor.querySelector('.nombreProducto').textContent.trim();
                const nombreProducto = boton.closest('.bodyCardContainer').querySelector('.nombreProducto').textContent.trim();
                const precioElemento = boton.closest('.bodyCardContainer').querySelector('.precioProducto');
                const precioProducto = precioElemento
                    ? parseFloat(precioElemento.textContent.replace('$', ''))
                    : 0;
                if (nombreProducto) {
                    const productoExistente = productosEnCarrito.find(p => p.nombre === nombreProducto);

                    if (productoExistente) {
                        productoExistente.cantidad++;
                        renderizarProductoEnCarrito(productoExistente);
                    } else {
                        const nuevoProducto = {
                            nombre: nombreProducto,
                            precio: precioProducto,
                            cantidad: 1
                        };
                        productosEnCarrito.push(nuevoProducto);
                        renderizarProductoEnCarrito(nuevoProducto);
                    }

                    localStorage.setItem('productoCarrito', JSON.stringify(productosEnCarrito));
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

                    toggleFinalizarCompra();
                }
            });
        });
    }
});