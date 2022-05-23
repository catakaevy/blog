const myHeading = document.querySelector('h1');
myHeading.textContent = 'Hello world!';

let myVariable = "Cataka";
let my2ndimage = document.querySelector('img');

my2ndimage.onclick = function(){
    let mySrc = my2ndimage.getAttribute('src');
    if (mySrc === 'images/ハニワ.png'){
        my2ndimage.setAttribute('src', 'images/ぶどう.png')
    } else {
        my2ndimage.setAttribute('src','images/ハニワ.png')
    }
}
/*
all data types use let
String
Number
Boolean
Array
Object
*/