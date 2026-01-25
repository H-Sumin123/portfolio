window.addEventListener('scroll', function () {
    const logo = document.querySelector('.logo img');

    if (window.scrollY > 50) {
        logo.src = './img/logo_r.svg';
    } else {
        logo.src = './img/logo_w.svg';
    }
});

function applyResponsiveScale() {
    const sections = document.querySelectorAll('#section1, #section2, #section3, #section5');
    const baseWidth = 2560;
    const windowWidth = window.innerWidth;

    // 1025px 이상 데스크탑 범위에서 작동
    if (windowWidth >= 1025) {
        let scale = windowWidth / baseWidth;

        // [추가] 최소 배율 제한 (0.75 이하로 작아지지 않게 설정)
        // 화면이 1440px 이하로 내려가도 콘텐츠는 1440px일 때의 크기를 유지함
        const minScale = 0.75;
        if (scale < minScale) {
            scale = minScale;
        }

        // 기준 너비보다 클 때는 1:1 유지
        if (windowWidth >= baseWidth) {
            scale = 1;
        }

        sections.forEach(sec => {
            sec.style.width = baseWidth + 'px';
            sec.style.position = 'relative';
            sec.style.left = '50%';
            sec.style.marginLeft = `-${baseWidth / 2}px`;

            sec.style.transformOrigin = 'top center';
            sec.style.transform = `scale(${scale})`;

            const originalHeight = sec.offsetHeight;
            const scaledHeight = originalHeight * scale;

            sec.style.marginBottom = `-${(originalHeight - scaledHeight) + 1}px`;
        });

        // 최소 배율 때문에 가로 스크롤이 생길 수 있으므로 바디 설정
        if (windowWidth < baseWidth * minScale) {
            document.body.style.overflowX = 'auto';
        } else {
            document.body.style.overflowX = 'hidden';
        }

    } else {
        // 1024px 이하 모바일 환경
        sections.forEach(sec => {
            sec.style.width = '100%';
            sec.style.left = '0';
            sec.style.marginLeft = '0';
            sec.style.transform = 'none';
            sec.style.margin = '0';
            sec.style.marginBottom = '0';
            sec.style.marginTop = '0';
        });

        document.body.style.overflowX = 'hidden';
    }
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyResponsiveScale, 50);
});

window.addEventListener('load', applyResponsiveScale);
applyResponsiveScale();

// 더 정확한 터치 기기 판별 (단순히 창 너비가 좁은 PC는 제외됨)
const isActualTouchDevice = window.matchMedia("(pointer: coarse)").matches;

// 터치 전용 기기가 아닐 때만(즉, 마우스를 쓰는 PC일 때만) 커서 생성
if (!isActualTouchDevice) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        // 커서 위치 업데이트
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        // PC에서 창을 줄였을 때도 보이도록 강제 노출
        cursor.style.display = 'block'; 
    });

    const links = document.querySelectorAll('a, button, .btn, .logo img');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.7)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}