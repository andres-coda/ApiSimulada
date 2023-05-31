const url = `https://647685309233e82dd53a1789.mockapi.io/NoMeGustaEsteMundo/lossatelites`;
const contenedor = document.getElementById("contenedor");
const botonera = document.getElementById("botonera");
let idDato;

inicio();

function inicio(){
    fetch(url)
            .then(response => response.json())
            .then(data => {
                crearTabla(data);
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });

}




function crearCelda(clase,dato){
        const celda=document.createElement("td");
        celda.classList.add(clase);
        celda.textContent = dato;
        return celda;  
}

function crearImagen(clase,dato){
    const img=document.createElement("div");
    img.classList.add(clase);
    img.innerHTML=`
        <img src="${dato}"/>
    `;

    return img;
}
function crearFila(clase,datos,visorLista){
    const fila=document.createElement("tr");
    fila.classList.add(clase);
    fila.setAttribute("indice",datos.id);
    visorLista.appendChild(fila);
        fila.appendChild(crearImagen("celda",datos.foto));
        fila.appendChild(crearCelda("celda",datos.nombre));
        fila.appendChild(crearCelda("celda",datos.apellido));
        fila.appendChild(crearCelda("celda",datos.calle));
        fila.appendChild(crearCelda("celda",datos.numero));
    
}

function crearLista(datos,visorLista){

    for (let i=0; i<datos.length; i++){
        crearFila("fila",datos[i],visorLista);
    }
}

function crearTabla(datos){
    const visorLista = document.createElement("table");
    contenedor.appendChild(visorLista);
    visorLista.classList.add("tabla");
    crearLista(datos,visorLista);
}

function borrarContenedor(){
    contenedor.innerHTML = '';
}

function crearTarjeta(elemento){
    const card= document.createElement("div");
    card.classList.add("tarjeta");
    card.innerHTML =`
    <img src=${elemento.foto} alt=${elemento.nombre} ${elemento.apellido}/>  
    <div class="texto">
        <h3> ${elemento.nombre} ${elemento.apellido}<h3>
        <p>Calle: ${elemento.calle} N° ${elemento.numero}</p> 
    </div>
    <div class="btn">
        <button class="editar">EDITAR</button>
        <button class="eliminar">ELIMINAR</button>
    </div>
    `;
    card.setAttribute("Indice", elemento.id);

    return card;
       

}

function eliminar(idDato){
    
    fetch(`${url}/${idDato}`,{method: "DELETE",})
            .then(response => response.json())
            .then(data => {
             console.log(`Eliminado ${idDato}`);
             borrarContenedor();
             inicio();
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });
}

function buscarDato(idDato){
    fetch(`${url}/${idDato}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        contenedor.appendChild(crearTarjeta(data));
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
}

contenedor.addEventListener("click", (e)=>{
        const elementoClickeado = e.target.closest(".fila");
        const btn = e.target.closest("button");
        if(elementoClickeado){
            idDato = elementoClickeado.getAttribute("indice");
            console.log(idDato);
            borrarContenedor();
            buscarDato(idDato);
        } else if (btn) {
            switch (btn.textContent){
                case "ELIMINAR":
                    eliminar(idDato);
                break;
                case "EDITAR":
                    contenedor.appendChild(crearFormulario("GUARDAR"));
                break;
                case "GUARDAR":
                    editar(idDato,leerFormulario());
                break;
                case "AGREGAR":
                    const dato = leerFormulario();
                    console.log(dato);
                    crear(dato);
                break;
                default:
                break;
            }

        }
});

botonera.addEventListener("click",(e)=>{
    const btn=e.target.closest("button");
    if(btn){
        borrarContenedor();
        contenedor.appendChild(crearFormulario("AGREGAR"));
    }

})

function crearFormulario(btn){
    const formulario = document.createElement("div");
    formulario.classList.add("formulario");
    formulario.innerHTML=`
    <form>
        <div class="renglonFormulario">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
        </div>
    
        <div class="renglonFormulario">
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required>
        </div>
    
        <div class="renglonFormulario">
            <label for="calle">Calle:</label>
            <input type="text" id="calle" name="calle" required>
        </div>
    
        <div class="renglonFormulario">
            <label for="numero">Número:</label>
            <input type="number" id="numero" name="numero" required>
        </div>
    
        <div class="renglonFormulario">
            <label for="foto">Foto:</label>
            <input type="text" id="foto" name="foto" required>
        </div>
    <button class="btnForm">${btn}</button>
  </form>
    `
    return formulario;
    
}

function leerFormulario(){
    const input = contenedor.querySelectorAll("input");
   const nuevoDato = {
        nombre: `${input[0].value}`,
        apellido: `${input[1].value}`,
        calle: `${input[2].value}`,
        numero: `${input[3].value}`,
        foto: `${input[4].value}`,
    }
    console.log(nuevoDato);
    return nuevoDato;
}

function editar(idDato,dato){    
    fetch(`${url}/${idDato}`,{  method: "PUT",
                                headers:{"Content-Type": "application/json"},
                                body:JSON.stringify(dato),})
            .then(response => response.json())
            .then(data => {
             console.log(`Editado ${idDato}`);
             borrarContenedor();
             inicio();
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
            });

}

function crear(dato) {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dato)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Elemento creado:", data);
        borrarContenedor();
        inicio();
      })
      .catch(error => {
        console.error("Error al cargar el archivo JSON:", error);
      });
  }
  

