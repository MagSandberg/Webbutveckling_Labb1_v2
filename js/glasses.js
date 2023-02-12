class Product {
    constructor(id, title, img, price, qty) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.price = price;
        this.qty = qty;
    }
};

const products = [];
const productsGlasses = document.querySelector('#productsGlasses');

const cart = [];
const cartList = document.querySelector('#cartList');

const cartModalBody = document.createElement('div');
cartModalBody.id = "cartModalBody";

products.push(
    new Product("1", "VSNVG Visionary", "../img/glasses/glasses_1.webp", "49", "1"),
    new Product("2", "VSNVG Optix", "../img/glasses/glasses_2.webp", "129", "1"),
    new Product("3", "VSNVG Eclipse", "../img/glasses/glasses_3.webp", "99", "1"),
    new Product("4", "VSNVG Flare", "../img/glasses/glasses_4.webp", "89", "1"),
    new Product("5", "VSNVG Mirador", "../img/glasses/glasses_5.webp", "79", "1"),
    new Product("6", "VSNVG Illuminate", "../img/glasses/glasses_6.webp", "109", "1")
    );

let cartBadge = document.querySelector("#cartBadge");
cartBadge.classList.add("hide");
cartBadge.innerText = 0;
    
let modalId = 1;
let productIndex = 0;
let currentId = 0;
let qty = 1;

createProducts();
getCart();

function getProducts() {
    const cartModalBody = document.getElementById("cartModalBody");
    cartModalBody.replaceChildren();

    cart.forEach(product => {

        const cartModalWrapper = document.createElement('div');
        const cartModalTitle = document.createElement('div');
        const cartModalImage = document.createElement('img');
        const cartModalPrice = document.createElement('div');
        const cartModalQty = document.createElement('div');
        const cartModalSpacer = document.createElement('hr');
        const cartButtonIncrease = document.createElement('button');
        const cartButtonDecrease = document.createElement('button');
        const cartButtonRemove = document.createElement('button');

        cartButtonIncrease.addEventListener("click", () => {increaseQty(cartModalQty, cartModalPrice, product)});
        cartButtonDecrease.addEventListener("click", () => {decreaseQty(cartModalQty, cartModalPrice, product)});
        cartButtonRemove.addEventListener("click", () => {removeProduct(product)});

        cartModalTitle.classList.add("product-title");
        cartModalWrapper.classList.add("cart-modal-text");
        cartButtonIncrease.classList.add("btn", "btn-dark", "text-light");
        cartButtonDecrease.classList.add("btn", "btn-secondary", "text-light");
        cartButtonRemove.classList.add("btn", "btn-warning", "text-light");

        cartModalTitle.innerText = product.title;
        cartModalImage.src = product.img;
        cartModalImage.alt = "Glasses";
        cartModalPrice.innerText = "$ " + product.price;
        cartModalQty.innerText = "Qty: " + product.qty;
        cartModalQty.id = product.id;
        cartButtonIncrease.type = "button";
        cartButtonIncrease.innerText = "+";
        cartButtonDecrease.type = "button";
        cartButtonDecrease.id = product.id
        cartButtonDecrease.innerText = "-";
        cartButtonRemove.innerHTML = '<i class="fa fa-trash text-dark" aria-hidden="true"></i>';

        cartModalWrapper.append(
            cartModalTitle,
            cartModalImage,
            cartModalPrice,
            cartModalQty,
            cartButtonIncrease,
            cartButtonDecrease,
            cartButtonRemove,
            cartModalSpacer
        );
        cartModalBody.appendChild(cartModalWrapper);
    });
};

function removeProduct(prod) {
   let amount = 0;

   cart.splice(cart.findIndex(p =>{ if ( p.id == prod.id )
        {
            amount = Number.parseInt(p.qty);
            return;
        }
    }), 1);

   getProducts();
   updateCartBadge(false, amount);
};

function increaseQty(cartModalQty ,cartModalPrice, prod){
    let price = 0;

    products.forEach(product =>{
        if (product.id == prod.id) {
                 price = Number.parseInt(product.price);
                 return;
        }
    });

    prod.qty++;
    cartModalQty.innerText = "Qty: " + prod.qty;
    prod.price = price * prod.qty;
    cartModalPrice.innerText = "$ " + prod.price;
    
    updateCartBadge(true);
};



function decreaseQty(cartModalQty ,cartModalPrice,prod){
    let price = 0;

    products.forEach(product => {
        if (prod.id === product.id) {
            price = Number.parseInt(product.price);
            return;
        }
    });

    if (Number.parseInt(prod.qty) !== 0) {
        prod.qty--;
        updateCartBadge();
    }
    
    cartModalQty.innerText = "Qty: " + prod.qty;
    prod.price = price * prod.qty;
    cartModalPrice.innerText = "$ " + prod.price;
};

