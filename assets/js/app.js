const themeSiteSettings = () => {
    let headersSwitchElem = document.querySelector('.header-switch');

    // function load site
    document.querySelector('body').classList.remove('none');
    if(localStorage.getItem('siteTheme') == 'dark') {
        document.querySelector('body').classList.add('darkTheme');
        headersSwitchElem.querySelector('.dark').classList.add('active');
        headersSwitchElem.classList.remove('normalActive')
        headersSwitchElem.classList.add('darkActive');
    }

    // function switch button
    const switchButton = () => {

        headersSwitchElem.addEventListener('click', () => {
            if(headersSwitchElem.classList.contains('normalActive')) {
                headersSwitchElem.classList.remove('normalActive')
                headersSwitchElem.classList.add('darkActive');
            } else {
                headersSwitchElem.classList.remove('darkActive')
                headersSwitchElem.classList.add('normalActive')
            }

            headersSwitchElem.querySelectorAll('.header-switch__button').forEach((e) => {
                e.classList.remove('active');
            })
            document.querySelector('body').removeAttribute('class');

            for(let i = 0; i < headersSwitchElem.classList.length; i++) {
                switch(headersSwitchElem.classList[i]) {
                    case 'normalActive': {
                        headersSwitchElem.querySelector('.normal').classList.add('active');
                        localStorage.setItem('siteTheme', 'normal');
                    }
                    break;
                    case 'darkActive' : {
                        headersSwitchElem.querySelector('.dark').classList.add('active');
                        document.querySelector('body').classList.add('darkTheme');
                        localStorage.setItem('siteTheme', 'dark');
                    }
                    break;
                }
            }
        });
    };
    switchButton();
};
themeSiteSettings();

// burger menu

const html = document.querySelector('html');

const headerAdaptive = () => {
    const headerMobileElem = document.querySelector('.header-mobile');
    const headerBurgerButtonElem = document.querySelector('.header-burger');
    const headerItemLinkElem = document.querySelectorAll('.header-item__link');


    const headerOpenBurger = () => {
        headerBurgerButtonElem.addEventListener('click', () => {
            headerMobileElem.classList.toggle('open');
            headerBurgerButtonElem.classList.toggle('open')
            if(html.classList.contains('hidden')) {
                html.classList.remove('hidden');
            } else {
                html.classList.add('hidden');
            }
        })
    };

    const headerCloseBurger = () => {
        headerItemLinkElem.forEach((e) => {
            e.addEventListener('click', () => {
                headerMobileElem.classList.remove('open');
                headerBurgerButtonElem.classList.remove('open');
                html.classList.remove('hidden');
            })
        })
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                headerMobileElem.classList.remove('open');
                headerBurgerButtonElem.classList.remove('open');
                html.classList.remove('hidden');
            }
        })
    };


    headerCloseBurger();
    headerOpenBurger();
}
headerAdaptive();



// coffie settings
const coffieMenuSettings = () => {

    const tabsBtn = document.querySelectorAll('.tabs__button');

    fetch('assets/json/products.json')
    .then(response => response.json())
    .then(jsonData => {
        loadCoffee(tabsBtn[0].getAttribute('data-coffee'), jsonData);
        switchCategoryCoffee(jsonData)
    });

    const loadCoffee = (categoryCoffee, dataCoffee) => {
        const listCoffee = document.querySelector('.tabs-block .cards');

        listCoffee.innerHTML = '';
        
        let resultCoffe = ``;
        for(let i = 0; i < dataCoffee.length; i++) {
            if(categoryCoffee == dataCoffee[i].category) {
                resultCoffe += `
                    <li class="card" data-title="${dataCoffee[i].name}">
                        <div class="card-image">
                            <img src="${dataCoffee[i].image}" alt="Irish coffee" class="img-cover">
                        </div>
                        <div class="card-info f-dc">
                            <h2 class="card__name">
                                ${dataCoffee[i].name}
                            </h2>
                            <p class="card__descr">
                                ${dataCoffee[i].description}
                            </p>
                            <p class="card__price">
                                $${dataCoffee[i].price}
                            </p>
                        </div>
                    </li>
                `
            }
        }
        listCoffee.innerHTML = resultCoffe;
        popupSettings(dataCoffee);
    }


    const switchCategoryCoffee = (dataCoffee) => {
        tabsBtn.forEach((e) => {
            e.addEventListener('click', () => {
                tabsBtn.forEach((s) => {
                    s.classList.remove('active')
                })
                e.classList.add('active')
                loadCoffee(e.getAttribute('data-coffee'), dataCoffee)
            })
        })
    }
    
    const popupSettings = (dataCoffee) => {

        const cardElems = document.querySelectorAll('.card')
        const modalCoffeeElem = document.querySelector('.popup-coffee');

        const openModal = () => {
            cardElems.forEach((e) => {
                e.addEventListener('click', () => {
                    const cardCurrent = e.getAttribute('data-title');
                    for(let i = 0; i < dataCoffee.length; i++) {
                        if(cardCurrent == dataCoffee[i].name) {

                            modalCoffeeElem.querySelector('.popup-coffee-image img').setAttribute('src', dataCoffee[i].image);
                            modalCoffeeElem.querySelector('.popup-coffee__title').textContent = dataCoffee[i].name;
                            modalCoffeeElem.querySelector('.popup-coffee__descr').textContent = dataCoffee[i].description;
                            modalCoffeeElem.querySelector('.popup-coffee-total__name').textContent = '$' + dataCoffee[i].price;
                            
                            
                            // size coffee
                            let sizeCoffee = ``;
                            Object.keys(dataCoffee[i].sizes).forEach((elem) => {
                                sizeCoffee += `
                                    <label class="popup-coffee-settings-item f-center" data-dopprice="${Object.values(dataCoffee[i].sizes[elem])[1]}">
                                        <input type="radio" name="size">
                                        <span class="bg"></span>
                                        <span class="icon f-center-center">${elem}</span>
                                        <span class="name">${Object.values(dataCoffee[i].sizes[elem])[0]}</span>
                                    </label>
                                `;
                            })
                            modalCoffeeElem.querySelector('.popup-coffee-block-size .popup-coffee-settings').innerHTML = sizeCoffee;

                            //advitives
                            let advitivesCoffee = ``;
                            Object.keys(dataCoffee[i].additives).forEach((elem) => {
                                advitivesCoffee += `
                                    <label class="popup-coffee-settings-item f-center" data-dopprice="${Object.values(dataCoffee[i].additives[elem])[1]}">
                                        <input type="radio" name="size">
                                        <span class="bg"></span>
                                        <span class="icon f-center-center">${Number(elem) + 1}</span>
                                        <span class="name">${Object.values(dataCoffee[i].additives[elem])[0]}</span>
                                    </label>
                                `;
                            })
                            modalCoffeeElem.querySelector('.popup-coffee-block-additives .popup-coffee-settings').innerHTML = advitivesCoffee;
                        }
                    }
                    modalCoffeeElem.classList.add('open')
                })
            })
        }
        openModal()
        
    }
}
coffieMenuSettings()
