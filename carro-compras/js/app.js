const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 

let articulosCarrito = []

cargarEventListeners()

function cargarEventListeners(){

    listaCursos.addEventListener('click', agregarCurso)
    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] //se resetea el arreglo
        limpiarHTML() //se elimina todo el html
    })
}

function agregarCurso(e){
    e.preventDefault() //previene la accion por default (la acción al momento de agregar al carrito, tiene un bug.)
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        //console.log(e.target.parentElement.parentElement)
        leerDatosCurso(cursoSeleccionado)
    }
}

//leer datos del curso para mostrarlos en la parte superior del carrito :)
//lee el contenido html al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){
    //se creará un objeto con los cursos actuales
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent, //para extraer el texto se usa el textContent
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //chequea si un elemento ya existe dentro del carrito
    if(articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        const cursos = articulosCarrito.map((curso) =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso
            } else {
                return curso
            }
        })
        articulosCarrito = [...cursos]
    } else {
        //agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    generarHTML()
    console.log(articulosCarrito)
    //console.log(infoCurso)
    //console.log(curso)
}

function eliminarCurso(e){
    e.preventDefault() //previene la accion por default (la acción al momento de agregar al carrito, tiene un bug.)
    //console.log(e.target.classList)
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        //elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId)
        generarHTML()
        //console.log(articulosCarrito)

    }
}


//muestra el carrito de compras en el html (parte superior del carrito)
function generarHTML(){
    //limpia el html
    limpiarHTML()

    articulosCarrito.forEach((curso) => {
        const visual = document.createElement('tr')
        visual.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.nombre}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
               </td>
          `;

          contenedorCarrito.appendChild(visual)
    })
}

function limpiarHTML(){
    //forma lenta:
    //contenedorCarrito.innerHTML = ''
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}