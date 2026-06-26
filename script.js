// --- State Management ---
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let activeItems = [...galleryItems]; // Khali wahi dikhenge jo filtered hain
let currentIndex = 0;

// --- Category Filtering Logic ---
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Active class button badalna
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        // Images filter karna
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });

        // Loop ke liye array update karna
        activeItems = galleryItems.filter(item => !item.classList.contains('hide'));
    });
});

// --- Lightbox Functionality ---
function openLightbox(index) {
    currentIndex = index;
    const imgSrc = activeItems[currentIndex].querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function showNext() {
    currentIndex = (currentIndex + 1) % activeItems.length;
    lightboxImg.src = activeItems[currentIndex].querySelector('img').src;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    lightboxImg.src = activeItems[currentIndex].querySelector('img').src;
}

// --- Event Listeners ---
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const indexInActive = activeItems.indexOf(item);
        if (indexInActive !== -1) {
            openLightbox(indexInActive);
        }
    });
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Background click karne par band hona
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard arrow keys controls
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});