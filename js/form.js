const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
const search=()=>{
  const searchbox=document.getElementById("search-item").value.toUpperCase();
  const storeitems=document.getElementById("product-list");
  const product=document.querySelectorAll(".product");
  const pname=storeitems.getElementsByTagName("h2");

  for(var i=0; i<pname.length;i++){
    let match=product[i].getElementsByTagName('h2')[0];
    if(match){
      let textvalue= match.textContent || match.innerHTML
      if(textvalue.toUpperCase().indexOf(searchbox)>-1){
        product[i].style.display="";
      }else{
        product[i].style.display="none";
      }
    }
  }
}
function App(){
  return{
    
  };
}
// form loading animation

const form = [...document.querySelector('.form').children];

form.forEach((item, i) => {
    setTimeout(() => {
        item.style.opacity = 1;
    }, i*100);
})

window.onload = () => {
    if(sessionStorage.name){
        location.href = '/';
    }
}

// form validation

const name = document.querySelector('.name') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');

if(name == null){ // means login page is open
    submitBtn.addEventListener('click', () => {
        fetch('/login-user',{
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
    })
} else{ // means register page is open

    submitBtn.addEventListener('click', () => {
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            validateData(data);
        })
    })

}

const validateData = (data) => {
    if(!data.name){
        alertBox(data);
    } else{
        sessionStorage.name = data.name;
        sessionStorage.email = data.email;
        location.href = '/';
    }
}

const alertBox = (data) => {
    const alertContainer = document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert');
    alertMsg.innerHTML = data;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
        alertContainer.style.top = null;
    }, 5000);
}
// Cart
let cart =document.querySelector('.cart');
let cartAdd = document.querySelect('.cart-add');
let cartRemove = document.querySelect('.cart-remove');
let cartIcon = document.querySelector('.cart-icon');

cartIcon.onclick = () => {
    cart.classList.add('active');
}
// Cart Working
if (document.readyState=="loading") {
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

// making function
function ready() {
    var removeCartButtons=document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0; i<removeCartButtons.length;i++){
        removeCartButtons[i].addEventListener("click",removeCartItem);
    }
    //quantity Changes
    var quantityInputs=document.getElementsByClassName("cart-quantity");
    for ( var i=0; i<quantityInputs.length; i++){
        quantityInputs[i].addEventListener("change",updateTotal);
    }
}
//Remove items from cart
function removeCartItem(e) {
    var buttonClicked =e.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}
//Quantity Changes
function quantityChanged(e){
    var input=e.target
    if(isNaN(input.value) || input.value<=0){
        input.value=1;
    }
    updateTotal();
}
//Update Total
function updateTotal() {
    let total = 0;
    let cartItems = document.getElementById('.cart-content')[0];
    var cartBoxes = cartContent.getElwmentsByClassName('cart-box');
    for (var i=0 ; i<cartBoxes.length; i++) {
        var cartBox=cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price= parseFloat (priceElement.innerText.replace("₹",""));
        var quantity = quantityElement.value;
        total=total +(price*quantity);

        document.getElementsByClassName("total-price")[0].innerHTML='₹'+total;
    }
}