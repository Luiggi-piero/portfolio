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