class Product {
    id;
    name;
    quality;
    price;

    constructor(id, name, quality, price) {
        this.id = id;
        this.name = name;
        this.quality = quality;
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

    getquality() {
        return this.quality;
    }

    setquality(value) {
        this.quality = value;
    }

    getprice() {
        return this.price;
    }

    setprice(value) {
        this.price = value;
    }
}