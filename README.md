# 한글 단어 맞추기 (Hangul Wordle)

Wordle을 한글에 맞게 만든 웹 게임입니다. 2음절 한글 단어를 자모 단위로 맞히며, 5번의 기회 안에 정답을 찾아야 합니다.

## 게임 방법

- 정답은 **2음절 한글 단어**이며, 자모를 펼치면 **5칸**이 됩니다.
- 한 줄에 자모 5개를 입력한 뒤 **Enter(↵)** 로 제출합니다.
- 최대 **5번** 시도할 수 있습니다.

### 입력 방식

- 화면의 한글 자판이나 물리 키보드로 자모를 입력합니다.
- 복합모음(ㅘ, ㅐ, ㅚ 등)은 기본 모음 조합으로 입력됩니다.
  - 예: `ㅘ` → `ㅗ` + `ㅏ`, `ㅐ` → `ㅏ` + `ㅣ`

### 색상 안내

| 색상 | 의미 |
|------|------|
| 🟩 초록 | 위치와 자모 모두 정답 |
| 🟨 노랑 | 자모는 맞지만 위치가 다름 |
| ⬜ 회색 | 정답에 없는 자모 |

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 기술 스택

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) 4

## 프로젝트 구조

```
src/
├── App.tsx              # 앱 레이아웃, 모달, 키보드 이벤트
├── components/          # UI 컴포넌트 (보드, 자판, 모달 등)
├── game/
│   ├── dictionary.ts    # 단어 사전
│   ├── engine.ts        # 추측 결과 판정 로직
│   ├── jamo.ts          # 자모·복합모음 처리
│   └── types.ts         # 타입 정의
├── hooks/
│   └── useGame.ts       # 게임 상태 관리
└── styles/
    └── globals.css      # 전역 스타일
```

## 단어 사전

`src/game/dictionary.ts`에 2음절 한글 단어가 등록되어 있습니다. 복합모음을 기본 자모로 펼쳤을 때 정확히 5칸이 되는 단어만 게임에 사용됩니다.

새 단어를 추가하려면 `jamos`(자모 배열), `hangul`(표기), `meaning`(뜻)을 함께 넣어 주세요.

## 라이선스

이 프로젝트는 [MIT License](LICENSE)로 배포됩니다.
