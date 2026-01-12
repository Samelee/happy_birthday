// URL에서 이름 파라미터 추출
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 씬 전환 함수
let currentScene = 0;
let sceneGif = document.getElementById('scene-gif');
let nextGif = null; // 다음 씬을 위한 두 번째 이미지 요소
const animationContainer = document.getElementById('animation-container');
let preloadedGifs = null; // 미리 로드된 GIF 저장

function showScene(sceneNumber) {
    const scenePath = `src/image/scene${sceneNumber}.gif`;
    
    // 모바일 브라우저에서 GIF가 재생되도록 강제 재로드
    // 타임스탬프를 추가하여 캐시 우회
    const timestamp = new Date().getTime();
    const scenePathWithCache = `${scenePath}?t=${timestamp}`;
    
    // 첫 번째 씬인 경우
    if (!sceneGif || !sceneGif.parentNode) {
        sceneGif = document.createElement('img');
        sceneGif.id = 'scene-gif';
        sceneGif.alt = '애니메이션';
        sceneGif.loading = 'eager';
        sceneGif.decoding = 'async';
        sceneGif.classList.add('gif-layer');
        animationContainer.appendChild(sceneGif);
        
        // 이미지 로드 및 표시
        sceneGif.src = scenePathWithCache;
        sceneGif.classList.remove('hidden');
        
        // 모바일에서 GIF 재생을 강제하기 위한 트릭
        sceneGif.addEventListener('load', () => {
            sceneGif.style.display = 'none';
            sceneGif.offsetHeight; // 리플로우 강제
            sceneGif.style.display = 'block';
        }, { once: true });
        
        return;
    }
    
    // 다음 씬이 이미 미리 로드되어 있으면 즉시 교체
    if (nextGif && nextGif.complete && nextGif.src.includes(`scene${sceneNumber}`)) {
        // 기존 이미지 숨기기
        sceneGif.style.opacity = '0';
        
        // 다음 이미지를 메인으로 교체
        const temp = sceneGif;
        sceneGif = nextGif;
        nextGif = temp;
        
        sceneGif.id = 'scene-gif';
        sceneGif.style.opacity = '1';
        sceneGif.style.zIndex = '1';
        nextGif.style.zIndex = '0';
        
        // 모바일에서 GIF 재생을 강제하기 위한 트릭
        sceneGif.style.display = 'none';
        sceneGif.offsetHeight; // 리플로우 강제
        sceneGif.style.display = 'block';
        
        // 기존 이미지 제거 (다음 전환을 위해)
        setTimeout(() => {
            if (nextGif && nextGif.parentNode) {
                nextGif.remove();
                nextGif = null;
            }
        }, 100);
        
        return;
    }
    
    // nextGif가 없으면 생성
    if (!nextGif) {
        nextGif = document.createElement('img');
        nextGif.loading = 'eager';
        nextGif.decoding = 'async';
        nextGif.classList.add('gif-layer');
        nextGif.style.opacity = '0';
        nextGif.style.zIndex = '0';
        animationContainer.appendChild(nextGif);
    }
    
    // nextGif에 새 이미지 로드
    nextGif.src = scenePathWithCache;
    
    // 이미지가 로드되면 즉시 교체 (검은 화면 없이)
    const handleLoad = () => {
        if (nextGif && nextGif.complete && nextGif.src.includes(`scene${sceneNumber}`)) {
            // 기존 이미지 숨기기
            sceneGif.style.opacity = '0';
            
            // 다음 이미지를 메인으로 교체
            const temp = sceneGif;
            sceneGif = nextGif;
            nextGif = temp;
            
            sceneGif.id = 'scene-gif';
            sceneGif.style.opacity = '1';
            sceneGif.style.zIndex = '1';
            if (nextGif) {
                nextGif.style.zIndex = '0';
            }
            
            // 모바일에서 GIF 재생을 강제하기 위한 트릭
            sceneGif.style.display = 'none';
            sceneGif.offsetHeight; // 리플로우 강제
            sceneGif.style.display = 'block';
            
            // 추가 재생 보장 (iOS Safari 대응)
            setTimeout(() => {
                sceneGif.style.visibility = 'hidden';
                sceneGif.offsetHeight;
                sceneGif.style.visibility = 'visible';
            }, 50);
            
            // 기존 이미지 제거 (다음 전환을 위해)
            setTimeout(() => {
                if (nextGif && nextGif.parentNode) {
                    nextGif.remove();
                    nextGif = null;
                }
            }, 100);
        }
    };
    
    // 기존 이벤트 리스너 제거 후 새로 추가
    nextGif.removeEventListener('load', handleLoad);
    nextGif.addEventListener('load', handleLoad, { once: true });
    
    // 에러 처리
    nextGif.addEventListener('error', () => {
        console.error(`Failed to load scene ${sceneNumber}`);
        // 재시도
        setTimeout(() => {
            const retryTimestamp = new Date().getTime();
            nextGif.src = `${scenePath}?t=${retryTimestamp}`;
        }, 100);
    }, { once: true });
    
    // 이미 로드된 경우를 대비
    if (nextGif.complete) {
        handleLoad();
    }
}

