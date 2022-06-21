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
    DataForm["nombre"] = document.getElementById("categoria").value

    DataForm["uid"] = ""
    return DataForm
}


function InsertarDatos(data) {
    let table = document.getElementById("tabla2").getElementsByTagName('tbody')[0]
    let Fila = table.insertRow(table.length)
    columna1 = Fila.insertCell(0).innerHTML = data.nombre
    columna2 = Fila.insertCell(1).innerHTML = data.uid
    columna3 = Fila.insertCell(1).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar" >
                                            <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`
    
    document.getElementById("categoria").focus()

//Se crea la categoria
    let token=sessionStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "nombre": document.getElementById("categoria").value
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://labinfsoft.herokuapp.com/api/categorias/", requestOptions)
      .then(response => response.json())

      .then(result => {
        console.log(result)
        columna2 = Fila.insertCell(1).innerHTML = result['_id']

      })

      .catch(error => console.log('error', error));

console.log(document.getElementById("categoria").value)

    Vaciar()
}


function Vaciar() {
    document.getElementById("categoria").value = ""
    Fila = null
}



function Editarr(td) {
    Fila = td.parentElement.parentElement
    document.getElementById("categoria").value = Fila.cells[0].innerHTML      
}


function Actualizar(DataForm) {
    Fila.cells[0].innerHTML = DataForm.nombre
    document.getElementById("categoria").focus()

//Se modifica la categoria
    let token=sessionStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "nombre": document.getElementById("categoria").value
    });
    
    var requestOptions = {
    
      method: 'PUT',
    
      headers: myHeaders,
    
      body: raw,
    
      redirect: 'follow'
    
    };
    
    fetch("https://labinfsoft.herokuapp.com/api/categorias/"+ columna2, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

}


function Borrarr(td) {
    if (confirm('¿Seguro de borrar este registro?')) {
        row = td.parentElement.parentElement
        document.getElementById("tabla2").deleteRow(row.rowIndex)


//Se elimina categoria
        let token=sessionStorage.getItem("token");  
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://labinfsoft.herokuapp.com/api/categorias/"+columna2, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));  

          Vaciar()
    }
}


//mostar categorias
let token=sessionStorage.getItem("token"); 
var myHeaders = new Headers();
myHeaders.append("Authorization", token);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://labinfsoft.herokuapp.com/api/categorias?limite=20&desde0", requestOptions)
  .then(response => response.json())
  .then(result => {
    let tbody = document.getElementById("tbody");

      for( i in result.categorias){
        
        columna2 = result.categorias[i]["_id"]

        tbody.insertAdjacentHTML("beforeend",
        "<tr><td>"+ result.categorias[i]["nombre"] +"</td>  <td>"+ result.categorias[i]["_id"] +
        "</td> <td>" +` <input class="submit" type="button" onClick="Editarr(this)" value="Editar"> </input>` + 
        `<input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`+
        
        "</td></tr>");
        
      }
    }
    
  )
  .catch(error => console.log('error', error));
