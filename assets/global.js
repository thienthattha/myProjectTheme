const $$ = document.querySelector.bind(document);
const $$$ = document.querySelectorAll.bind(document);

// Handle Header
const header = {
    handleclick: function() {
        const menuBtn = $$('.header-drawer__icon');
        
        if (menuBtn) {
            menuBtn.addEventListener('click', ()=> {
                $$('.header-drawer__icon--close').classList.toggle('display-none');
                $$('.header-drawer__icon--humburger').classList.toggle('display-none');
                $$('.header-drawer__list-menu').classList.toggle('header-drawer__list-menu--toggle')
            });
        }

        // Click modal
        $$('.header-search__icon').addEventListener('click', (evt)=> {
            evt.preventDefault();
            $$('.header-search-modal').classList.toggle('header-search-modal--active');
            document.body.style.overflow = 'hidden';
        });

        $$('.header-search-modal__close').addEventListener('click', ()=> {
            $$('.header-search-modal').classList.remove('header-search-modal--active');
            document.body.style.overflow = 'scroll';
        });
    },

    handleRender: function() {
        const hightHeader = $$('.header').clientHeight;
        $$('.header-drawer__list-menu').style.top = `${hightHeader}px`;
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
        const btnBanners = $$('.banners-button');
        const btnImgWithTexts = $$$('.img-with-text-button');
        let elementVideo;
        let btnClose;
    
        if (btnBanners) {
            btnBanners.addEventListener('click', (evt) => {
                evt.preventDefault();
                elementVideo = evt.target.closest('.banners__wrapper').querySelector('.modal-video');
                btnClose = elementVideo.querySelector('.modal-video__content--close');

                elementVideo.classList.add('modal-video--active');
                document.body.style.overflow = 'hidden';

                if (btnClose) {
                    btnClose.addEventListener('click', () => {
                        elementVideo.classList.remove('modal-video--active');
                        document.body.style.overflow = 'scroll';
                        this.handlePauseVideo(elementVideo.querySelector('iframe'));
                    });
                }

                if(elementVideo) {
                    elementVideo.addEventListener('click', () => {
                        elementVideo.classList.remove('modal-video--active');
                        document.body.style.overflow = 'scroll';
                        this.handlePauseVideo(elementVideo.querySelector('iframe'));
                    });
                }
            });
        }
    
        if (btnImgWithTexts) {
            btnImgWithTexts.forEach(btnImgWithText => {
                btnImgWithText.addEventListener('click', (evt) => {
                    elementVideo = evt.target.closest('.img-with-text__wrapper').querySelector('.modal-video');
                    elementVideo.classList.add('modal-video--active');
        
                    btnClose = elementVideo.querySelector('.modal-video__content--close');
                    document.body.style.overflow = 'hidden';

                    if (btnClose) {
                        btnClose.addEventListener('click', () => {
                            elementVideo.classList.remove('modal-video--active');
                            document.body.style.overflow = 'scroll';
                            this.handlePauseVideo(elementVideo.querySelector('iframe'));
                        });
                    }
                    
                    if(elementVideo) {
                        elementVideo.addEventListener("click", ()=> {
                            elementVideo.classList.remove('modal-video--active');
                            document.body.style.overflow = 'scroll';
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

// Handle Featured Collection
const featuredCollection = {
    handelSlideShow: function() {
        $('.slide-show').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            infinite: true,
            dots: true,
            arrows: false,
            responsive: [
                {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    infinite: true,
                    dots: true,
                }
                },
                {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    infinite: true,
                    dots: true
                }
                }
            ]
        });
    },

    start: function() {
        this.handelSlideShow();
    }
};

// Back To Top
const backToTop = {
    handleBackToTop: function() {
        const btnBackToTop = $$('.back-to-top');

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

// Cart
const cart = {
    callApiPOST: function(variantId, quantity) {
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: variantId,
                quantity: quantity
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            location.reload();
        })
        .then(data => {
            window.location.href = `${window.location.origin}/cart`
        })
        .catch(error => {
            console.error('Error', error);
        });
    },

    callApiGET: function() {
        fetch('/cart.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('Cart data:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },

    updateQuantity: function(line, quantity) {
        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                line: line,
                quantity: quantity
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            location.reload();
        })
        .catch((error) => {
            console.log("Error", error);
        });
    },
    

    handleAddToCart: function() {        
        $$$('.add-to-cart').forEach((btn)=> {
            btn.addEventListener('click', (evt)=> {
                evt.preventDefault();
                let variantId = evt.target.getAttribute("data-variant-id");
                this.callApiPOST(variantId,1);
            });
        });
    },

    handleRemove: function() {
        const elementRemoveItem = $$$('.button-remove-item');

        elementRemoveItem.forEach((item)=> {
            item.addEventListener('click', (evt)=> {
                evt.preventDefault();
                const line = evt.target.dataset.index;

                this.updateQuantity(line,0);
            })
        });
    },

    handleChangeQuantity: function() {
        const elementPopover = $$$('.cart-content-item__popover');

        elementPopover.forEach((item)=> {
            const elementMinus = item.querySelector('.cart-content-item__popover--minus');
            const elementPlus = item.querySelector('.cart-content-item__popover--plus');
            const elementInput = item.querySelector('.cart-content-item__popover--input');

            elementMinus.addEventListener('click', (evt)=> {
                evt.preventDefault();
                const line = evt.target.dataset.index;
                const quantity = evt.target.dataset.quantity;

                this.updateQuantity(line, Number(quantity) - 1);
            });

            elementPlus.addEventListener('click', (evt)=> {
                evt.preventDefault();
                const line = evt.target.dataset.index;
                const quantity = evt.target.dataset.quantity;

                this.updateQuantity(line, Number(quantity) + 1);
            });

            elementInput.addEventListener('change', (evt)=> {
                evt.preventDefault();
                elementInput.value = evt.target.value;
                const line = evt.target.dataset.index;
                const quantity = evt.target.value;

                this.updateQuantity(line, quantity);
            })
        });
    },

    start: function() {
        this.handleAddToCart();
        this.handleRemove();
        this.handleChangeQuantity();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    header.start();
    bannerImg.start();
    backToTop.start();
    featuredCollection.start();
    cart.start();
});