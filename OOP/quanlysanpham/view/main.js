let store = new Store();
let array = store.findAll();
showProduct()

// localStorage.setItem("listProduct",JSON.stringify([]));
function showProduct() {

    let str = ''
    for (let i = 0; i < array.length; i++) {
        str += `<tr><td>${array[i].id}</td>
        <td>${array[i].name}</td>
        <td>${array[i].quantity}</td>
        <td>${array[i].price}</td>
        <td><img src="${array[i].img}" alt="Ảnh sản phẩm" style="width: 50px;"></td>
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
    let image = document.getElementById('image').value;
    let product = new Product(id, name, quantity, price, image);
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
    let image = document.getElementById('image2').value;
    let editProduct = new Product(id, name, quantity, price, image);
    store.edit(index, editProduct);
    showProduct();
    document.getElementById('form-edit').innerHTML = '';
}

function search() {
    let name_product = prompt("Nhập tên sản phẩm cần tìm:");
    let str = '';
    for (let i = 0; i < array.length; i++) {
        if (store.search(i, name_product) !== -1) {
            str += `<tr><td>${array[i].id}</td>
                    <td>${array[i].name}</td>
                    <td>${array[i].quantity}</td>
                    <td>${array[i].price}</td>
                    <td><img src="${array[i].img}" alt=""></td>
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
                <td><input type="number" value="${array[index].id}" id="id2"></td>
            </tr>
            <tr>
                <td>Name:</td>
                <td><input type="text" value="${array[index].name}" id="name2"></td>
            </tr>
            <tr>
                <td>Quantity:</td>
                <td><input type="number" value="${array[index].quantity}" id="quantity2"></td>

            </tr>
            <tr>
                <td>Price:</td>
                <td><input type="number" value="${array[index].price}" id="price2"></td>
            </tr>
            <tr>
            <td>Image:</td>
            
            <td><img src="${array[index].img}" alt="" style="width: 50px">
            <input type="text" value="${array[index].img}" id="image2"></td>
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
            <td>Image: </td>
            <td><input type="text" id="image"></td>
</tr>
            <tr>
                <th colspan="2">
                    <button onclick="add()">Add</button>
                </th>
            </tr>
        </table>`;
}


class Car {
    speed;
    mark;
    price;
    constructor(speedIn, markIn, priceIn) {
        this.speed = speedIn;
        this.mark = markIn;
        this.price = priceIn;
    }
    setSpeed(speedIn) {
        this.speed = speedIn;
    }
    setMark(markIn) {
        this.mark = markIn;
    }
    setPrice(priceIn) {
        this.price = priceIn;
    }
    getSpeed () {
        return this.speed;
    }
    getMark() {
        return this.mark;
    }
    getPrice() {
        return this.price;
    }
    showAll() {
        return `This is a ${this.mark} having a speed of ${this.speed} km/h
       `;
    }
}
pr

function main() {
    // Khởi tạo một đối tượng và gán vào car1
    let car1 = new Car(200, 'Mercedes', 40000);
    // Truy xuất giá trị của thuộc tính
    alert(car1.mark);   // Mercedes
    // hoặc
    alert(car1.getMark());  // Mercedes
    // Thay đổi giá trị của một thuộc tính
    car1.setMark('Porsche');
    alert(car1.getMark());  // Porsche
}


