class Store {
    listProduct;

    constructor() {
        this.listProduct = JSON.parse(localStorage.getItem('listProduct'));
    }

    add(value) {
        this.listProduct.push(value);
        localStorage.setItem('listProduct', JSON.stringify(this.listProduct));
    }

    remove(index) {
        this.listProduct.splice(index, 1);
        localStorage.setItem('listProduct', JSON.stringify(this.listProduct))
    }

    findAll() {
        this.listProduct = JSON.parse(localStorage.getItem('listProduct'));
        return this.listProduct;
    }

    edit(index, value) {
        this.listProduct[index] = value;
        localStorage.setItem('listProduct', JSON.stringify(this.listProduct))
    }

    search(index, value) {
        let valueIndex = this.listProduct[index].name.toLowerCase().indexOf(value.toLowerCase());
        return valueIndex;
    }
}