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
        window.addEventListener('resize', () => {
            if(window.innerWidth >= 768) {
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
    if (!tabsBtn.length) {
        return;
    }
    
    let currentCardsShow = 0;

    const countLoadCards = {
        992 : 8,
        320 : 4,
    }

    let dataCoffee = [];

    const sizeWindowShow = () => {
        Object.keys(countLoadCards).forEach((elem, index) => {
            if(window.innerWidth >= elem) {
                currentCardsShow = Object.values(countLoadCards)[index];
            }
        })
        return currentCardsShow;
    }
    sizeWindowShow();

    fetch('assets/json/products.json')
    .then(response => response.json())
    .then(jsonData => {
        dataCoffee = jsonData;
        loadCoffee();
        switchCategoryCoffee();
    });

    const loadCoffee = (categoryCoffee = tabsBtn[0].getAttribute('data-coffee'), countLoad = currentCardsShow) => {
        
        const listCoffee = document.querySelector('.tabs-block .cards');
        listCoffee.innerHTML = '';
        
        let resultCoffe = ``;
        let countCardsInCategory = 0;
        
        for(let i = 0; i < dataCoffee.length; i++) {
            if(categoryCoffee == dataCoffee[i].category) {
                countCardsInCategory++;
                if(countCardsInCategory <= countLoad) {
                    document.querySelector('.card-more').classList.add('none');
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
                    `;
                } else {
                    document.querySelector('.card-more').classList.remove('none');
                }
            }
        }
        listCoffee.innerHTML = resultCoffe;
        popupSettings(dataCoffee);
    }

    const switchCategoryCoffee = () => {
        tabsBtn.forEach((e) => {
            e.addEventListener('click', () => {
                tabsBtn.forEach((s) => {
                    s.classList.remove('active')
                })
                e.classList.add('active')

                Object.keys(countLoadCards).forEach((elem, index) => {
                    if(window.innerWidth >= elem) {
                        cardsItemShow = Object.values(countLoadCards)[index]
                    }
                })

                currentCardsShow = sizeWindowShow();

                loadCoffee(e.getAttribute('data-coffee'))
            })
        })
    }

    const loadMoreCards = () => {
        document.querySelector('.card-more').addEventListener('click', () => {
            let categoryBlock;
            tabsBtn.forEach((e) => {
                if(e.classList.contains('active')) {
                    categoryBlock = e;
                }
            })
            currentCardsShow += sizeWindowShow();

            loadCoffee(categoryBlock.getAttribute('data-coffee'), currentCardsShow)
        })
        
        window.addEventListener('resize', () => {
            let categoryBlock;
            tabsBtn.forEach((e) => {
                if(e.classList.contains('active')) {
                    categoryBlock = e;
                }
            })
            currentCardsShow = sizeWindowShow();
            loadCoffee(categoryBlock.getAttribute('data-coffee'), currentCardsShow)
        })
    }
    loadMoreCards();
    
    const popupSettings = () => {

        const cardElems = document.querySelectorAll('.card')
        const modalCoffeeElem = document.querySelector('.popup-coffee');

        const openModal = () => {
            cardElems.forEach((e) => {
                e.addEventListener('click', () => {
                    const cardCurrent = e.getAttribute('data-title');
                    let totalCardPrice = 0;

                    for(let i = 0; i < dataCoffee.length; i++) {
                        if(cardCurrent == dataCoffee[i].name) {

                            modalCoffeeElem.querySelector('.popup-coffee-image img').setAttribute('src', dataCoffee[i].image);
                            modalCoffeeElem.querySelector('.popup-coffee__title').textContent = dataCoffee[i].name;
                            modalCoffeeElem.querySelector('.popup-coffee__descr').textContent = dataCoffee[i].description;
                            modalCoffeeElem.querySelector('.popup-coffee-total__price').textContent = '$' + dataCoffee[i].price;
                            modalCoffeeElem.querySelector('.popup-coffee-total').setAttribute('data-total', dataCoffee[i].price);
                            totalCardPrice = dataCoffee[i].price;
                            
                            
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
                                        <input type="radio" name="additives">
                                        <span class="bg"></span>
                                        <span class="icon f-center-center">${Number(elem) + 1}</span>
                                        <span class="name">${Object.values(dataCoffee[i].additives[elem])[0]}</span>
                                    </label>
                                `;
                            })
                            modalCoffeeElem.querySelector('.popup-coffee-block-additives .popup-coffee-settings').innerHTML = advitivesCoffee;
                        }
                    }
                    modalCoffeeElem.classList.add('open');
                    document.querySelector('html').classList.add('hidden');
                    selectCardSettings(totalCardPrice);
                })
            })
        }
        openModal()

        const closeModal = () => {
            document.querySelector('.popup-coffee__close').addEventListener('click', () => {
                document.querySelector('html').classList.remove('hidden');
                modalCoffeeElem.classList.remove('open');
            })
            document.addEventListener('click', (e) => {
                if(e.target.classList.contains('duty')) {
                    document.querySelector('html').classList.remove('hidden');
                    modalCoffeeElem.classList.remove('open');
                }
            })
            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape") {
                    document.querySelector('html').classList.remove('hidden');
                    modalCoffeeElem.classList.remove('open');
                }
            })
        }
        closeModal()

        const selectCardSettings = (totalCardPrice) => {
            const checkboxModal = modalCoffeeElem.querySelectorAll('.popup-coffee-settings-item');
            let dopPriceTotal = 0;
            checkboxModal.forEach((e) => {
                e.addEventListener('change', (e) => {
                    dopPriceTotal = 0;
                    checkboxModal.forEach((elem) => {
                        if(elem.querySelector('input').checked) {
                            dopPriceTotal += Number(elem.getAttribute('data-dopprice'))
                        }
                    })
                    modalCoffeeElem.querySelector('.popup-coffee-total__price').textContent = '$' + (Number(totalCardPrice) + dopPriceTotal).toFixed(2);
                })
            })
        }
        
    }
    

}
coffieMenuSettings()

