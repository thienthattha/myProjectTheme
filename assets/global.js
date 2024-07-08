const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Handle Header
const header = {
    handleclick: function() {
        const menuBtn = $('.header-drawer__icon');
        
        if (menuBtn) {
            menuBtn.addEventListener('click', ()=> {
                $('.header-drawer__icon--close').classList.toggle('display-none');
                $('.header-drawer__icon--humburger').classList.toggle('display-none');
                $('.header-drawer__list-menu').classList.toggle('header-drawer__list-menu--toggle')
            });
        }

        // Click modal
        $('.header-search__icon').addEventListener('click', ()=> {
            $('.header-search-modal').classList.toggle('header-search-modal--toggle');
        });

        $('.header-search-modal__close').addEventListener('click', ()=> {
            $('.header-search-modal').classList.remove('header-search-modal--toggle');
        });

        // Click disclosure
        $('.header-task__disclosure--btn').addEventListener('click', ()=> {
            $('.header-task__disclosure--list').classList.toggle('header-task__disclosure--toggle');
        });
    },

    handleRender: function() {
        const hightHeader = $('.header').clientHeight;
        $('.header-drawer__list-menu').style.top = `${hightHeader}px`;
    },

    start: function() {
        this.handleRender();
        this.handleclick();
    }
};

// Handle Banners - Img With Text
const bannerImg = {
    handlePauseVideo: function(iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    },

    handlePlayVideo: function(iframe) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    },

    handleClick: function() {
        const btnBanners = $('.banners-button');
        const btnImgWithTexts = $$('.img-with-text-button');
        let elementVideo;
        let btnClose;
    
        if (btnBanners) {
            btnBanners.addEventListener('click', (evt) => {
                elementVideo = evt.target.closest('.banners__wrapper').querySelector('.video');
                btnClose = elementVideo.querySelector('.video__close');
    
                elementVideo.classList.add('video--active');
    
                if (btnClose) {
                    btnClose.addEventListener('click', () => {
                        elementVideo.classList.remove('video--active');
                        this.handlePauseVideo(elementVideo.querySelector('iframe'));
                    });
                }
            });
        }
    
        if (btnImgWithTexts) {
            btnImgWithTexts.forEach(btnImgWithText => {
                btnImgWithText.addEventListener('click', (evt) => {
                    elementVideo = evt.target.closest('.img-with-text__wrapper').querySelector('.video');
                    elementVideo.classList.add('video--active');
        
                    btnClose = elementVideo.querySelector('.video__close');
        
                    if (btnClose) {
                        btnClose.addEventListener('click', () => {
                            elementVideo.classList.remove('video--active');
                            this.handlePauseVideo(elementVideo.querySelector('iframe'));
                        });
                    }
                });
            });
        }
    },
    
    start: function() {
        this.handleClick();
    }
};

// Back To Top
const backToTop = {
    handleBackToTop: function() {
        const btnBackToTop = $('.back-to-top');

        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                btnBackToTop.style.display = "block";
            } else {
                btnBackToTop.style.display = "none";
            }
        };

        btnBackToTop.addEventListener('click', ()=> {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },

    start: function() {
        this.handleBackToTop();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    header.start();
    bannerImg.start();
    backToTop.start();
});