// URL에서 이름 파라미터 추출
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 씬 전환 함수
let currentScene = 0;
const sceneGif = document.getElementById('scene-gif');

function showScene(sceneNumber) {
    const scenePath = `src/image/scene${sceneNumber}.gif`;
    sceneGif.src = scenePath;
    sceneGif.classList.remove('hidden');
}

// 생일 축하 텍스트 표시
function showBirthdayText(name) {
    const nameText = document.getElementById('name-text');
    const birthdayText = document.getElementById('birthday-text');
    
    nameText.textContent = `${name}님`;
    birthdayText.classList.remove('hidden');
}

// 메인 애니메이션 시퀀스
function startAnimation(name) {
    currentScene = 1;
    
    // 씬 1: 길을 걷는 장면 (3초)
    showScene(1);
    
    setTimeout(() => {
        currentScene = 2;
        // 씬 2: 언덕 끝에서 도시 바라보기 (2초)
        showScene(2);
        
        setTimeout(() => {
            currentScene = 3;
            // 씬 3: 불꽃놀이만 보이는 하늘 (2초)
            showScene(3);
            
            setTimeout(() => {
                currentScene = 4;
                // 씬 4: 언덕에 앉아서 불꽃놀이 보기 (3초)
                showScene(4);
                
                // scene4.gif 위에 생일 축하 텍스트 표시
                setTimeout(() => {
                    showBirthdayText(name);
                }, 1000);
            }, 2000);
        }, 2000);
    }, 3000);
}

// 라우팅 처리
function handleRouting() {
    const path = window.location.pathname;
    
    if (path === '/admin' || path === '/admin/') {
        window.location.href = './admin.html';
        return;
    }
}

// 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', () => {
    handleRouting();
    
    const name = getUrlParameter('name') || '친구';
    
    // 5초 대기 후 애니메이션 시작
    setTimeout(() => {
        startAnimation(name);
    }, 5000);
});
