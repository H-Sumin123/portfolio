window.addEventListener('scroll', function () {
    const logo = document.querySelector('.logo img');

    if (window.scrollY > 50) {
        logo.src = './img/logo_r.svg';
    } else {
        logo.src = './img/logo_w.svg';
    }
});

// 커스텀 커서 요소 생성
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

// 마우스 움직임 추적
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 링크에 마우스 올렸을 때
const links = document.querySelectorAll('a, button, .btn');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});