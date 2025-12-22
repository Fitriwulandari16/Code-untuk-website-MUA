// ================== NAVBAR ==================
const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');

hamburger.addEventListener('click', () => {
    navbarNav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (
        !navbarNav.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        navbarNav.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ================== OVERLAY ==================
const overlay = document.querySelector('.overlay');

// ================== SEARCH POPUP ==================
const searchBtn = document.querySelector('#search');
const searchPopup = document.querySelector('.search-popup');
const closeSearch = document.querySelector('#close-search');
const doSearch = document.querySelector('#do-search');
const searchInput = document.querySelector('#search-input');
const suggestList = document.querySelector('.suggest-list');

const suggestions = [
    "Makeup Pengantin",
    "Makeup Wisuda",
    "Wedding Decoration",
    "Layanan Makeup",
    "Paket Wedding",
    "Portofolio Arka Project"
];

if (searchBtn) {
    searchBtn.onclick = () => {
        searchPopup.classList.add('active');
        overlay.classList.add('active');
    };
}

if (closeSearch) {
    closeSearch.onclick = () => {
        searchPopup.classList.remove('active');
        overlay.classList.remove('active');
    };
}

doSearch.addEventListener('click', () => {
    if (searchInput.value.trim() !== "") {
        window.location.href = "#services";
    }
    searchPopup.classList.remove('active');
    overlay.classList.remove('active');
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && searchInput.value.trim() !== "") {
        e.preventDefault();
        window.location.href = "#services";
        searchPopup.classList.remove('active');
        overlay.classList.remove('active');
    }
});

// auto suggest
searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();
    suggestList.innerHTML = "";

    if (keyword === "") return;

    suggestions
        .filter(item => item.toLowerCase().includes(keyword))
        .forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            li.onclick = () => {
                searchInput.value = item;
                suggestList.innerHTML = "";
            };
            suggestList.appendChild(li);
        });
});

// ================== CART SIDEBAR ==================
const cartBtn = document.querySelector('#shopping-cart');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('#close-cart');
const cartContent = document.getElementById("cart-content");

if (cartBtn) {
    cartBtn.onclick = () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    };
}

if (closeCart) {
    closeCart.onclick = () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    };
}

// overlay close all
overlay.addEventListener('click', () => {
    searchPopup.classList.remove('active');
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// ================== CART LOGIC ==================
const cartItems = [];

function renderCart() {
    if (cartItems.length === 0) {
        cartContent.innerHTML = `<p class="empty">Belum ada item.</p>`;
        return;
    }

    cartContent.innerHTML = cartItems
        .map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>Rp ${item.price.toLocaleString()}</span>
            </div>
        `)
        .join("");
}

// ================== TOAST ==================
const toast = document.getElementById("toast");

function showToast() {
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ================== ADD TO CART ==================
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);

        cartItems.push({ name, price });
        renderCart();
        showToast();

        cartSidebar.classList.add('active');
        overlay.classList.add('active');
    });
});

// ================== STICKY NAVBAR ==================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('sticky', window.scrollY > 50);
});

