// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu Toggle
const navbarNav = document.querySelector('.navbar-nav');
const hamburgerMenu = document.querySelector('#hamburger-menu');

if (hamburgerMenu) {
    hamburgerMenu.onclick = (e) => {
        e.preventDefault();
        navbarNav.classList.toggle('active');
    };
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (hamburgerMenu && !hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

// Search Form Toggle
const searchButton = document.querySelector('#search-button');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

if (searchButton) {
    searchButton.onclick = (e) => {
        e.preventDefault();
        searchForm.classList.toggle('active');
        searchBox.focus();
    };
}

// Close search form when clicking outside
document.addEventListener('click', function(e) {
    if (searchButton && searchForm && !searchButton.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
});

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portofolio-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hide');
                setTimeout(() => {
                    card.style.display = 'block';
                }, 10);
            } else {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.display = 'block';
                    }, 10);
                } else {
                    card.classList.add('hide');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Search Functionality for Gallery
if (searchBox) {
    searchBox.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        portfolioCards.forEach(card => {
            const cardAlt = card.querySelector('img').getAttribute('alt').toLowerCase();
            const cardCategory = card.getAttribute('data-category').toLowerCase();
            
            if (cardAlt.includes(searchTerm) || cardCategory.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Lightbox Functionality
let currentLightboxIndex = 0;
const lightboxImages = [];

// Collect all gallery images
portfolioCards.forEach((card, index) => {
    const img = card.querySelector('img');
    if (img) {
        lightboxImages.push({
            src: img.src,
            alt: img.alt
        });
    }
});

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Find the index of clicked image
    currentLightboxIndex = lightboxImages.findIndex(img => img.src === imgElement.src);
    
    lightbox.style.display = 'block';
    lightboxImg.src = imgElement.src;
    lightboxCaption.innerHTML = imgElement.alt;
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;
    
    // Loop around
    if (currentLightboxIndex >= lightboxImages.length) {
        currentLightboxIndex = 0;
    }
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = lightboxImages[currentLightboxIndex].src;
    lightboxCaption.innerHTML = lightboxImages[currentLightboxIndex].alt;
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// Booking Modal Functionality
let currentBookingPackage = '';
let currentBookingPrice = 0;

function openBookingModal(packageName, price) {
    const modal = document.getElementById('bookingModal');
    const packageInput = document.getElementById('booking-package');
    const priceElement = document.getElementById('booking-price');
    
    currentBookingPackage = packageName;
    currentBookingPrice = price;
    
    packageInput.value = packageName;
    priceElement.textContent = formatRupiah(price);
    
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('booking-form').reset();
}

// Format number to Rupiah
function formatRupiah(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
}

// Handle Booking Form Submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('booking-name').value;
        const phone = document.getElementById('booking-phone').value;
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        const location = document.getElementById('booking-location').value;
        const notes = document.getElementById('booking-notes').value;
        
        // Format message for WhatsApp
        const message = `*BOOKING MAKEUP ARTIST - ARKA PROJECT*\n\n` +
            `*Paket:* ${currentBookingPackage}\n` +
            `*Harga:* ${formatRupiah(currentBookingPrice)}\n\n` +
            `*DATA PEMESAN*\n` +
            `Nama: ${name}\n` +
            `No. WhatsApp: ${phone}\n\n` +
            `*DETAIL ACARA*\n` +
            `Tanggal: ${formatDate(date)}\n` +
            `Waktu: ${time}\n` +
            `Lokasi: ${location}\n` +
            (notes ? `Catatan: ${notes}\n` : '') +
            `\n_Mohon konfirmasi ketersediaan untuk tanggal tersebut. Terima kasih!_`;
        
        // WhatsApp number (replace with actual number)
        const waNumber = '6287846380434';
        const waURL = `https://wa.me/6287846380434?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(waURL, '_blank');
        
        // Close modal
        closeBookingModal();
    });
}

// Format date to Indonesian format
function formatDate(dateString) {
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const date = new Date(dateString);
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Open booking modal from hero CTA
const heroBookingBtn = document.getElementById('booking-btn');
if (heroBookingBtn) {
    heroBookingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Scroll to packages section first
        document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
    });
}

// Testimonial Slider
let currentTestimonialIndex = 0;

function moveTestimonial(direction) {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    
    currentTestimonialIndex += direction;
    
    // Loop around
    if (currentTestimonialIndex >= totalCards) {
        currentTestimonialIndex = 0;
    }
    if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = totalCards - 1;
    }
    
    const offset = -currentTestimonialIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
}

// Auto-play testimonials
let testimonialInterval = setInterval(() => {
    moveTestimonial(1);
}, 5000);

// Pause auto-play on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            moveTestimonial(1);
        }, 5000);
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const message = document.getElementById('contact-message').value;
        
        // Format message for WhatsApp
        const waMessage = `*PESAN DARI WEBSITE*\n\n` +
            `Nama: ${name}\n` +
            `Email: ${email}\n` +
            `Telepon: ${phone}\n\n` +
            `Pesan:\n${message}`;
        
        const waNumber = '6287846380434';
        const waURL = `https://wa.me/6287846380434?text=${encodeURIComponent(waMessage)}`;
        
        window.open(waURL, '_blank');
        
        // Reset form and show success message
        contactForm.reset();
        alert('Terima kasih! Pesan Anda akan dikirim melalui WhatsApp.');
    });
}

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.navbar-nav a, .footer-section a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu if open
                navbarNav.classList.remove('active');
            }
        }
    });
});

// Set minimum date for booking (today)
const bookingDateInput = document.getElementById('booking-date');
if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', today);
}

// Initialize Feather Icons
if (typeof feather !== 'undefined') {
    feather.replace();
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

if (searchBox && searchForm) {
    searchBox.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();

            const keyword = searchBox.value.toLowerCase().trim();
            const services = ['wedding', 'engagement', 'wisuda', 'event', 'siraman'];

            if (!services.includes(keyword)) return;

            searchForm.classList.remove('active');

            const targetSection = document.getElementById('packages');
            if (!targetSection) return;

            targetSection.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                document.querySelectorAll('.package-card').forEach(card => {
                    card.classList.remove('highlight');
                });

                const targetCard = document.querySelector(
                    `.package-card[data-service="${keyword}"]`
                );

                if (targetCard) {
                    targetCard.classList.add('highlight');
                }
            }, 600);
        }
    });
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("✅ Ditambahkan ke keranjang");
}

console.log('%c🎨 Arka Project Website - Developed with ❤️', 'color: #f58eca; font-size: 16px; font-weight: bold;');