// 생일 축하 텍스트 표시
function showBirthdayText(name) {
    const nameText = document.getElementById('name-text');
    const birthdayText = document.getElementById('birthday-text');
    
    nameText.textContent = `${name}님`;
    birthdayText.classList.remove('hidden');
}

// 모든 GIF를 미리 로드하는 함수 (실제 img 요소 사용)
async function preloadAllGifs() {
    const preloadedImages = [];
    
    for (let i = 1; i <= 4; i++) {
        const img = document.createElement('img');
        img.loading = 'eager';
        img.decoding = 'async';
        img.style.position = 'absolute';
        img.style.opacity = '0';
        img.style.pointerEvents = 'none';
        img.style.width = '1px';
        img.style.height = '1px';
        img.style.top = '-9999px';
        
        const scenePath = `src/image/scene${i}.gif`;
        const promise = new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => {
                console.error(`Failed to load scene ${i}`);
                // 재시도
                setTimeout(() => {
                    const retryTimestamp = new Date().getTime();
                    img.src = `${scenePath}?t=${retryTimestamp}`;
                }, 500);
            };
            img.src = scenePath;
            
            // 이미 로드된 경우
            if (img.complete && img.naturalWidth > 0) {
                resolve(img);
            }
        });
        
        document.body.appendChild(img);
        preloadedImages.push(promise);
    }
    
    return Promise.all(preloadedImages);
}

// 씬을 표시하는 함수 (미리 로드된 img 요소 사용)
function displayScene(preloadedImg, sceneNumber) {
    // 기존 이미지 요소가 없으면 생성
    if (!sceneGif || !sceneGif.parentNode) {
        sceneGif = document.createElement('img');
        sceneGif.id = 'scene-gif';
        sceneGif.alt = '애니메이션';
        sceneGif.classList.add('gif-layer');
        animationContainer.appendChild(sceneGif);
    }
    
    // 미리 로드된 이미지가 있으면 그 src를 사용 (이미 캐시에 있음)
    // 없으면 새로 로드 (타임스탬프 추가하여 강제 재생)
    const scenePath = `src/image/scene${sceneNumber}.gif`;
    if (preloadedImg && preloadedImg.complete && preloadedImg.naturalWidth > 0) {
        // 미리 로드된 이미지의 src 사용 (이미 캐시에 있음)
        sceneGif.src = preloadedImg.src;
    } else {
        // 새로 로드 (타임스탬프 추가하여 강제 재생)
        const timestamp = new Date().getTime();
        sceneGif.src = `${scenePath}?t=${timestamp}`;
    }
    
    sceneGif.classList.remove('hidden');
    
    // 모바일에서 GIF 재생을 강제하기 위한 트릭
    sceneGif.style.display = 'none';
    sceneGif.offsetHeight; // 리플로우 강제
    sceneGif.style.display = 'block';
    
    // 추가 재생 보장 (iOS Safari 대응)
    setTimeout(() => {
        sceneGif.style.visibility = 'hidden';
        sceneGif.offsetHeight;
        sceneGif.style.visibility = 'visible';
    }, 50);
}

// 기존 showScene 함수를 간단하게 유지 (하위 호환성)
function showScene(sceneNumber) {
    const scenePath = `src/image/scene${sceneNumber}.gif`;
    const timestamp = new Date().getTime();
    const scenePathWithCache = `${scenePath}?t=${timestamp}`;
    
    // 첫 번째 씬인 경우
    if (!sceneGif || !sceneGif.parentNode) {
        sceneGif = document.createElement('img');
        sceneGif.id = 'scene-gif';
        sceneGif.alt = '애니메이션';
        sceneGif.loading = 'eager';
        sceneGif.decoding = 'async';
        sceneGif.classList.add('gif-layer');
        animationContainer.appendChild(sceneGif);
        
        // 이미지 로드 및 표시
        sceneGif.src = scenePathWithCache;
        sceneGif.classList.remove('hidden');
        
        // 모바일에서 GIF 재생을 강제하기 위한 트릭
        sceneGif.addEventListener('load', () => {
            sceneGif.style.display = 'none';
            sceneGif.offsetHeight; // 리플로우 강제
            sceneGif.style.display = 'block';
        }, { once: true });
    }
}

