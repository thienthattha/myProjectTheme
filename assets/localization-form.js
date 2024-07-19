class LocalizationForm extends HTMLElement {
    constructor() {
      super();
      this.elements = {
        input: this.querySelector('input[name="country_code"]'),
        button: this.querySelector('button'),
        panel: this.querySelector('ul'),
      };
      this.elements.button.addEventListener('click', this.openSelector.bind(this));
      this.elements.button.addEventListener('focusout', this.closeSelector.bind(this));
      this.addEventListener('keyup', this.onContainerKeyUp.bind(this));
  
      this.querySelectorAll('a').forEach(item => item.addEventListener('click', this.onItemClick.bind(this)));
    }
  
    hidePanel() {
      this.elements.button.setAttribute('aria-expanded', 'false');
      this.elements.panel.setAttribute('hidden', true);
    }
  
    onContainerKeyUp(event) {
      if (event.code.toUpperCase() !== 'ESCAPE') return;
  
      this.hidePanel();
      this.elements.button.focus();
    }
  
    onItemClick(event) {
      const form = this.querySelector('form');
      this.elements.input.value = event.currentTarget.dataset.value;
      if (form) form.submit();
    }
  
    openSelector() {
        this.elements.button.focus();
        this.elements.panel.classList.toggle('header-task__disclosure--toggle');
        this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());
    }
  
    closeSelector(event) {
      const shouldClose = event.relatedTarget && event.relatedTarget.nodeName === 'BUTTON';
      if (event.relatedTarget === null || shouldClose) {
        this.hidePanel();
      }
    }
  }
  
  customElements.define('localization-form', LocalizationForm);