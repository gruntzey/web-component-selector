class grSelector extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.itemsList = []

    this.shadow.addEventListener('click', this.handleBottomClick)

  }

  static get observedAttributes() {
    return ['gr-selector-items', 'gr-selector-current']
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(prop, oldVal, newVal) {

    if (prop === 'gr-selector-items') {
      this.setItemsList(this.items)
      this.render()
    }

    if (prop === 'gr-selector-current') {
      this.render()
    }
  }

  get items() {
    return this.getAttribute('gr-selector-items')
  }

  get currentItem() {
    if (this.getAttribute('gr-selector-current')) {
      return this.getAttribute('gr-selector-current')
    }

    this.setCurrentItem()
    return this.getAttribute('gr-selector-current')
  }

  set currentItem(val) {
    this.setAttribute('gr-selector-current', `${val}`)
  }

  render() {
    this.shadow.textContent = ''

    const style = document.createElement('link')
    style.setAttribute('rel', 'stylesheet')
    style.setAttribute('href', './grSelector/grSelector.css')
    this.shadow.prepend(style)

    const selector = document.createElement('div')
    selector.id = 'selector'
    this.shadow.append(selector)

    const top = document.createElement('div')
    top.id = 'top'
    top.textContent = this.currentItem
    selector.insertAdjacentElement('beforeend', top)

    const bottom = document.createElement('div')
    bottom.id = 'bottom'
    selector.insertAdjacentElement('beforeend', bottom)

    for (let i = 0; i < this.itemsList.length; i++) {
      const text = this.itemsList[i].trim()
      const node = document.createElement('div')
      node.setAttribute('tabindex', `${i+1}`)
      node.classList.add('item')
      node.textContent = text
      bottom.append(node)
    }
  }

  setItemsList(val) {
    this.itemsList = val.split(',')
    this.setCurrentItem()
  }

  setCurrentItem(item) {
    if (item) {
      this.currentItem = item
      return
    }
    
    this.currentItem = this.itemsList[0] || 'There is no items in list'
  }

  handleBottomClick(e) {
    
    if (e.target.closest('.item')) {
      const ctx = document.querySelector('gr-selector')
      ctx.setCurrentItem(e.target.textContent)
    }
  }
}

customElements.define('gr-selector', grSelector)

