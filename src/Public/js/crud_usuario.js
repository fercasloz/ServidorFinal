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
    DataForm["nombre"] = document.getElementById("nombre").value
    DataForm["correo"] = document.getElementById("correo").value
    DataForm["contraseña"] = document.getElementById("contraseña").value

    DataForm["uid"] = ""
    return DataForm
}



function InsertarDatos(data) {
    let table = document.getElementById("tabla").getElementsByTagName('tbody')[0]
    let Fila = table.insertRow(table.length)
    columna1 = Fila.insertCell(0).innerHTML = data.nombre
    columna2 = Fila.insertCell(1).innerHTML = data.correo
    columna3 = Fila.insertCell(2).innerHTML = data.contraseña
    columna4 = Fila.insertCell(3).innerHTML = data.uid
    columna5 = Fila.insertCell(3).innerHTML = `<input class="submit" type="button" onClick="Editarr(this)" value="Editar" >
                                            <input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`
    
    document.getElementById("nombre").focus()


let token=sessionStorage.getItem("token");

    var myHeaders = new Headers();
  
    myHeaders.append("Authorization", token);
    
    myHeaders.append("Content-Type", "application/json");
    
    
    
    var raw = JSON.stringify({
    
      "nombre": document.getElementById("nombre").value,
    
      "correo": document.getElementById("correo").value,
    
      "password": document.getElementById("contraseña").value

    
    
    });
    
    
    
    var requestOptions = {
    
      method: 'POST',
    
      headers: myHeaders,
    
      body: raw,
    
      redirect: 'follow'
    
    };
    
    
    
    fetch("http://labinfsoft.herokuapp.com/api/usuarios", requestOptions)
    
      .then(response => response.json())
    
      .then(result => {
        console.log(result)
        columna4 = Fila.insertCell(3).innerHTML = result["uid"]
      })
    
      .catch(error => console.log('error', error));
  

  
    Vaciar()
}





function Vaciar() {
    document.getElementById("nombre").value = ""
    document.getElementById("correo").value = ""
    document.getElementById("contraseña").value = ""
    Fila = null
}




function Editarr(td) {


    Fila = td.parentElement.parentElement
    document.getElementById("nombre").value = Fila.cells[0].innerHTML
    document.getElementById("correo").value = Fila.cells[1].innerHTML
    document.getElementById("contraseña").value = Fila.cells[2].innerHTML

      
}




function Actualizar(DataForm) {
    Fila.cells[0].innerHTML = DataForm.nombre
    Fila.cells[1].innerHTML = DataForm.correo
    Fila.cells[2].innerHTML = DataForm.contraseña
    document.getElementById("nombre").focus()


    let token=sessionStorage.getItem("token");

    var myHeaders = new Headers();
  
    myHeaders.append("Authorization", token);
    
    myHeaders.append("Content-Type", "application/json");
    
    
    
    var raw = JSON.stringify({
    
      "nombre": document.getElementById("nombre").value,
    
      "correo": document.getElementById("correo").value,
    
      "password": document.getElementById("contraseña").value

    
    });
    
    
    
    var requestOptions = {
    
      method: 'PUT',
    
      headers: myHeaders,
    
      body: raw,
    
      redirect: 'follow'
    
    };
    
    
    
    fetch("http://labinfsoft.herokuapp.com/api/usuarios/"+ columna4, requestOptions)
    
      .then(response => response.text())
    
      .then(result => console.log(result))
    
      .catch(error => console.log('error', error));


}




function Borrarr(td) {
    if (confirm('¿Seguro de borrar este registro?')) {
        row = td.parentElement.parentElement
        document.getElementById("tabla").deleteRow(row.rowIndex)



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



fetch("http://labinfsoft.herokuapp.com/api/usuarios/" + columna4, requestOptions)

  .then(response => response.text())

  .then(result => console.log(result))

  .catch(error => console.log('error', error));

        Vaciar()
    }
}




//obtener todos los usuarios
let token=sessionStorage.getItem("token"); 
var myHeaders = new Headers();
myHeaders.append("Authorization", token);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://labinfsoft.herokuapp.com/api/usuarios?limite=20&desde0", requestOptions)
  .then(response => response.json())
  .then(result => {
    let tbody3 = document.getElementById("tbody3");
    console.log(result)

      for( i in result.usuarios){
        
        columna4 = result.usuarios[i]["uid"]

        tbody3.insertAdjacentHTML("beforeend",
        "<tr><td>"+ result.usuarios[i]["nombre"] +"</td>  <td>"+ result.usuarios[i]["correo"] +
        "</td> <td>" + result.usuarios[i][""] + "</td> <td>" + result.usuarios[i]["uid"]+
        "</td> <td>" +` <input class="submit" type="button" onClick="Editarr(this)" value="Editar"> </input>` + 
        `<input class="submit" type="button" onClick="Borrarr(this)" value="Borrar" >`+
        
        "</td></tr>");
        
      }
    }
    
  )
  .catch(error => console.log('error', error));









