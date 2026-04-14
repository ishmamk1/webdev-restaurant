let currentSlide = 0;
let slides;

window.onload = function () {
    slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(() => {
            changeSlide(1);
        }, 4000);
    }
};

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides[currentSlide].classList.add("active");
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}


function toggleMenu() {
    let nav = document.getElementById("nav");
    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}

function addToCart(itemName, itemPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    let existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(itemName + ' added to cart!');
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContent = document.getElementById('cart-content');
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<div class="empty-cart"><p>Your cart is empty.</p><a href="menu.html" class="hero-btn">Continue Shopping</a></div>';
        return;
    }
    
    let cartHTML = '<div class="cart-items-container"><table class="cart-table"><thead><tr><th>Item Name</th><th>Price</th><th>Quantity</th><th>Total</th><th>Action</th></tr></thead><tbody>';
    
    let totalPrice = 0;
    
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        cartHTML += `<tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
    });
    
    cartHTML += '</tbody></table></div>';
    
    cartHTML += `<div class="cart-summary">
        <div class="total-price"><h3>Cart Total: $${totalPrice.toFixed(2)}</h3></div>
        <div class="cart-actions">
            <button class="clear-cart-btn" onclick="clearCart()">Clear Cart</button>
            <a href="menu.html" class="hero-btn">Continue Shopping</a>
        </div>
    </div>`;
    
    cartContent.innerHTML = cartHTML;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        displayCart();
    }
}