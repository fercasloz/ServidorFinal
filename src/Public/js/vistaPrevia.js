let token=sessionStorage.getItem("token");
//recuperar videos
var myHeaders = new Headers();
myHeaders.append("Authorization", token);


var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://labinfsoft.herokuapp.com/api/videos?limite=10&desde=0", requestOptions)
  .then(response => response.json())

  .then(result => {
      let tbody = document.getElementById("tbody");
    console.log(result.productos[0])

    for( i in result.productos){
        tbody.insertAdjacentHTML("beforeend","<td> <div class=" +"item-contenido"+ ">"+"<iframe  src=" +result.productos[i]["url"] + `title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`+
                                                "</div> </td> <td>"+ result.productos[i]["nombre"]+"<br>"+ result.productos[i]["categoria"]["nombre"] +
                                                "<br>"+ result.productos[i]["url"] +"</td>"

        )
    }
  })


  .catch(error => console.log('error', error));