var Fila = null
function onSubmit() {
        let DataForm = Leer()
        if (Fila == null){
            InsertarDatos(DataForm)
        } else{
            Actualizar(DataForm)
            Vaciar()
    }
}


function Leer() {
    let DataForm = {}
    DataForm["nombre"] = document.getElementById("name").value
    DataForm["categoria"] = document.getElementById("categoria_video").value
    DataForm["url"] = document.getElementById("url").value

    DataForm["uid"] = ""
    return DataForm
}


function InsertarDatos(data) {
    let table = document.getElementById("tabla3").getElementsByTagName('tbody')[0]
    let Fila = table.insertRow(table.length)
    columna1 = Fila.insertCell(0).innerHTML = data.nombre
    columna2 = Fila.insertCell(1).innerHTML = data.categoria
    columna3 = Fila.insertCell(2).innerHTML = data.url
    columna4 = Fila.insertCell(3).innerHTML = data.uid
    columna5 = Fila.insertCell(3).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar" >
                                            <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`
    
    document.getElementById("name").focus()



 
//crear video
let token=sessionStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "nombre": document.getElementById("name").value,
      "url": document.getElementById("url").value,
      "categoria": document.getElementById("categoria_video").value
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://labinfsoft.herokuapp.com/api/videos", requestOptions)
    .then(response => response.json())

    .then(result => {
      console.log(result)
      columna4 = Fila.insertCell(3).innerHTML = result['_id']

    })

    .catch(error => console.log('error', error));

    Vaciar()
}


function Vaciar() {
    document.getElementById("name").value = ""
    document.getElementById("categoria_video").value = ""
    document.getElementById("url").value = ""
    Fila = null
}



function Editarr(td) {
    Fila = td.parentElement.parentElement
    document.getElementById("name").value = Fila.cells[0].innerHTML
    document.getElementById("categoria_video").value = Fila.cells[1].innerHTML
    document.getElementById("url").value = Fila.cells[2].innerHTML

      
}


function Actualizar(DataForm) {
    Fila.cells[0].innerHTML = DataForm.nombre
    Fila.cells[1].innerHTML = DataForm.categoria
    Fila.cells[2].innerHTML = DataForm.url
    document.getElementById("name").focus()

//modificar video
let token=sessionStorage.getItem("token");

var myHeaders = new Headers();
myHeaders.append("Authorization",token);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "nombre": document.getElementById("name").value,
  "url": document.getElementById("url").value,
  "categoria": document.getElementById("categoria_video").value
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://labinfsoft.herokuapp.com/api/videos/"+ columna4, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


}

function Borrarr(td) {
    if (confirm('¿Seguro de borrar este registro?')) {
        row = td.parentElement.parentElement
        document.getElementById("tabla3").deleteRow(row.rowIndex)

//Eliminar video
let token=sessionStorage.getItem("token"); 

var myHeaders = new Headers();
myHeaders.append("Authorization", token);

var raw = "";

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://labinfsoft.herokuapp.com/api/videos/"+ columna4, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

        Vaciar()
    }
}


//Conseguir categoria
  let token=sessionStorage.getItem("token"); 
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://labinfsoft.herokuapp.com/api/categorias?limite=10&desde0", requestOptions)
    .then(response => response.json())
    .then(result => {
      let select = document.getElementById("categoria_video");

        for( i in result.categorias){
          select.insertAdjacentHTML("beforeend","<option value=" + result.categorias[i]["_id"] + ">" + result.categorias[i]["nombre"] + "</option>");
          }
      }
      
    )
    .catch(error => console.log('error', error));





//mostar videos
var myHeaders = new Headers();
myHeaders.append("Authorization", token);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://labinfsoft.herokuapp.com/api/videos?limite=20&desde0", requestOptions)
  .then(response => response.json())
  .then(result => {
    let tbody2 = document.getElementById("tbody2");

    console.log(result.productos)
      for( i in result.productos){
        
        columna4 = result.productos[i]["_id"]

        tbody2.insertAdjacentHTML("beforeend",
        "<tr><td>"+ result.productos[i]["nombre"] +"</td>  <td>"+ result.productos[i]["categoria"]["nombre"] +
        "<td>" + result.productos[i]["url"]+"</td>"+"<td>" + result.productos[i]["_id"]+"</td>"+
        "</td> <td>" +` <input class="submit" type="button" onClick="Editarr(this)" value="Editar"> </input>` + 
        `<input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`+
        
        "</td></tr>");
        
      }
    }
    
  )
  .catch(error => console.log('error', error));
