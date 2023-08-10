class Store {
    listProducts;

    constructor() {
        this.listProduct = []
    }

    add(value) {
        this.listProduct.push(value);
    }

    remove(index) {
        this.listProduct.splice(index, 1);
    }

    findAll() {
        return this.listProduct;
    }

    edit(index, value) {
        this.listProduct[index] = value;
    }

    lonhon2000(arr) {
        let mang = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].getprice() > 2000) {
                mang.push(arr[i]);
            }
        }
        return mang;
    }
    search() {

    }
}