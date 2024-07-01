// console.log("aa")
// class CustomHeader extends HTMLElement {
//     constructor() {
//         super();

//         this.humburgerBtn = this.querySelector('.humburger');
//         this.hamburgerBtn.addEventListener('click', this.onButtonClick.bind(this));

//         console.log(this)
//     }

//     onButtonClick(evt) {
//         evt.preventDefault();
//         console.log("1111111")
//     };
// };

// customElements.define('custom-header', CustomHeader);

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = {
    handleclick: function() {
        const menuBtn = $('.header-drawer__icon');
        
        if (menuBtn) {
            menuBtn.addEventListener('click', function() {
                $('.header-drawer__icon--close').classList.toggle('display-none');
                $('.header-drawer__icon--humburger').classList.toggle('display-none');
                $('.header-drawer__list-menu').classList.toggle('header-drawer__list-menu--toggle')
            });
        }
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

document.addEventListener('DOMContentLoaded', function() {
    header.start();
});