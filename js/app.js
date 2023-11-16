//Formos submitas

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = document.querySelector(".form-control").value;
  const apiUrl = `https://www.omdbapi.com/?t=${searchTerm}&apikey=18c1a865`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.Title) {
        showMovie(data);
      } else {
        showError(data);
      }
      // lentele atvaizduojama tik tada, kai gaunami filmo duomenys
      // jeigu filmas neras, vietoj lenteles isvedama klaidos response ir api
      // jei filmas turi poster, tada jis turi buti atvaizduojamas su filmu
    });
});

const showMovie = (data) => {
  document.querySelector(".title").textContent = data.Title;
  document.querySelector(".time").textContent = data.Runtime;
  document.querySelector(".director").textContent = data.Director;
  document.querySelector(".year").textContent = data.Year;
  document.querySelector(".imbd").textContent = data.Title;
  document.querySelector(".other").textContent = data.Plot;
  document.querySelector(".image img").src = data.Poster;
};
const showError = (data)=>{
    document.querySelector("table").style.display = "none";
    document.querySelector('.alert').style.display='block';
    document.querySelector(".alert-danger").textContent = data.Error;
}

const placelist = document.getElementById("places");
const input = document.querySelector(".places input");

fetch("https://api.meteo.lt/v1/places")
  .then((response) => response.json())
  .then((data) => {
    const locationsData = data.map((place) => place.name);
    
    locationsData.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      placelist.appendChild(option);
    });
  });