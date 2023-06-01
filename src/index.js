const url = `/647685309233e82dd53a1789.mockapioMeGustaEsteMudo/lossatelites`;
const contenedor = document.getElementById("contenedor");
const botonera = document.getElementById("botonera");
let idDato;
let datoParaFormulario= {
    id: new Date(),
    nombre: "",
    apellido: "",
    calle: "",
    numero: "",
    foto: ""
}


function inicio(){
        fetch(url)
                .then(response => response.json())
                .then(data => {
                    crearTabla(data);
                })
              /*  .catch(error => {
                    console.error('Error al cargar el archivo JSON:', error);
                });*/
}

try{
    fetch(url)
    .then(response => response.json())
    .then(data => {
        crearTabla(data);
    })
   

}  catch (error){
        alert(`Huston tenemos un problema, ${error}`);
        console.log("fallo todo");
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
        contenedor.appendChild(crearTarjeta(data));
        datoParaFormulario=data;
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });
}


function crearFormulario(btn,datoForm){
    const formulario = document.createElement("div");
    formulario.classList.add("formulario");
    formulario.innerHTML=`
    <form>
        <div class="renglonFormulario">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value="${datoForm.nombre}" required>
        </div>
    
        <div class="renglonFormulario">
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido"  value="${datoForm.apellido}" required>
        </div>
    
        <div class="renglonFormulario">
            <label for="calle">Calle:</label>
            <input type="text" id="calle" name="calle" value="${datoForm.calle}" required>
        </div>
    
        <div class="renglonFormulario">
            <label for="numero">Número:</label>
            <input type="number" id="numero" name="numero" value="${datoForm.numero}" required>
        </div>
    
        <div class="renglonFormulario">
            <label for="foto">Foto:</label>
            <input type="text" id="foto" name="foto" value="${datoForm.foto}" required>
        </div>
    <button class="btnForm">${btn}</button>
  </form>
    `
    return formulario;
    
}


function leerFormulario(){
    const input = contenedor.querySelectorAll("input");
    console.log(input[0].value);
    const nuevoDato = {
        id: `${idDato}`,
        nombre: `${input[0].value}`,
        apellido: `${input[1].value}`,
        calle: `${input[2].value}`,
        numero: `${input[3].value}`,
        foto: `${input[4].value}`
    }
    
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
  function recetearDatoFormulario(){
    datoParaFormulario= {
        id: new Date(),
        nombre: "",
        apellido: "",
        calle: "",
        numero: "",
        foto: ""
    }
  }

  contenedor.addEventListener("click", (e)=>{
    e.preventDefault();
    const elementoClickeado = e.target.closest(".fila");
    const btn = e.target.closest("button");
    if(elementoClickeado){
        idDato = elementoClickeado.getAttribute("indice");
        borrarContenedor();
        buscarDato(idDato);
    } else if (btn) {
        switch (btn.textContent){
            case "ELIMINAR":
                eliminar(idDato);
            break;
            case "EDITAR":
                contenedor.appendChild(crearFormulario("GUARDAR",datoParaFormulario));
            break;
            case "GUARDAR":
                editar(idDato,leerFormulario());
            break;
            case "AGREGAR":
                crear(leerFormulario());
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
    recetearDatoFormulario();
    contenedor.appendChild(crearFormulario("AGREGAR",datoParaFormulario));
}

})

