//  ==============================================================
// Configuracion del tema dark y light
//  ==============================================================

const dayNight = document.querySelector(".day-night");
const skillLogos = document.querySelectorAll(".skill-logo");
const textsOnly = document.querySelectorAll(".text-only");

dayNight.addEventListener('click', () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle('dark');

    // Modificando la clase de logos o solo textos(solo texto funciona como logo)
    skillLogos.forEach(logo => {
      logo.classList.toggle("dark-logo")
    });

    textsOnly.forEach(texto => {
      texto.classList.toggle("dark-text")
    })
})

window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    dayNight.querySelector("i").classList.add("fa-sun");
    dayNight.querySelector("i").classList.remove("fa-moon");
  } else {
    dayNight.querySelector("i").classList.add("fa-moon");
    dayNight.querySelector("i").classList.remove("fa-sun");
  }
});
