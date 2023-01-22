//  ==============================================================
//  about tabs
//  ==============================================================

(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    // Si presenta la clase 'tab-item' y no contiene la clase 'active'
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      // data-item del tab-item seleccionado
      const target = event.target.getAttribute("data-item");

      // Retirar clase 'active' del tab-item activo anterior
      tabsContainer.querySelector(".active").classList.remove("active");
      // Agregar la clase 'active' al tab-item en uso
      event.target.classList.add("active");

      // Retirar la clase 'active' del tab-content no usado
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // Agregar la clase 'active' del tab-content en uso
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

function bodyScrollingToggle() {
  document.body.classList.toggle("stop-scrolling");
}

//  ==============================================================
//  porfolio filter - popup
//  ==============================================================

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    btnClose = document.querySelector(".popup-close"),
    portfolioDetailsContent = document.querySelector(".popup-details"),
    btnProjectDetails = document.querySelector(".popup-details-btn");

  let itemIndex, screenshots, slideIndex;
  // filtrar portafolio
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // Retirar la clase 'active' del item activo
      filterContainer.querySelector(".active").classList.remove("active");
      // Agregar la clase 'active' al 'filter-item' en uso
      event.target.classList.add("active");

      const dataFilterItem = event.target.getAttribute("data-item");
      portfolioItems.forEach((element) => {
        // console.log('categoria', element.getAttribute('data-category'));
        if (
          dataFilterItem === element.getAttribute("data-category") ||
          dataFilterItem === "all"
        ) {
          element.classList.remove("hide");
          element.classList.add("show");
        } else {
          element.classList.remove("show");
          element.classList.add("hide");
        }
      });
    }
  });

  // Abrir popup
  portfolioItemsContainer.addEventListener("click", (event) => {
    // Devuelve el elemento ascendiente mas cercano que sea igual a 'portfolio-item-inner'
    // console.log(event.target.closest('.portfolio-item-inner'));
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      // Obtener el indice de 'portfolio-item' seleccionado
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      // listado de imagenes del 'portfolio-item' seleccionado
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      screenshots = screenshots.split(",");
      slideIndex = 0;
      popupToggle();
      // Mostrar imagen en el popup del portfolio-item seleccionado
      popupImg();
      // Obtener y mostrar detalles del proyecto
      popupDetails();
    }
  });

  btnClose.addEventListener("click", () => {
    popupToggle();
    // Comprime el detalle del proyecto
    if (portfolioDetailsContent.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupImg() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".popup-img");
    // Activar loading
    popup.querySelector(".popup-loader").classList.add("active");
    popupImg.src = imgSrc;
    // Al terminar de cargar la pagina
    popupImg.onload = () => {
      // Desactivar loading
      popup.querySelector(".popup-loader").classList.remove("active");
    };
  }

  btnProjectDetails.addEventListener("click", () => {
    popupDetailsToggle();
  });

  function popupDetails() {
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    popup.querySelector(".popup-project-details").innerHTML = details;

    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    popup.querySelector("h2").innerHTML = title;

    const category = portfolioItems[itemIndex].getAttribute("data-category");
    popup.querySelector(".popup-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  function popupDetailsToggle() {
    if (portfolioDetailsContent.classList.contains("active")) {
      btnProjectDetails.querySelector("i").classList.remove("fa-minus");
      btnProjectDetails.querySelector("i").classList.add("fa-plus");

      portfolioDetailsContent.classList.remove("active");
      portfolioDetailsContent.style.maxHeight = 0 + "px";
    } else {
      btnProjectDetails.querySelector("i").classList.remove("fa-plus");
      btnProjectDetails.querySelector("i").classList.add("fa-minus");

      portfolioDetailsContent.classList.add("active");
      portfolioDetailsContent.style.maxHeight =
        portfolioDetailsContent.scrollHeight + "px";
      // ubica el scroll en la parte superior de la pantalla
      popup.scrollTo(0, portfolioDetailsContent.offsetTop);
    }
  }
})();

//  ==============================================================
//  Nav menu
//  ==============================================================

// Ocultar todas las secciones menos el home
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

(() => {
  const btnHamburger = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    btnCloseNav = document.querySelector(".close-nav-menu");

  btnHamburger.addEventListener("click", showNavMenu);
  btnCloseNav.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }

  // Controlar los eventos de 'link-item'
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      if (event.target.hash !== "") {
        event.preventDefault();
        const hash = event.target.hash;
        // Retirar 'active' y agregar'hide' de la seccion activa actual
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");

        // Agregar 'active' a la nueva seccion
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");

        // Desactivar del menu de navegacion el activo existente
        navMenu.querySelector(".active").classList.remove("active");

        // Si selecciona 'link-item' del interior del menu de navegacion
        if (navMenu.classList.contains("open")) {
          // Activar el elemento 'link-item' seleccionado del menu
          event.target.classList.add("active");

          // Ocultar menu
          hideNavMenu();
        } else {
          const navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // Activar el elemento 'link-item' seleccionado
              item.classList.add("active");
            }
          });
          fadeOutEffect();
        }

        // Agregar hash al url
        window.location.hash = hash;
      }
    }
  });
})();
