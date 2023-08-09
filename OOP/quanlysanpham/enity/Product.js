class Product {
    id;
    name;
    quantity;
    price;

    constructor(id, name, quantity, price) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    getid() {
        return this.id;
    }

    setid(value) {
        this.id = value;
    }

    getname() {
        return this.name;
    }

    setname(value) {
        this.name = value;
    }

    getquantity() {
        return this.quantity;
    }

    setquantity(value) {
        this.quantity = value;
    }

    getprice() {
        return this.price;
    }

    setprice(value) {
        this.price = value;
    }
}