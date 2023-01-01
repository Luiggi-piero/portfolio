//  ==============================================================
//  about tabs 
//  ============================================================== 

(()=>{
    const aboutSection = document.querySelector('.about-section'), 
    tabsContainer = document.querySelector('.about-tabs');

    tabsContainer.addEventListener('click', (event) => {
        // Si presenta la clase 'tab-item' y no contiene la clase 'active'
        if(event.target.classList.contains('tab-item') && !event.target.classList.contains('active')){
            // data-item del tab-item seleccionado
            const target = event.target.getAttribute('data-item');
            
            // Retirar clase 'active' del tab-item activo anterior
            tabsContainer.querySelector('.active').classList.remove('active');
            // Agregar la clase 'active' al tab-item en uso
            event.target.classList.add('active');

            // Retirar la clase 'active' del tab-content no usado
            aboutSection.querySelector('.tab-content.active').classList.remove('active');
            // Agregar la clase 'active' del tab-content en uso
            aboutSection.querySelector(target).classList.add('active');
        }
    })
})();

//  ==============================================================
//  porfolio filter - popup 
//  ============================================================== 

(()=>{
    const filterContainer = document.querySelector('.portfolio-filter'),
        portfolioItemsContainer = document.querySelector('.portfolio-items'),
        portfolioItems = document.querySelectorAll('.portfolio-item'),
        popup = document.querySelector('.portfolio-popup'),
        btnClose = document.querySelector('.popup-close'),
        portfolioDetailsContent = document.querySelector('.popup-details'),
        btnProjectDetails = document.querySelector('.popup-details-btn');

    let itemIndex;
    // filtrar portafolio
    filterContainer.addEventListener('click', (event)=>{
        if(event.target.classList.contains('filter-item') && !event.target.classList.contains('active')){
            // Retirar la clase 'active' del item activo
            filterContainer.querySelector('.active').classList.remove('active');
            // Agregar la clase 'active' al 'filter-item' en uso
            event.target.classList.add('active');
            
            const dataFilterItem = event.target.getAttribute('data-item');
            console.log(dataFilterItem);
            portfolioItems.forEach(element => {
                // console.log('categoria', element.getAttribute('data-category'));
                if(dataFilterItem === element.getAttribute('data-category') || dataFilterItem === 'all'){
                    element.classList.remove('hide');
                    element.classList.add('show');
                }else{
                    element.classList.remove('show');
                    element.classList.add('hide');
                }
            });
        }
    });

    // Abrir popup
    portfolioItemsContainer.addEventListener('click', (event)=>{
        // Devuelve el elemento ascendiente mas cercano que sea igual a 'portfolio-item-inner'
        // console.log(event.target.closest('.portfolio-item-inner'));
        if(event.target.closest('.portfolio-item-inner')){
            const portfolioItem = event.target.closest('.portfolio-item-inner').parentElement;
            // Obtener el indice de portfolioItem
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            console.log(itemIndex);
        }
    });

})();