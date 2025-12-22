//Toggle class active
const navbarNav = document.querySelector('.navbar-nav');
//ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

//klik diluar sidebar untuk menghilangkan nav

const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

// ================== Search Popup ==================
const searchBtn = document.querySelector('#search');
const searchPopup = document.querySelector('.search-popup');
const closeSearch = document.querySelector('#close-search');

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

// ================== Cart Sidebar ==================
const cartBtn = document.querySelector('#shopping-cart');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('#close-cart');

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

// ================== Overlay ==================
const overlay = document.querySelector('.overlay');

overlay.addEventListener('click', () => {
    // close semua popup
    searchPopup.classList.remove('active');
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// ================== Animasi Hamburger ==================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
});

// ================== Sticky Navbar ==================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('sticky', window.scrollY > 50);
});

// ================== Search Redirect ==================
// ================== Search Redirect ke Layanan ==================
const doSearch = document.querySelector('#do-search');
const searchInput = document.querySelector('#search-input');

doSearch.addEventListener('click', () => {

    // Jika user mengetik apa saja
    let keyword = searchInput.value.trim();

    if (keyword !== "") {
        // langsung arahkan ke section layanan
        window.location.href = "#services";
    }

    // Tutup popup
    searchPopup.classList.remove('active');
    overlay.classList.remove('active');
});

// ================== Enter Auto Search ==================
searchInput.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        if (searchInput.value.trim() !== "") {
            startSearchAnimation();
            setTimeout(() => {
                window.location.href = "#services";
            }, 600);
        }

        searchPopup.classList.remove('active');
        overlay.classList.remove('active');
    }
});

// ================== Auto Suggest ==================
const suggestList = document.querySelector('.suggest-list');

const suggestions = [
    "Makeup Pengantin",
    "Makeup Wisuda",
    "Wedding Decoration",
    "Layanan Makeup",
    "Paket Wedding",
    "Portofolio Arka Project"
];

searchInput.addEventListener('input', () => {
    let keyword = searchInput.value.toLowerCase();

    // Kosongkan list
    suggestList.innerHTML = "";

    if (keyword === "") return;

    let filtered = suggestions.filter(item =>
        item.toLowerCase().includes(keyword)
    );

    filtered.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;

        li.onclick = () => {
            searchInput.value = item;
            suggestList.innerHTML = "";
        };

        suggestList.appendChild(li);
    });
});

// ================== Search Animation ==================
function startSearchAnimation() {
    const anim = document.querySelector('.redirect-anim');
    anim.classList.add('show');

    setTimeout(() => {
        anim.classList.remove('show');
    }, 800);
}

// ================== Search Redirect ke Layanan ==================
doSearch.addEventListener('click', () => {
    if (searchInput.value.trim() !== "") {
        startSearchAnimation();

        setTimeout(() => {
            window.location.href = "#services";
        }, 600);
    }

    searchPopup.classList.remove('active');
    overlay.classList.remove('active');
});

document.addEventListener('click', function(e){
    if (
        !navbarNav.contains(e.target) &&
        !hamburger.contains(e.target) &&
        !e.target.closest(".navbar-extra") &&
        !e.target.closest(".cart-sidebar") &&
        !e.target.closest(".search-popup")
    ) {
        navbarNav.classList.remove('active');
    }
});

const cartItems = []; // tempat menyimpan item

function renderCart() {
    const cartContent = document.getElementById("cart-content");

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

// tombol tambah ke keranjang
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);

        cartItems.push({ name, price });

        renderCart(); // update tampilan
    });
});
