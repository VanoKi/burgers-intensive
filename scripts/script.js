// document.getElementsByClassName('main-title')[0].style.color = "red";

document.getElementById('main-action-btn').onclick = function () {
    document.getElementById('products').scrollIntoView({behavior:'smooth'});
}

let links = document.querySelectorAll('.menu-item > a');
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute('data-link'))
            .scrollIntoView({behavior:'smooth'});
    }
}

let btns = document.getElementsByClassName('product-button');
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
        document.getElementById('order')
            .scrollIntoView({behavior:'smooth'});
    }
}

let burger = document.getElementById('burger');
let name = document.getElementById('name');
let phone = document.getElementById('phone');
document.getElementById('order-action').onclick = function () {
    let hasError = false;
    [burger, name, phone].forEach(item => {
        if (!item.value) {
            item.parentElement.style.background = 'red';
            hasError = true;
        } else {
            item.parentElement.style.background = '';
        }
    });

    if (!hasError) {
        [burger, name, phone].forEach(item => {
            item.value = ''
        });
        alert("Thanks for your order! We'll call you soon");
    }

}