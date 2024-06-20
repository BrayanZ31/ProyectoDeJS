import pr from 'prompt-sync';
const prompt = pr({sigint: true})

class ArticuloBase {
    constructor(nombre, categoria) {
        this.nombre = nombre;
        this.categoria = categoria;
    }
}

class ProductoSupermercado extends ArticuloBase {
    constructor(nombre, categoria, cantidad, precio) {
        super(nombre, categoria); // Llama al constructor de la clase padre
        this.cantidad = cantidad;
        this.precio = precio;
    }
}
let productos = [];

function mostrarMenu() {
    console.log('----------------------------------')
    console.log("MENU:")
    console.log('')
    console.log('1. Añadir producto')
    console.log('2. Actualizar cantidad de producto')
    console.log('3. Mostrar productos por categoría')
    console.log('4. Salir')
    console.log('----------------------------------')
    let opcion = prompt('Elige una opción:')
    console.log('----------------------------------')
    return parseInt(opcion);
}

function añadirProducto() {
    console.log('----------------------------------')
    console.log('Añadir Producto:')
    console.log('')
    let resp = 'si'

    while(resp !== 'no') {
    let nombre = prompt('Dame nombre: ')
    let categoria = prompt('Dame categoria: ')
    let cantidad = prompt('Dame cantidad: ')
    let precio = prompt('Dame precio: ')

    let nuevoProducto = new ProductoSupermercado(nombre, categoria, cantidad, precio);
    productos.push(nuevoProducto);
    console.log('----------------------------------')
    resp = prompt('Desea continuar agregando productos ("si" o "no"): ')
    }
    console.log('')
    console.log('Valore añadidos correctamente')

}

function actualizarCantidad() {
    console.log('----------------------------------')
    console.log('Actualizar Productos:')
    console.log('')
    let resp = 'si'

    while(resp !== 'no'){
    let nombre = prompt('Introduce el nombre del producto cuya cantidad quieres actualizar: ')
    let nuevaCantidad = parseInt(prompt('Introduce la nueva cantidad:', '0'));

    let productoActualizado = productos.find(producto => producto.nombre === nombre);
    if (productoActualizado) {
        productoActualizado.cantidad = nuevaCantidad;
        
        console.log('')
        console.log(`La cantidad de “${productoActualizado.nombre}” ha sido actualizada`)
    } else {
        console.log('No se encontro el producto ' + nombre);
    }
    console.log('----------------------------------')
    resp = prompt('Desea continuar actualizando productos ("si" o "no"): ')
 }
}

function mostrarProductos() {
    console.log('----------------------------------')
    console.log('Mostrar Productos:')
    console.log('')
    let categoriaBuscada = prompt('Dame categoria: ')
    let productosFiltrados = productos.filter(producto => producto.categoria === categoriaBuscada);

    if (productosFiltrados.length > 0) {
        console.log('----------------------------------')
        console.log(`Productos en la categoría “${categoriaBuscada}”:`);
        console.log('')
        productosFiltrados.forEach(producto => console.log(`${producto.nombre} – Precio: $${producto.precio}`));
    } 
    else{
        console.log(`La categoria "${categoriaBuscada}" esta vacia`);
    }
}

function main() {
    while (true) {
        switch (mostrarMenu()) {
            case 1:
                añadirProducto();
                break;
            case 2:
                actualizarCantidad();
                break;
            case 3:
                mostrarProductos();
                break;
            case 4:
                console.log('Saliendo');
                return;
            default:
                console.log('Opción no válida.');
        }
    }
}

main();