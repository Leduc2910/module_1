// class Student {
//     name;
//     age;
//
//     constructor(nameInput, ageInput) {
//         this.name = nameInput;
//         this.age = ageInput;
//     }
//     // getName() {             // phương thức getter lấy ra dữ liệu
//     //     return this.name;
//     // }
//     setName(nameInput) {       //  phương thức setter : sửa dữ liệu
//         this.name = nameInput;
//     }
// }
// let sinhvien = new Student("Dan", 20);
// alert(sinhvien.name);

//
// // bai 3:
// class Student {
//     name;
//     age;
//     mark;
//
//     constructor(name, age, mark) {
//         this.name = name;
//         this.age = age;
//         this.mark = mark;
//     }
//
//     setName(name) {
//         this.name = name;
//     }
//
//     setAge(age) {
//         this.age = age;
//     }
//
//     setMark(mark) {
//         this.mark = mark;
//     }
//
//     getName() {
//         return this.name;
//     }
//
//     getAge() {
//         return this.age;
//     }
//
//     getMark() {
//         return this.mark;
//     }
//
//     sumAverage(mark) {
//         let sum = 0;
//         for (let i = 0; i < this.mark.length; i++) {
//             sum += this.mark[i];
//         }
//         return sum / this.mark.length;
//     }
// }
//
//
//
// function main() {
//     let sinhvien1 = new Student('Đức', 20, [5, 6, 7]);
//     let sinhvien2 = new Student('Lộc', 19, [8, 8, 9]);
//
//     let marksv1 = sinhvien1.getMark();
//     let marksv2 = sinhvien2.getMark();
//     if (sinhvien1.sumAverage(marksv1) > sinhvien2.sumAverage(marksv2)) {
//         alert("Sinh viên 1 có điểm trung bình cao hơn");
//     } else if (sinhvien1.sumAverage(marksv1) < sinhvien2.sumAverage(marksv2)) {
//         alert("Sinh viên 2 có điểm trung bình cao hơn");
//     } else {
//         alert("Điểm trung bình 2 sinh viên bằng nhau");
//     }
// }
// main();


// bai 1
// class Rectangle {
//     length;
//     width;
//
//     constructor(length, width) {
//         this.length = length;
//         this.width = width;
//     }
//
//     getArea() {
//         return this.length * this.width;
//     }
//
//     getPremeter() {
//         return (this.length + this.width) * 2;
//     }
//
//     getInfo() {
//         return this.length + ' - ' + this.width;
//     }
//
//     setLength(length) {
//         this.length = length;
//     }
//
//     setWidth(width) {
//         this.width = width;
//     }
// }
//
// function main() {
//     let hcn = new Rectangle(5, 4);
//     hcn.setLength(6);
//     alert(hcn.getInfo());
//     alert('Diện tích HCN = ' + hcn.getArea());
//     alert('Chu vi HCN = ' + hcn.getPremeter());
// }
//
// main()



// Xây dựng lớp mô tả Temperature
class Temperature {
    tempo;
    constructor(tempo) {
        this.tempo = tempo;
    }
    exchangeToF() {
        return this.tempo*9/5+32;
    }
    exchangeToK() {
        return this.tempo+273;
    }
    setTempo(tempo) {
        this.tempo = tempo
    }
}
function main() {
    let nhietdo = new Temperature(50);
    nhietdo.setTempo(25);
    alert("Độ F = "+nhietdo.exchangeToF());
    alert("Độ K = "+nhietdo.exchangeToK());
}
main();
