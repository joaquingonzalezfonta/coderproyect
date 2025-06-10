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

let edad = prompt("Cuantos años tienes?")

if (edad >= 18) {
    console.log("Podes entrar a ver los paquetes")
    console.log(paquetesViajes)
} else {
    console.log("Sos menor, solo podes ver los destinos")
    console.log(destinos)
}


let elegirDestino;
if (edad >= 18) {
    elegirDestino = parseInt(prompt("Pon un maximo de presupuesto")) 
}

if (elegirDestino <= 1000) {
    const precios = paquetesViajes.filter(paquetesViajes => paquetesViajes.precio < 1000)
    console.log(precios)
} else if (elegirDestino <= 2000) {
    const precios = paquetesViajes.filter(paquetesViajes => paquetesViajes.precio < 2000)
    console.log(precios)
} else if (elegirDestino <= 3000) {
    const precios = paquetesViajes.filter(paquetesViajes => paquetesViajes.precio < 3000)
    console.log(precios)
} else if (elegirDestino >= 3001) {
    console.log(paquetesViajes)
}


