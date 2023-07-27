// onclick
function WrongAnswer() {
    alert("Wrong Answer");
    document.getElementById("1").style.backgroundColor="red";
}
function RightAnswer() {
    document.getElementById("image").src="https://ss-images.saostar.vn/w800/pc/1657195113618/saostar-7hvbvde2z3exburk.jpg";
    document.getElementById("text").innerHTML="He is Kaito Kid.";
}
// onchange
function do_change() {
    let selectedValue = document.getElementById("select").value;
    alert(selectedValue);
}
// let selectedElement = document.getElementById("select2");
// selectedElement = addEventListener("change",do_change2)
// function do_change2() {
//     let selectedValue = document.getElementById("select2").value;
//     alert(selectedValue);
// }

// onmouseover onmouseout
var changecolor1 = document.getElementById("mouse2");
changecolor1.addEventListener("mouseover",mouseover);
changecolor1.addEventListener("mouseout",mouseout);
function mouseover() {
    document.getElementById("mouse2").style.color="red";
}
function mouseout() {
    document.getElementById("mouse2").style.color="black";
}