function createProducts(){
    for (const item of products) {
        //Skapa element
        const image = document.createElement('img');
        const modal = document.createElement('div');
        const modalDialog = document.createElement('div');
        const modalContent = document.createElement('div');
        const modalHeader = document.createElement('div');
        const title = document.createElement('h1');
        const buttonX = document.createElement('button');
        const modalBody = document.createElement('div');
        const imageModal = document.createElement('img');
        const priceModal = document.createElement('div');
        const modalFooter = document.createElement('div');
        const buttonAdd = document.createElement('button');
        const buttonClose = document.createElement('button');

        // //Styla element
        image.classList.add("cover");
        modal.classList.add("modal", "fade");
        modalDialog.classList.add("modal-dialog", "modal-dialog-centered");
        modalContent.classList.add("modal-content");
        modalHeader.classList.add("modal-header");
        title.classList.add("modal-title", "fs-5");
        priceModal.classList.add("product-price-modal");
        buttonX.classList.add("btn-close");
        modalBody.classList.add("modal-body");
        modalFooter.classList.add("modal-footer");
        buttonAdd.classList.add("btn", "btn-dark");
        buttonClose.classList.add("btn", "btn-secondary");

        // //Innehåll i element
        image.src = item.img;
        image.alt = item.title;
        image.setAttribute("data-bs-toggle", "modal");
        image.setAttribute("data-bs-target", "#prod-" + modalId);

        modal.id = "prod-" + modalId;
        modal.tabIndex = "-1";
        modal.ariaLabel = "prod-" + modalId;
        modal.ariaHidden = true;

        title.id ="modal-label";
        title.innerText = item.title;

        buttonX.type = "button";
        buttonX.setAttribute("data-bs-dismiss", "modal");
        buttonX.ariaLabel = "Close";

        imageModal.src = item.img;
        imageModal.id = item.id
        imageModal.alt = item.title;

        priceModal.innerText = "$ " + item.price;

        buttonAdd.type = "button";
        buttonAdd.innerText = "Add to cart";

        buttonClose.type = "button";
        buttonClose.setAttribute("data-bs-dismiss", "modal");
        buttonClose.innerText = "Close";


          // //Lägg till element i DOM
          modal.append(modalDialog);
          modalDialog.append(modalContent);
          modalContent.append(modalHeader, modalBody, modalFooter);
          modalHeader.append(title, buttonX);
          modalBody.append(imageModal);
          modalFooter.append(priceModal, buttonAdd, buttonClose);
          productsGlasses.append(image, modal);

          modalId++;

        //Sätta upp event på element
        buttonAdd.addEventListener("click" , () => {
            let product = products.find(i => i.id === imageModal.id);
            console.log(product);

            if (cart.find(i => i.id === imageModal.id)) {
                console.log("Produkt finns");
            }
            else {
                cart.push(new Product(product.id, product.title, product.img, product.price, product.qty));
                updateCartBadge(true);
            }});
        }

}
function updateCartBadge(more = false, totalAmount) {
    if (cart.length === 0) {
        cartBadge.classList.add('hide');
        cartBadge.innerText = cart.length;
    }else
    {
        cartBadge.classList.remove("hide");
    }
    
    let cartBadgeqty = 0;

    if (cartBadge.innerText != "" && !cartBadge.innerText.includes("-")) {
        cartBadgeqty = Number.parseInt(cartBadge.innerText);
    }
        if (more) {

        cartBadgeqty++;

        }
        else {
            console.log("totalAmount", totalAmount);
            if (totalAmount) {
                cartBadgeqty =  cartBadgeqty - totalAmount;
                totalAmount = 0;
            }else {
                cartBadgeqty--;
            }


        }
    cartBadge.innerText = cartBadgeqty;

    if (cartBadgeqty === 0) {
        cartBadge.classList.add('hide');
    }


}
function getCart() {

    //Skapa element till cart
    const cartModal = document.createElement('div');
    const cartModalDialog = document.createElement('div');
    const cartModalContent = document.createElement('div');
    const cartModalHeader = document.createElement('div');
    const cartModalTitle = document.createElement('h2');
    const cartButtonX = document.createElement('button');

    //Styla element
    cartModal.classList.add("modal", "fade");
    cartModalDialog.classList.add("modal-dialog", "modal-dialog-centered");
    cartModalContent.classList.add("modal-content");
    cartModalHeader.classList.add("modal-header", "bg-light");
    cartModalTitle.classList.add("modal-title", "fs-5");
    cartButtonX.classList.add("btn-close");
    cartModalBody.classList.add("modal-body");

    //Innehåll i element
    cartModal.id = "cart";
    cartModal.tabIndex = "-1";
    cartModal.ariaLabel = "cart";
    cartModal.ariaHidden = true;

    cartModalTitle.id = "modal-label-cart";
    cartModalTitle.innerText = "Your cart";

    cartButtonX.type = "button";
    cartButtonX.setAttribute("data-bs-dismiss", "modal");
    cartButtonX.ariaLabel = "Close";

    const cartEmpty = "Too much sun, buy some shades!";

    //Lägg till i DOM
    if (cart.length === 0) {
        cartModal.append(cartModalDialog);
        cartModalDialog.append(cartModalContent);
        cartModalContent.append(cartModalHeader, cartModalBody);
        cartModalHeader.append(cartModalTitle, cartButtonX);
        // cartModalBody.append(cartEmpty);
        cartList.append(cartModal);
    }

}