const nameVille = document.querySelector("#lieu");
const descript = document.querySelector("#descript");
const temperature = document.querySelector("#temp");
const humiditer = document.querySelector("#hum");
const icone = document.querySelector("#icn");
const heure = document.querySelector("#hour");
let ville = "Paris";
const APIKey = "1613d15366e49d99faf965a3c247bf3a";
const validRecherche = document.querySelector("#valid");

function affichZero(nombre) {
    // cette fonction prend en paramètre un nombre
    // si ce nombre est inférieur à 10, on affiche 0 + ce nombre
    // Ex: il est 07h00
    return nombre < 10 ? '0' + nombre : nombre;
    }
    function dateEtHeure() {
    // Cette fonction fait deux choses :
    // 1 - Elle construit une constante avec l'objet Date()
    // qui renvoie (année, mois, jour, heure, minutes, seconde, millisecondes)
    // tout ça est dans l'objet infos
     
    const infos = new Date();
     
    // 2 - La fonction attribue du texte au div id="heure_exacte"
    // ce texte n'est autre que l'heure contenue dans l'objet infos
    // on ne souhaite afficher que l'heure et les minutes avec infos.getHours()
    // et infos.getMinutes(), On Sépare par ":" Ex: il est 07:00.
     
    document.getElementById('heure_exacte').innerHTML = ' ' + affichZero(infos.getHours()) + ':' + affichZero(infos.getMinutes());
    }// Fin fonction dateEtHeure
     
    // Pour actualiser l'heure chaque minutes, on rappelle la fonction dateEtHeure()
    // toutes les 100 millisecondes, donc toutes les secondes
    window.onload = function() {
    setInterval("dateEtHeure()", 100);
    };


validRecherche.addEventListener("click", function(){
    let ville = document.querySelector("#bar").value;
    request(ville);

})
axios.get("https://api.apixu.com/v1/current.json?key=9e7a402560384698834100634192305&q=" + ville).then(function(rep){
    heure.innerHTML = rep.data.location.localtime;
})



function request (ville){
axios.get( 'https://api.openweathermap.org/data/2.5/weather?q='+ ville + '&units=metric'+'&APPID=' + APIKey)
.then(function(response){
    console.log(response);
    var Temp = response.data.main.temp;
    temperature.innerHTML = Math.floor(Temp)+"°" ;
    var Humide = "Taux d'humidité: "+response.data.main.humidity;
    humiditer.innerHTML = Humide+"%" ;
    nameVille.innerHTML = response.data.name;
    //descript.innerHTML = response.data.weather[0].description;
    axios.get("https://api.apixu.com/v1/current.json?key=9e7a402560384698834100634192305&q=" + ville).then(function(rep){
    heure.innerHTML = rep.data.location.localtime;
})
    if (response.data.weather[0].description == "clear sky"){
        icone.setAttribute("src" , "img/sun.png");
        descript.innerHTML = "Le ciel es dégagé"
        return;
    }
    if (response.data.weather[0].description == "few clouds"){
        icone.setAttribute("src" , "img/few clouds.png");
        return;
    }
    if (response.data.weather[0].description == "scattered clouds"){
        icone.setAttribute("src" , "img/cloud.png");
        return;
    }
    if (response.data.weather[0].description == "broken clouds"){
        icone.setAttribute("src" , "img/broken clouds.png");
        return;
    }
    if (response.data.weather[0].description == "shower rain"){
        icone.setAttribute("src" , "img/shower rain.png");
        return;
    }
    if (response.data.weather[0].description == "rain"){
        icone.setAttribute("src" , "img/rain.png");
        return;
    }
    if (response.data.weather[0].description == "thunderstorm"){
        icone.setAttribute("src" , "img/thunderstorm.png");
        return;
    }
    if (response.data.weather[0].description == "snow"){
        icone.setAttribute("src" , "img/snow.png");
        return;
    }
    if (response.data.weather[0].description == "mist"){
        icone.setAttribute("src" , "img/mist.png");
        return;
    }
    
    
  })}
  request(ville);
