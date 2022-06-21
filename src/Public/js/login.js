function token(){
    
    email= document.getElementById("email")
    password=document.getElementById("password")
    var myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");

//console.log(document.getElementById("email").value)

var raw = JSON.stringify({

  "correo": document.getElementById("email").value,

  "password": document.getElementById("password").value

});



var requestOptions = {

  method: 'POST',

  headers: myHeaders,

  body: raw,

  redirect: 'follow'

};



fetch("https://labinfsoft.herokuapp.com/api/auth/login", requestOptions)

  .then(response => response.json())

  .then(result =>  { 
    sessionStorage.setItem("token", 'Bearer ' + result.token)
    console.log(result.usuario.rol)

    if(result.usuario.rol = "ADMIN_ROLE" ) window.location.assign("usuarioPreferente.html");
    else  window.location.assign("usuariosSP.html");
  }) 
    
  .catch(error => console.log('error', error));


}





