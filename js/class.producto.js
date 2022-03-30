class Producto{
    constructor(id,nombre,precio, categoria, imagen){
        this.id=id;
        this.nombre=nombre;
        this.precio= parseFloat(precio);
        this.imagen = imagen;
        this.categoria=categoria;
    }
}