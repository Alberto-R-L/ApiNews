

//urlApi = "https://newsapi.org/v2/everything?q=cat&apiKey=96bf84656a224ac4a1005fc92ade694d"
  var index = 0;
  var page = 1;
  var divPadre;
  var tituloId;
  var imagenID;
  var contenidoId;
  var pageSize = 6;


function clearAndSearch(){
  document.getElementById("contenedorMaestro").innerHTML ="";
  page = 1;
  index = 0;
  searchNews();
}



function searchNews() {
  
  setUrl();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      respuesta = this.responseText;
      console.log(respuesta);
      console.log("page: " + page)
      index = 0;

      reload();
    }




    };
  xhttp.open("GET", urlApi, true);
  xhttp.send();

  

}

function setUrl(){
  botonId = document.getElementById("inputNoticias");
  text = botonId.value;
  urlApi = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://newsapi.org/v2/everything?q=" + text + "&pageSize=" + pageSize + "&page=" + page + "&apiKey=96bf84656a224ac4a1005fc92ade694d");
}


  
  //respuestaParse.articles[page]


function reload(){
  
  //Hacerlo que te elimine en la pagina
  //document.getElementById("contenedorMaestro").innerHTML ="";

  respuestaParse = JSON.parse(respuesta)
  barraDeEstado = document.getElementById("status");
  if(respuestaParse.totalResults != 0){


    for(i = 0; i < pageSize; i++){
        
      inputBusqueda = document.getElementById("inputNoticias");
      masResultados = document.getElementById("botonMas");
      divAbuelo = document.getElementById("contenedorMaestro");
      divPadre = document.createElement("div");
      tituloId = document.createElement("div");
      imagenId = document.createElement("img");
      contenidoId = document.createElement("div");
      //masInfo = document.createElement("button");
      enlaceNoticia = document.createElement("a");
      //contadorPagina = document.getElementById("contadorPagina");

      divAbuelo.appendChild(divPadre);
      divPadre.setAttribute("class", "contenedorPadre");
      divPadre.style.width = "27vw";
      divPadre.style.position = "relative";
      divPadre.style.borderLeft = "solid";
      divPadre.style.borderColor = "burlyWood";
      divPadre.style.backgroundColor = "moccasin"
      divPadre.style.padding = "1vh";
      divPadre.style.marginLeft = "1rem";
      divPadre.style.marginTop = "1rem";
      divPadre.style.animation ="fade .5s";
      //divPadre.style.borderRadius = "5%";
      

      divPadre.appendChild(tituloId);

      divPadre.appendChild(imagenId);
      imagenId.style.width = "26vw";

      divPadre.appendChild(contenidoId);

      /*divPadre.appendChild(masInfo);
      masInfo.textContent = "Mas info"
      //masInfo.style.border = "outset"
      */
      divPadre.appendChild(enlaceNoticia);
      enlaceNoticia.textContent ="Mas info"
      
      
      titulo = respuestaParse.articles[index].title;
      imagen = respuestaParse.articles[index].urlToImage;
      
      //--------------------------Trimer---------------------------
      contenido = trimText(respuestaParse.articles[index].content);
      
      //contenido = respuestaParse.articles[index].content;

      enlace = respuestaParse.articles[index].url;

      tituloId.textContent = titulo;
      imagenId.src=imagen;
      contenidoId.textContent = contenido;
      enlaceNoticia.href= enlace;

      //contadorPagina.textContent = page;
      
      index++
      //console.log(index)

      masResultados.style.opacity ="1";

      
      barraDeEstado.textContent="Se han encontrado: " + respuestaParse.totalResults + " resultados." ;
    
      scrollDown();
    }    
  }
}

function trimText(textoIntroducido){
  position = textoIntroducido.lastIndexOf("[");
  nuevaCadena = textoIntroducido.slice(0, position);

  //console.log(nuevaCadena + "  a  " + textoIntroducido + " a " + position)
  return nuevaCadena;
}


function scrollDown(){
  window.scrollTo(0, document.body.scrollHeight);
}



function cargarMas(){
  page++
  //contadorPagina.textContent = page;
      searchNews();
    }


    


    
