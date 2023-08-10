let store = new Store();
let p1 = new Product(1, 'pen', 34, 50);
let p2 = new Product(2, 'pencil', 42, 30222);
let p3 = new Product(3, 'comic', 15, 80);
let p4 = new Product(4, 'ruler', 10, 10000);
store.add(p1);
store.add(p2);
store.add(p3);
store.add(p4);
let array = store.findAll();
showProduct()
// function main3() {
//

//     showProduct();
// }
//
// main3();

function showProduct() {

    let str = ''
    for (let i = 0; i < array.length; i++) {
        str += `<tr><td>${array[i].getid()}</td>
        <td>${array[i].getname()}</td>
        <td>${array[i].getquantity()}</td>
        <td>${array[i].getprice()}</td>
        <td><button style="background-color: rgba(255,0,0,0.66)" onclick="remove(${i})">Remove</button></td>
        <td><button style="background-color: rgba(0,0,255,0.38)" onclick="showFormEdit(${i})">Edit</button></td></tr>`
    }
    document.getElementById('result').innerHTML = str;
}

function remove(index) {
    let isconfirm = confirm('Ban co muon xoa khong?');
    if (isconfirm) {
        store.remove(index);
        showProduct();
    }
}

function add() {
    let id = +document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let quantity = +document.getElementById('quantity').value;
    let price = +document.getElementById('price').value;
    let product = new Product(id, name, quantity, price)
    store.add(product);
    console.log(store)
    showProduct();
    document.getElementById('form-add').innerHTML = '';
}

function edit(index) {
    let id = +document.getElementById('id2').value;
    let name = document.getElementById('name2').value;
    let quantity = +document.getElementById('quantity2').value;
    let price = +document.getElementById('price2').value;
    let editProduct = new Product(id, name, quantity, price)
    store.edit(index, editProduct);
    showProduct();
}

function search() {
    let name_product = prompt("Nhập tên sản phẩm cần tìm:");
    let str = '';
    for (let i = 0; i < array.length; i++) {
        if (array[i].getname().toLowerCase().indexOf(name_product.toLowerCase()) !== -1) {
            str += `<tr><td>${array[i].getid()}</td>
                    <td>${array[i].getname()}</td>
                    <td>${array[i].getquantity()}</td>
                    <td>${array[i].getprice()}</td>
                    <td><button style="background-color: rgba(255,0,0,0.66)" onclick="remove(${i})">Remove</button></td>
                    <td><button style="background-color: rgba(0,0,255,0.38)" onclick="showFormEdit(${i})">Edit</button></td></tr>`
        }
    }
    document.getElementById('result').innerHTML = str;
}

function showFormEdit(index) {
    document.getElementById('form-edit').innerHTML = `
    <h1>Edit product</h1>
          <table style="border: 1px solid black">
            <tr>
                <td>Id:</td>
                <td><input type="number" value="${array[index].getid()}" id="id2"></td>
            </tr>
            <tr>
                <td>Name:</td>
                <td><input type="text" value="${array[index].getname()}" id="name2"></td>
            </tr>
            <tr>
                <td>Quantity:</td>
                <td><input type="number" value="${array[index].getquantity()}" id="quantity2"></td>

            </tr>
            <tr>
                <td>Price:</td>
                <td><input type="number" value="${array[index].getprice()}" id="price2"></td>
            </tr>
            <tr>
                <th colspan="2">
                    <button onclick="edit(${index})">Submit</button>
                </th>
            </tr>
        </table>`;
}

function showFormAdd() {
    document.getElementById('form-add').innerHTML = `
            <h1>Add product</h1>
        <table style="border: 1px solid black">
            <tr>
                <td>Id:</td>
                <td><input type="number"  id="id"></td>
            </tr>
            <tr>
                <td>Name:</td>
                <td><input type="text" id="name"</td>
            </tr>
            <tr>
                <td>Quantity:</td>
                <td><input type="number" id="quantity"></td>

            </tr>
            <tr>
                <td>Price:</td>
                <td><input type="number" id="price"></td>
            </tr>
            <tr>
                <th colspan="2">
                    <button onclick="add()">Add</button>
                </th>
            </tr>
        </table>`;
}
