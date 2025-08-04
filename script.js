const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {
    current = (current + 1) % slides.length;
    slider.style.transform = `translateX(-${current * 100}%)`;
}, 4000); // chuyển ảnh mỗi 4s

// const slider = document.querySelector('.slider');
// const slides = document.querySelectorAll('.slide');
// const prevBtn = document.querySelector('.nav.prev');
// const nextBtn = document.querySelector('.nav.next');
// const dots = document.querySelectorAll('.dot');

// let current = 0;
// let autoPlay = true;

// function showSlide(index) {
//     current = (index + slides.length) % slides.length;
//     slider.style.transform = `translateX(-${current * 100}%)`;

//     dots.forEach((dot) => dot.classList.remove('active'));
//     dots[current].classList.add('active');
// }

// nextBtn.addEventListener('click', () => {
//     showSlide(current + 1);
// });
// prevBtn.addEventListener('click', () => {
//     showSlide(current - 1);
// });
// dots.forEach((dot, i) => {
//     dot.addEventListener('click', () => showSlide(i));
// });

// Auto play

setInterval(() => {
    if (autoPlay) showSlide(current + 1);
}, 4000);

// voucher
document.addEventListener('DOMContentLoaded', () => {
    // SLIDER
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    let current = 0;

    setInterval(() => {
        current = (current + 1) % slides.length;
        slider.style.transform = `translateX(-${current * 100}%)`;
    }, 4000);

    // VOUCHER COPY
    document.querySelectorAll('.copybtn').forEach((button) => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            const text = input.value;

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    button.textContent = 'COPIED';
                    setTimeout(() => {
                        button.textContent = 'COPY';
                    }, 1500);
                });
            } else {
                input.select();
                input.setSelectionRange(0, 99999);
                const success = document.execCommand('copy');
                if (success) {
                    button.textContent = 'COPIED';
                    setTimeout(() => {
                        button.textContent = 'COPY';
                    }, 1500);
                } else {
                    alert('Copy failed.');
                }
            }
        });
    });
});
document.querySelectorAll('.badge')[0].textContent = 3; // Yêu thích
document.querySelectorAll('.badge')[1].textContent = 5; // Giỏ hàng

// adding items to wishlist
// let wishListCount = document.querySelector('#icon-btn span');
// let heartButtons = document.querySelectorAll('.heart-button');
// heartButtons.forEach((button) =>{
//     button.addEvenListener('click',()=>{
//         button.classList.toggle('active');
//     })
// })
document.addEventListener('DOMContentLoaded', function () {
    console.log('Wishlist script initialized');

    // Lấy tất cả nút tim và badge
    const heartButtons = document.querySelectorAll('.product-card .heart-button');
    const wishlistBadge = document.querySelector('.icon-wrapper .badge');

    // Khởi tạo wishlist từ localStorage hoặc mảng rỗng
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    updateBadge();

    // Cập nhật giao diện khi tải trang
    heartButtons.forEach((button) => {
        const productCard = button.closest('.product-card');
        const productId = productCard.dataset.productId;

        if (wishlist.includes(productId)) {
            button.classList.add('active');
            setHeartColor(button, 'red');
        } else {
            setHeartColor(button, 'none');
        }
    });

    // Xử lý sự kiện click
    heartButtons.forEach((button) => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.productId;

            // Toggle trạng thái
            const isActive = this.classList.toggle('active');

            if (isActive) {
                // Thêm vào wishlist nếu chưa có
                if (!wishlist.includes(productId)) {
                    wishlist.push(productId);
                }
                setHeartColor(this, 'red');
                showNotification('❤️ Đã thêm vào yêu thích');
            } else {
                // Xóa khỏi wishlist
                wishlist = wishlist.filter((id) => id !== productId);
                setHeartColor(this, 'none');
                showNotification('💔 Đã xóa khỏi yêu thích');
            }

            // Lưu vào localStorage
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateBadge();

            // Hiệu ứng
            animateHeart(this);
        });
    });

    // Hàm hỗ trợ
    function setHeartColor(button, fillColor) {
        const svg = button.querySelector('svg');
        svg.style.fill = fillColor;
        svg.style.stroke = fillColor === 'red' ? 'red' : '#000';
        svg.setAttribute('fill', fillColor);
        svg.setAttribute('stroke', fillColor === 'red' ? 'red' : '#000');
    }

    function updateBadge() {
        wishlistBadge.textContent = wishlist.length;
        wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }

    function animateHeart(button) {
        button.style.transform = 'scale(1.3)';
        setTimeout(() => (button.style.transform = 'scale(1)'), 300);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'wishlist-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 2000);
        }, 10);
    }
});
// const bar = document.getElementById('bar');
// const nav = document.getElementById('navbar');

// if (bar && nav) {
//     bar.addEventListener('click', () => {
//         nav.classList.toggle('active');
//     });
// }
// pagination
document.addEventListener('DOMContentLoaded', function () {
    // Giả lập dữ liệu sản phẩm (thay bằng dữ liệu thực từ server)
    const allProducts = document.querySelectorAll('.pro-container .pro');
    const productsPerPage = 8;
    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    // Khởi tạo phân trang
    initPagination(totalPages);

    // Hiển thị trang đầu tiên
    showPage(1);

    // Xử lý sự kiện click phân trang
    document.querySelectorAll('.page-number').forEach((item) => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const pageNum = parseInt(this.textContent);
            showPage(pageNum);
            updateActivePage(pageNum);
        });
    });

    // Xử lý nút prev/next
    document.querySelector('.page-nav.prev').addEventListener('click', function (e) {
        e.preventDefault();
        const activePage = document.querySelector('.page-number.active');
        let currentPage = parseInt(activePage.textContent);
        if (currentPage > 1) {
            showPage(currentPage - 1);
            updateActivePage(currentPage - 1);
        }
    });

    document.querySelector('.page-nav.next').addEventListener('click', function (e) {
        e.preventDefault();
        const activePage = document.querySelector('.page-number.active');
        let currentPage = parseInt(activePage.textContent);
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
            updateActivePage(currentPage + 1);
        }
    });

    // Hàm hiển thị sản phẩm theo trang
    function showPage(page) {
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        allProducts.forEach((product, index) => {
            if (index >= start && index < end) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Hàm cập nhật trang active
    function updateActivePage(pageNum) {
        document.querySelectorAll('.page-number').forEach((item) => {
            item.classList.remove('active');
            if (parseInt(item.textContent) === pageNum) {
                item.classList.add('active');
            }
        });
    }

    // Hàm khởi tạo phân trang (tạo số trang động)
    function initPagination(totalPages) {
        const pageNumbers = document.querySelector('.page-numbers');
        pageNumbers.innerHTML = '';

        // Luôn hiển thị trang 1
        pageNumbers.appendChild(createPageItem(1));

        // Hiển thị dấu ... nếu có nhiều trang
        if (totalPages > 4) {
            pageNumbers.appendChild(createDotsItem());
        }

        // Hiển thị 3 trang gần current page
        for (let i = Math.max(2, totalPages - 2); i <= totalPages; i++) {
            pageNumbers.appendChild(createPageItem(i));
        }

        // Đánh dấu trang đầu tiên là active
        document.querySelector('.page-number').classList.add('active');
    }

    function createPageItem(number) {
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'page-number';
        a.textContent = number;
        return a;
    }

    function createDotsItem() {
        const span = document.createElement('span');
        span.className = 'page-dots';
        span.textContent = '...';
        return span;
    }
});
