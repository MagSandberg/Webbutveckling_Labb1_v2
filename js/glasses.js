class Product {
    constructor(id, title, img, price, qty) {
        this.id = id;
        this.title = title;
        this.img = img;
        this.price = price;
        this.qty = qty;
    }
}

const products = [];
const productsGlasses = document.querySelector('#productsGlasses');

const cart = [];
const cartList = document.querySelector('#cartList');

products.push(
    new Product("1", "VSNVG Visionary", "../img/glasses/glasses_1.jpg", "$49", "1"),
    new Product("2", "VSNVG Optix", "../img/glasses/glasses_2.jpg", "$129", "1"),
    new Product("3", "VSNVG Eclipse", "../img/glasses/glasses_3.jpg", "$99", "1"),
    new Product("4", "VSNVG Flare", "../img/glasses/glasses_4.jpg", "$89", "1"),
    new Product("5", "VSNVG Mirador", "../img/glasses/glasses_5.jpg", "$79", "1"),
    new Product("6", "VSNVG Illuminate", "../img/glasses/glasses_6.jpg", "$109", "1")
    );
console.log(products);

//Skapa element till cart
    const cartModal = document.createElement('div');
    const cartModalDialog = document.createElement('div');
    const cartModalContent = document.createElement('div');
    const cartModalHeader = document.createElement('div');
    const cartModalTitle = document.createElement('h1');
    const cartButtonX = document.createElement('button');
    const cartModalBody = document.createElement('div');
    const cartModalBodyHeader = document.createElement('div');
    const cartModalBodyImage = document.createElement('img');
    const cartModalBodyFooter = document.createElement('div');
    const cartModalBodyFooterPrice = document.createElement('div');
    const cartModalBodyFooterButtons = document.createElement('div');
    const cartModalButtonIncQty = document.createElement('button');
    const cartModalButtonDecQty = document.createElement('button');
    const cartModalBodyFooterQty = document.createElement('div');

let modalId = 1;
let productIndex = 0;
let currentId = 0;
let qty = 1;

getProducts();

function getProducts() {

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
        
            //Styla element
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
        
            //Innehåll i element
            image.src = item.img;
            image.alt = "";
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
            imageModal.alt = "";

            priceModal.innerText = item.price;

            buttonAdd.type = "button";
            buttonAdd.innerText = "Add to cart";

            buttonClose.type = "button";
            buttonClose.setAttribute("data-bs-dismiss", "modal");
            buttonClose.innerText = "Close";

            //Sätta upp event på element
            buttonAdd.onclick = () => {
                let product = products.find(i => i.id === imageModal.id);
                console.log(product);

                if (cart.find(i => i.id === imageModal.id)) {
                    console.log("Produkt finns");
                }
                else {
                    currentId = product.id;
                    console.log(currentId);
                    cart.push(product);
                    productIndex = cart.indexOf(product);
                    console.log(productIndex);
                    
                    let newCartModalBody = cartModalBody.cloneNode(true);
                    cartModalBody.insertAdjacentElement("afterend", newCartModalBody);
                }
                console.log(cart);

                getCart();

            };
        
            //Lägg till element i DOM
            modal.append(modalDialog);
            modalDialog.append(modalContent);
            modalContent.append(modalHeader, modalBody, modalFooter);
            modalHeader.append(title, buttonX);
            modalBody.append(imageModal);
            modalFooter.append(priceModal, buttonAdd, buttonClose);
            productsGlasses.append(image, modal);
            
            modalId++;
        }
}

function getCart() {
    //Styla element
    cartModal.classList.add("modal", "fade");
    cartModalDialog.classList.add("modal-dialog", "modal-dialog-centered");
    cartModalContent.classList.add("modal-content");
    cartModalHeader.classList.add("modal-header", "bg-light");
    cartModalTitle.classList.add("modal-title", "fs-5");
    cartButtonX.classList.add("btn-close");
    cartModalBody.classList.add("modal-body");
    cartModalBodyHeader.classList.add("product-title", "bg-dark", "text-light");
    cartModalBodyImage.classList.add("cover");
    cartModalBodyFooter.classList.add("products-bottom", "bg-dark", "p-2");
    cartModalBodyFooterPrice.classList.add("product-price", "text-light");
    cartModalBodyFooterButtons.classList.add("product-buttons");
    cartModalButtonIncQty.classList.add("btn", "btn-light");
    cartModalButtonDecQty.classList.add("btn", "btn-light");
    cartModalBodyFooterQty.classList.add("product-total", "text-light");

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

    cartModalBodyHeader.innerText = cart[productIndex].title;

    cartModalBodyImage.src = cart[productIndex].img;
    cartModalBodyImage.alt = "";

    cartModalBodyFooterPrice.innerText = cart[productIndex].price;

    cartModalButtonIncQty.type = "button";
    cartModalButtonIncQty.innerText = "+";
    cartModalButtonIncQty.id = currentId;

    cartModalButtonDecQty.type = "button";
    cartModalButtonDecQty.innerText = "-";
    cartModalButtonDecQty.id = currentId;

    cartModalBodyFooterQty.innerText = qty;

    cartModalButtonIncQty.onclick = () => {
        console.log(currentId);
        qty++;
        console.log(qty);
        getCart();
    };

    cartModalButtonDecQty.onclick = () => {
        console.log(currentId);
        if (qty === 0) {
            cartModalBodyFooterPrice.innerText = 0;
        }
        else {
            qty--;
            console.log(qty);
            getCart();
        }
    };

    //Lägg till i DOM
    cartModal.append(cartModalDialog);
    cartModalDialog.append(cartModalContent);
    cartModalContent.append(cartModalHeader, cartModalBody);
    cartModalHeader.append(cartModalTitle, cartButtonX);
    cartModalBody.append(
        cartModalBodyHeader, 
        cartModalBodyImage, 
        cartModalBodyFooter);
    cartModalBodyFooterButtons.append(
        cartModalButtonIncQty, 
        cartModalButtonDecQty);
    cartModalBodyFooter.append(
        cartModalBodyFooterPrice,
        cartModalBodyFooterButtons,
        cartModalBodyFooterQty);
    cartList.append(cartModal);

}
/* Modal Cart 
    <div class="modal fade" id="cart" tabindex="-1" aria-labelledby="cart" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-light">
                    <h1 class="modal-title fs-5" id="modal-label-cart">Your Cart</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="product-title bg-dark text-light">VSNVG Eclipse</div>
                    <img src="img/glasses/glasses_1.jpg" alt="">
                    <div class="products-bottom p-2 bg-dark">
                        <div class="product-price text-light">$47.99</div>
                        <div class="product-buttons">
                            <button type="button" class="btn btn-light">+</button>
                            <button type="button" class="btn btn-light">-</button>
                        </div>
                        <div class="product-total text-light">Qty: 1</div>  
                    </div>
                </div>
                <div class="modal-body-img">
                    <div class="product-title bg-dark text-light">VSNVG Flare</div>
                    <img src="img/glasses/glasses_2.jpg" alt="">
                    <div class="products-bottom p-2 bg-dark">
                        <div class="product-price text-light">$47.99</div>
                        <div class="product-buttons">
                            <button type="button" class="btn btn-light">+</button>
                            <button type="button" class="btn btn-light">-</button>
                        </div>
                        <div class="product-total text-light">Qty: 1</div>
                    </div>
                </div>
         </div>
    </div>*/

