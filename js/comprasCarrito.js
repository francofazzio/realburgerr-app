let totalCarro = 0;

const productos= [];
carrito =  JSON.parse (localStorage.getItem('carrito'))
const productosDiv = document.getElementById('comprarCarrito')

 
for (const producto of carrito){
    const div = document.createElement('div')
    div.innerHTML = `
    <h2>${producto.nombre}</h2>
    <p>${producto.precio}</p>
    <button id="${producto.id}" class"btnEliminar">Eliminar</button>
    
    `
    productosDiv.append(div)
}


const div = document.createElement('div')

carrito.forEach( (comp) => {
totalCarro +=  comp.precio
});

div.innerHTML = `
<h3>Total</h3>
<p>${totalCarro}</p>

`
productosDiv.append(div)


const eliminarCompra = (productoId) => {
    const compra = carrito.find((comp)=> comp.id === productoId)
    const ubicacion = carrito.indexOf(compra)
    carrito.splice(ubicacion,1)   
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window. location. reload()
   }
   



