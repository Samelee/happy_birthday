# 🎂 생일 축하 애니메이션

특별한 사람을 위한 도트 스타일 생일 축하 애니메이션 웹 애플리케이션입니다.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ 특징

- 🎨 포켓몬스터 스타일의 도트 애니메이션
- 📱 모바일 최적화
- 🔗 쉬운 공유 기능 (카카오톡, 링크 복사)
- 🎁 개인화된 생일 메시지
- 🎆 아름다운 불꽃놀이 애니메이션

## 🚀 시작하기

### 설치

1. 저장소 클론:
```bash
git clone https://github.com/your-username/happy-birthday.git
cd happy-birthday
```

2. 웹 서버에서 실행:
```bash
# Python 3
python -m http.server 8000

# 또는 Node.js (http-server)
npx http-server

# 또는 PHP
php -S localhost:8000
```

3. 브라우저에서 접속:
```
http://localhost:8000
```

## 📖 사용 방법

### 1. 애니메이션 만들기

1. 메인 페이지에서 우측 상단의 **"만들기"** 버튼 클릭
2. 또는 `/admin.html` 직접 접속
3. 이름 입력 후 **"공유하기"** 버튼 클릭
4. 링크가 자동으로 복사되고 새 창에서 애니메이션이 열립니다

### 2. 애니메이션 공유하기

- **공유하기 버튼**: 현재 페이지의 링크를 복사하거나 공유합니다
- **카카오톡 공유**: 모바일에서 자동으로 카카오톡 공유 기능이 활성화됩니다
- **링크 복사**: 데스크톱에서는 클립보드에 링크가 복사됩니다

## 📁 프로젝트 구조

```
happy-birthday/
├── index.html          # 메인 애니메이션 페이지
├── admin.html          # 애니메이션 생성 페이지
├── README.md           # 프로젝트 문서
├── LICENSE             # 라이선스
└── src/
    ├── css/
    │   └── styles.css  # 스타일시트
    ├── js/
    │   └── script.js   # JavaScript 로직
    └── image/
        ├── main.png    # 공유용 메인 이미지
        ├── scene1.gif  # 씬 1: 길 걷기
        ├── scene2.gif  # 씬 2: 언덕에서 도시 바라보기
        ├── scene3.gif  # 씬 3: 불꽃놀이
        └── scene4.gif  # 씬 4: 언덕에 앉아서 불꽃놀이 보기
```

## 🎬 애니메이션 시퀀스

1. **씬 1** (3초): 길을 걷는 장면
2. **씬 2** (2초): 언덕 끝에서 도시 바라보기
3. **씬 3** (2초): 불꽃놀이만 보이는 하늘
4. **씬 4** (3초): 언덕에 앉아서 불꽃놀이 보기
5. **최종**: 생일 축하 메시지 표시

## 🔧 커스터마이징

### GIF 파일 교체

`src/image/` 폴더의 GIF 파일들을 원하는 애니메이션으로 교체할 수 있습니다:
- `scene1.gif`: 첫 번째 씬
- `scene2.gif`: 두 번째 씬
- `scene3.gif`: 세 번째 씬
- `scene4.gif`: 네 번째 씬

### 공유 이미지 변경

`src/image/main.png` 파일을 교체하여 카카오톡/링크 공유 시 표시되는 이미지를 변경할 수 있습니다.
권장 크기: 1200x630px

### 애니메이션 타이밍 조정

`src/js/script.js` 파일의 `startAnimation` 함수에서 각 씬의 지속 시간을 조정할 수 있습니다:

```javascript
setTimeout(() => {
    currentScene = 2;
    showScene(2);
}, 3000); // 3초 후 다음 씬으로 전환
```

## 🌐 배포

### GitHub Pages

1. 저장소를 GitHub에 푸시
2. Settings > Pages에서 소스 브랜치 선택
3. 자동으로 배포됩니다

### Netlify

1. Netlify에 저장소 연결
2. 빌드 설정 없음 (정적 사이트)
3. 자동 배포

### Vercel

1. Vercel에 저장소 연결
2. 프레임워크: Other
3. 자동 배포

## 📱 모바일 최적화

- ✅ 반응형 디자인 (모든 화면 크기 지원)
- ✅ 터치 이벤트 최적화 (최소 44x44px 터치 영역)
- ✅ 모바일 공유 기능 (Web Share API - 카카오톡, SMS 등)
- ✅ 가로/세로 모드 지원
- ✅ iOS Safari 주소창 대응 (동적 뷰포트 높이)
- ✅ 더블탭 줌 방지
- ✅ 터치 스크롤 최적화
- ✅ 모바일 브라우저 호환성 (Chrome, Safari, Firefox 등)
- ✅ 작은 화면 대응 (360px 이상)
- ✅ 입력 필드 줌 방지 (iOS)

## 🤝 기여하기

기여를 환영합니다! 다음 방법으로 기여할 수 있습니다:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 말

- 포켓몬스터 스타일의 도트 아트 영감
- 모든 오픈소스 커뮤니티

## 📧 문의

이슈나 제안사항이 있으시면 [GitHub Issues](https://github.com/your-username/happy-birthday/issues)에 등록해주세요.

---

Made with ❤️ for special birthdays
