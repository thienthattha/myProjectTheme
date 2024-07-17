class ModalSnippets extends HTMLElement {
    constructor() {
        super();

        this.elementClose = this.querySelector('.modal-snippets__close');
        this.elementOnClick = this.closest('.parent-click').querySelector('.on-click');

        this.elementClose.addEventListener('click', this.handleClose.bind(this));
        this.elementOnClick.addEventListener('click', this.handleClick.bind(this));
    }

    handleClose() {
        this.classList.remove('modal-snippets--active');
        document.body.style.overflow = 'scroll';
    }

    handleClick() {
        this.classList.add('modal-snippets--active');
        document.body.style.overflow = 'hidden'
    }
}

customElements.define('modal-snippets', ModalSnippets);


