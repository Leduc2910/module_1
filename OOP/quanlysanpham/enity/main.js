let store = new Store();
function main3() {

    let p1 = new Product(1, 'book', 'new', 100);
    let p2 = new Product(2, 'pen', 'old', 50);
    let p3 = new Product(3, 'pencil', 'old', 30222);
    let p4 = new Product(4, 'comic', 'new', 80);
    let p5 = new Product(5, 'ruler', 'new', 10000);
    store.add(p1);
    store.add(p2);
    store.add(p3);
    store.add(p4);
    store.add(p5);
    let array = store.findAll();
    showProduct(array);
    // mang.remove(3);
    // showProduct(array);
    // let sua = new Product(5, 'khongnghira', 'like-new', 10000);
    // mang.edit(3, sua);
    // showProduct(array);
    showProduct(store.lonhon2000(array));
}

function showProduct(array) {
    let str = ''
    str += `<table border="1" cellpadding="5"><td>STT</td>
<td>Name</td>
<td>Quality</td>
<td>Price</td>`
    for (let i = 0; i < array.length; i++) {
        str += `<tr><td>${array[i].getid()}</td>
        <td>${array[i].getname()}</td>
        <td>${array[i].getquality()}</td>
        <td>${array[i].getprice()}</td></tr>`
    }
    str += `</table>`
    document.getElementById('result').innerHTML = str;
}

main3();