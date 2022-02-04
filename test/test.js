class ProductPicker {
  constructor(selectEls) {
    // get allowed columns to be rendered on the page
    let allowedColumns = getComputedStyle(document.querySelector('.channel-compare-3a4h5s6d')).getPropertyValue('--columns');
    allowedColumns = parseInt(allowedColumns);


    let order = [];
    this.selectEls = selectEls

    //populates columns in each row
    this.columns = this.getColumns(this.selectEls[0]);

    this.selectEls.forEach((select, index)=>{
      select.onchange = ()=>{
        let selectedProductIndex = parseInt(select.selectedOptions[0].value);

        let existingPos = order.slice(0, allowedColumns).indexOf(selectedProductIndex);
        if (existingPos > -1) {
          let swapValue =  order[index];
          this.update(existingPos, swapValue, order[existingPos]);
          order[existingPos] = swapValue;
        }

        this.update(index, selectedProductIndex, order[index]);
        order[index] = selectedProductIndex;
      }

      let option = select.querySelector('[aria-selected ="true"]');
      select.selectedIndex = Array.from(select.options).indexOf(option);
      option.setAttribute('selected', 'true');

      let selectedOptions = select.selectedOptions;
      order.push(parseInt(selectedOptions[0].value));
    });

  }
  update(current, nextProductIndex, currentProductIndex) {
    let columnClass = `compare-column-${current}-3a4h5s6d`;
    let currentOptionIndex = this.getOptionIndexByValue(currentProductIndex);
    let nextOptionIndex = this.getOptionIndexByValue(nextProductIndex);
    this.selectEls[current].selectedIndex = nextOptionIndex;

    let currentColumns = this.getColumnsByProductIndex(currentProductIndex);
    let nextColumns = this.getColumnsByProductIndex(nextProductIndex);
    currentColumns.forEach((el, index)=>{
      el.classList.remove(`${columnClass}`);
      nextColumns[index].classList.add(columnClass);
    });


    this.selectEls[current].options[currentOptionIndex].removeAttribute('aria-selected');
    this.selectEls[current].options[currentOptionIndex].removeAttribute('selected');

    this.selectEls[current].options[nextOptionIndex].setAttribute('aria-selected', 'true');
    this.selectEls[current].options[nextOptionIndex].setAttribute('selected', 'true');
  }
  getOptionIndexByValue(value) {
    return this.valueIndexMap[value];
  }
  getColumnsByProductIndex(productIndex) {
    return this.columns[productIndex];
  }
  getColumns(parent) {
    let columns = [];
    this.valueIndexMap = {}
    parent.querySelectorAll('option').forEach((option, domOrder)=>{
      let productIndex = option.value;
      this.valueIndexMap[productIndex] = domOrder;
      columns[productIndex] = document.querySelectorAll(`.product-${productIndex}-3a4h5s6d`);
    });
    return columns;
  }

  destroy(){
    this.selectEls.forEach((select, index)=> {
      select.onchange = null
    })
    this.selectEls = null
  }
}

if(typeof module === 'object' && module.exports) {
  module.exports = ProductPicker
} else {
  new ProductPicker(document.querySelectorAll('.selector-dropdown-3a4h5s6d'));
}
