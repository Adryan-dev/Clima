let searchElement = document.querySelector("#searchInput");
let btn = document.querySelector("form.busca button");
let resultado = document.querySelector(".resultado");
let titulo = document.querySelector(".titulo");
let temp = document.querySelector(".tempInfo");
let wind = document.querySelector(".ventoInfo");
let img = document.querySelector(".temp img");
let windImg = document.querySelector(".ventoPonto");

document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(searchElement);

  if (searchElement.value !== "") {
    showWarning("Carregando...");
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(searchElement.value)}&appid=bfeb5fc772efa63c919fd3398b87e9a7&units=metric&lang=pt_br`;

  let results = await fetch(url);
  let json = await results.json();

  if (json.cod === 200) {
    clearInfo();
    showInfo({
      name: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      windAngle: json.wind.deg,
    });
  } else {
    showWarning("Não encontramos esta localização");
  }
});

function showInfo(json) {
  console.log(json);
  resultado.style.display = "block";
  titulo.innerHTML = `${json.name}, ${json.country}`;
  temp.innerHTML = `${json.temp}`;
  wind.innerHTML = `${json.windSpeed}`;
  img.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${json.tempIcon}.png`
  );
  windImg.style.transform = `rotate(${json.windAngle}deg)`;
  console.log(`${json.windAngle}`);
}

function clearInfo(){
    showWarning('');
    resultado.style.display = 'none';
}

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}

/* 


    fetch(
      `api.openweathermap.org/data/2.5/weather?q=${searchElement}&appid=bfeb5fc772efa63c919fd3398b87e9a7`
    )
      .then(function (data) {
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });


*/