// slider index.hmtl

const coffeeSliderMain = () => {
    const sliderElem = document.querySelector('.favorite-slider');
    const sliderSlideElems = sliderElem.querySelectorAll('.favorite-item');

    
    const adaptiveHeightSlider = (currentSlideElem = sliderElem.querySelector('.favorite-item.current').offsetHeight) => {
        sliderElem.querySelector('.favorite-slider-wrapper').setAttribute('style', `height: ${currentSlideElem}px`);
    }
    adaptiveHeightSlider()
    window.addEventListener('resize', () => {
            adaptiveHeightSlider();
    });

    const panelSliderSettings = () => {
        const sliderPanelNextElem = sliderElem.querySelector('.favorite-panel__next');
        const sliderPanelPrevElem = sliderElem.querySelector('.favorite-panel__prev');
        const sliderPanelPaginationElem = sliderElem.querySelector('.favorite-pagination');

        const nextSlidePanelSettings = () => {
            let nextSlide;
            let numSlide;
            sliderSlideElems.forEach((e, i) => {
                if(e.classList.contains('current')) {
                    if(e.nextElementSibling == null) {
                        nextSlide = e.parentElement.firstElementChild;
                        numSlide = 0;
                    } else {
                        nextSlide = e.nextElementSibling;
                        numSlide = i + 1;
                    }
                    e.classList.remove('current');
                }
            })
            nextSlide.classList.add('current');
            adaptiveHeightSlider();
            paginationPanelSettings(numSlide);
                
        }
        sliderPanelNextElem.addEventListener('click', () => {
            nextSlidePanelSettings();
            restartAutoplay();
        });

        const prevSlidePanelSettings = () => {
            let prevSlide;
            let numSlide;
            sliderSlideElems.forEach((e, i) => {
                if(e.classList.contains('current')) {
                    if(e.previousElementSibling == null) {
                        prevSlide = e.parentElement.lastElementChild;
                        numSlide = sliderSlideElems.length - 1;
                    } else {
                        prevSlide= e.previousElementSibling;
                        numSlide = i - 1;
                    }
                    e.classList.remove('current');
                }
            })
            prevSlide.classList.add('current');
            adaptiveHeightSlider();
            paginationPanelSettings(numSlide);
        }
        sliderPanelPrevElem.addEventListener('click', () => {
            prevSlidePanelSettings();
            restartAutoplay();
        });

        const paginationPanelSettings = (numSlide) => {
            sliderPanelPaginationElem.querySelectorAll('span').forEach((e) => {
                e.classList.remove('active');
                e.querySelector('b').setAttribute('style', `width: 0%; transition: all 0s linear;`);
            })
            sliderPanelPaginationElem.querySelectorAll('span')[numSlide].classList.add('active');

            setTimeout(() => {
                sliderPanelPaginationElem.querySelectorAll('span')[numSlide].querySelector('b').setAttribute('style', `width: 100%; transition: all 3s linear`);
            }, 10);
        }
        paginationPanelSettings(0);

         const swipeSlider = () => {
            let x1 = null;
            let y1 = null;

            const handleTouchStart = (e) => {
                const firstTouch = e.touches[0];

                x1 = firstTouch.clientX;
                y1 = firstTouch.clientY;
                restartAutoplay();
            }
            const handleTouchMove = (e) => {
                if(!x1 || !y1) {
                    return false;
                }
                let x2 = e.touches[0].clientX;
                let y2 = e.touches[0].clientY;

                let xDiff = x2 - x1;
                let yDiff = y2 - y1;

                if(Math.abs(xDiff) > Math.abs(yDiff)) {
                    if(xDiff > 0) {
                        prevSlidePanelSettings();

                    } else {
                        nextSlidePanelSettings();
                    }
                } else {
                }
                x1 = null;
                y1 = null;

            }

            document.addEventListener('touchstart', handleTouchStart, false);          
            document.addEventListener('touchmove', handleTouchMove, false);
        }
        swipeSlider();

        let autoplayElem;
        const timerAutoplay = 3000;
        const startAutoplay = () => {
            autoplayElem = setInterval(() => {
                nextSlidePanelSettings();
            }, timerAutoplay);
        };
        const restartAutoplay = () => {
            clearInterval(autoplayElem);
            startAutoplay(timerAutoplay);
        };

        startAutoplay();
    }
    panelSliderSettings()


}
coffeeSliderMain()