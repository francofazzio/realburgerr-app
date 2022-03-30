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
<div>
<img
src={'./carrito.jpg'}
className="carrito-header"/>
</div>

const div = document.createElement('div')

carrito.forEach( (comp) => {
totalCarro +=  comp.precio
});

div.innerHTML = `
<h3>Total</h3>
<p>${totalCarro}</p>

`
productosDiv.append(div)






