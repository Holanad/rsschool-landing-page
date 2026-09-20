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