// 메인 애니메이션 시퀀스 (로드 완료 후 실행)
function startAnimation(name) {
    const gifDuration = 8000; // 모든 GIF는 8초
    
    // 씬 1: 길을 걷는 장면 (8초)
    currentScene = 1;
    displayScene(preloadedGifs && preloadedGifs[0] ? preloadedGifs[0] : null, 1);
    
    setTimeout(() => {
        // 씬 2: 언덕 끝에서 도시 바라보기 (8초)
        currentScene = 2;
        displayScene(preloadedGifs && preloadedGifs[1] ? preloadedGifs[1] : null, 2);
        
        setTimeout(() => {
            // 씬 3: 불꽃놀이만 보이는 하늘 (8초)
            currentScene = 3;
            displayScene(preloadedGifs && preloadedGifs[2] ? preloadedGifs[2] : null, 3);
            
            setTimeout(() => {
                // 씬 4: 언덕에 앉아서 불꽃놀이 보기 (8초)
                currentScene = 4;
                displayScene(preloadedGifs && preloadedGifs[3] ? preloadedGifs[3] : null, 4);
                
                setTimeout(() => {
                    // scene4.gif 위에 생일 축하 텍스트 표시
                    showBirthdayText(name);
                }, gifDuration);
            }, gifDuration);
        }, gifDuration);
    }, gifDuration);
}

// 라우팅 처리
function handleRouting() {
    const path = window.location.pathname;
    
    if (path === '/admin' || path === '/admin/') {
        window.location.href = './admin.html';
        return;
    }
}

// 공유하기 기능
function shareCurrentPage() {
    const currentUrl = window.location.href;
    
    // Web Share API 사용 (모바일)
    if (navigator.share) {
        navigator.share({
            title: '생일 축하합니다! 🎂',
            text: '특별한 사람을 위한 생일 축하 애니메이션',
            url: currentUrl
        }).catch((err) => {
            console.log('공유 취소됨:', err);
        });
    } else {
        // 클립보드에 복사
        copyToClipboard(currentUrl);
    }
}

// 클립보드에 복사
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('링크가 복사되었습니다!');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// Fallback 복사 방법
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast('링크가 복사되었습니다!');
    } catch (err) {
        showToast('복사에 실패했습니다. URL을 직접 복사해주세요.');
    }
    document.body.removeChild(textArea);
}

// 토스트 메시지 표시
function showToast(message) {
    // 기존 토스트 제거
    const existingToast = document.getElementById('toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        z-index: 3000;
        font-size: 14px;
        animation: toast-appear 0.3s ease-out;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toast-disappear 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// 메타데이터 업데이트
function updateMetaTags(name) {
    const title = name ? `${name}님 생일 축하합니다! 🎂` : '생일 축하합니다! 🎂';
    const description = name ? `${name}님을 위한 특별한 생일 축하 애니메이션` : '특별한 사람을 위한 생일 축하 애니메이션을 만들어보세요!';
    const currentUrl = window.location.href;
    
    // 이미지 URL 생성 (절대 경로)
    const baseUrl = window.location.origin;
    const path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    const imageUrl = `${baseUrl}${path}/src/image/main.png`;
    
    // Title 업데이트
    document.title = title;
    const titleMeta = document.querySelector('meta[name="title"]');
    if (titleMeta) titleMeta.setAttribute('content', title);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    
    // Description 업데이트
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', description);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', description);
    
    // URL 업데이트
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', currentUrl);
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', currentUrl);
    
    // Image URL 업데이트 (절대 경로)
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', imageUrl);
    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', imageUrl);
}

// 모바일 최적화: 뷰포트 높이 조정
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 모바일 최적화: 터치 이벤트 처리
function setupMobileOptimizations() {
    // 더블탭 줌 방지
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // 스크롤 방지 (애니메이션 페이지)
    document.addEventListener('touchmove', (e) => {
        if (e.target.closest('#animation-container')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // iOS Safari 주소창 대응
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
    
    // 초기 설정
    setViewportHeight();
}

// 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', async () => {
    handleRouting();
    
    // 모바일 최적화 설정
    setupMobileOptimizations();
    
    const name = getUrlParameter('name') || '친구';
    
    // 메타데이터 업데이트
    updateMetaTags(name);
    
    // 버튼 이벤트 리스너
    const shareBtn = document.getElementById('shareBtn');
    const createBtn = document.getElementById('createBtn');
    
    if (shareBtn) {
        // 클릭과 터치 모두 지원
        shareBtn.addEventListener('click', shareCurrentPage);
        shareBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            shareCurrentPage();
        });
    }
    
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            window.location.href = './admin.html';
        });
        createBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            window.location.href = './admin.html';
        });
    }
    
    // 모든 GIF를 미리 로드한 후 애니메이션 시작
    try {
        preloadedGifs = await preloadAllGifs();
        // 로드 완료 후 애니메이션 시작
        startAnimation(name);
    } catch (error) {
        console.error('Failed to preload GIFs:', error);
        // 로드 실패해도 애니메이션 시작 (기존 방식으로 fallback)
        preloadedGifs = null;
        startAnimation(name);
    }
});
