
let divproducto = document.getElementById("productos");

productoJson = JSON.stringify(productos)


localStorage.setItem('productos',productoJson)


const productosJson =  JSON.parse(localStorage.getItem('productos'))



productosJson.forEach((producto, indice)=>{
    divproducto.innerHTML += `
                        <h2>Producto:${producto.nombre}</h2>
                        <img style="width:70%" class="mx-auto d-block"  src="${producto.imagen}" alt="${producto.nombre}">
                         <h2>Precio: $ ${producto.precio} </h2>
                         <button id="${producto.id}" class="btnCompra">Comprar</button><hr>`;
});




let botones = document.getElementsByClassName('btnCompra');

for(const boton of botones) {
    boton.addEventListener('click',function(){
        let seleccion= productos.find(producto=> producto.id == this.id);
        agregarAlCarrito(seleccion);
        
    })
}


const carrito = JSON.parse (localStorage.getItem('carrito'))?? [];
localStorage.setItem('carrito',JSON.stringify(carrito))


function agregarAlCarrito(seleccion) {
    carrito.push(seleccion);
    mostrarCarrito();
}

function mostrarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    let divCarrito = document.getElementById('carrito');
    divCarrito.innerHTML = '';
    carrito.forEach((producto, indice)=>{
        divCarrito.innerHTML += `<h2>Producto:${producto.nombre}</h2>
                             <h2>Precio: $ ${producto.precio} </h2>
                             <button id="${producto.id}" class="btnEliminar">Eliminar</button><hr>`;
    });
}

//spinner
carrito.innerHTML= `<div class="spinner-border" role="status">
<span class="visually-hidden">Loading...</span>
</div>`

//llamada api
fetch('https://apis.datos.gob.ar/georef/api/provincias')
.then((respuesta)=>{
 return respuesta.json()
}).then((datos)=> {
    console.log(datos);
carrito.innerHTML= `<h3>Info del Envio</h3>'
                 <select id="provFiltro"></select>
                 <select id="munFiltro"></select>
                 <button id="btnEnvio"></button>`
const provFiltro=document.getElementById('provFiltro')
for(const provincia of datos.provincias){
    provFiltro.innerHTML+=`<option value="${provincia.id}">${provincia.nombre}</option>`;
}
provFiltro.onchange=()=>{
    let idProvincia=provFiltro.ariaValue;
    console.log(idProvincia);
    let rutaBusqueda=` https://apis.datos.gob.ar/georef/api/municipios?provincia=${idProvincia}&campos=id,nombre&max=100`
    fetch(rutaBusqueda)
    .then(respuesta =>respuesta.json())
    .then(datos=>{
       console.log(datos);
       let munFiltro= document.getElementById('munFiltro');

       for (const municipio of datos.municipios){
        munFiltro.innerHTML+=`<option value="${municipio.id}">${municipio.nombre}</option>`;
       }
       document.getElementById('btnEnvio').onclick=()=>{
        console.log("ENVIAR A"+ munFiltro.value + "EN PROVINCIA ID" + idProvincia);
        fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
        body: JSON.stringify({
            carrito:carrito,
            idProvincia:idActual,
            idMunicipio: munFiltro.value
         }),
         headers: {
             'Content-type' : 'application/json ; charset=UTF-8',
         },
            }).then(respuesta => respuesta.json())
            .then(data=>{
                Swal.fire(
                    'Compra Confirmada',
                    "PEDIDO Nº" + data.id + "EN CAMINO",
                    'success'
                )
            })
       }
    })
}




})

.catch((mensaje)=>{console.log(mensaje)})