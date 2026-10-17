# 공부 정리 블로그

[![Deploy to GitHub Pages](https://github.com/untiwin21/Blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/untiwin21/Blog/actions/workflows/deploy.yml)

공부한 내용을 정리해 복습하고, 실제로 공부한 기록을 포트폴리오로 보여주기 위한 블로그입니다.
Astro + Content Collections로 만들었고 GitHub Pages(프로젝트 사이트)로 배포합니다.

- 배포 주소: https://untiwin21.github.io/Blog/
- 메뉴: Home | Robotics | AI | ME | CSE | Books

## 로컬 실행

Node.js 22.22 이상이 필요합니다.

```bash
npm install
npm run dev        # 개발 서버: http://localhost:4321/Blog/
npm run build      # dist/ 에 정적 사이트 생성
npm run preview    # 빌드 결과 미리보기: http://localhost:4321/Blog/
```

> `draft: true` 인 글은 `npm run dev` 에서는 보이고, `npm run build` 결과에서는 빠집니다.

## 사용자명/저장소 이름 바꾸기

`astro.config.mjs` 맨 위 두 줄만 고치면 `site`와 `base`가 함께 바뀝니다.

```js
const GITHUB_USERNAME = 'untiwin21';
const REPO_NAME = 'Blog';
```

모든 내부 링크는 `src/lib/url.ts`의 `url()` 함수로 만들기 때문에 base 경로가 자동으로 붙습니다.
사이트 제목(홈 제목), 외부 링크는 `src/config/site.ts`에서 수정합니다.

## 폴더 구조

```
src/
├─ content.config.ts          # 컬렉션 스키마 (zod)
├─ config/
│  ├─ site.ts                 # 사이트 정보, 자기소개, 카테고리 메뉴
│  └─ books.ts                # 교보문고 분류 순서 (Books 페이지 행 순서)
├─ content/
│  ├─ series/<category>/<series-slug>.md
│  ├─ posts/<category>/<series-slug>/<NN-post-slug>.md
│  │                         └─ images/  # 글에 쓰는 이미지
│  └─ books/<book-slug>/index.md + cover.jpg
├─ components/ layouts/ pages/ lib/ styles/
```

URL 규칙

| 대상 | 파일 | URL |
| --- | --- | --- |
| 카테고리 | `config/site.ts` | `/Blog/robotics/` |
| 시리즈 | `series/robotics/modern-robotics.md` | `/Blog/robotics/modern-robotics/` |
| 글 | `posts/robotics/modern-robotics/01-configuration-space.md` | `/Blog/robotics/modern-robotics/01-configuration-space/` |
| 책 | `books/sapiens/index.md` | `/Blog/books/sapiens/` |

## 새 시리즈 추가

`src/content/series/<category>/<series-slug>.md` 를 만듭니다. category는 `robotics | ai | me | cse` 중 하나입니다.

```md
---
title: 자료구조 및 알고리즘
category: cse
description: 한 줄 설명  # 선택. 지금은 화면에 표시하지 않음
order: 1            # 선택. 카테고리 페이지에서 카드 정렬 순서 (없으면 최근 업데이트 순)
---
```

시리즈의 id는 `series/` 아래 경로에서 확장자를 뺀 것입니다. 예: `robotics/modern-robotics`

## 새 글 추가

`src/content/posts/<category>/<series-slug>/<NN-post-slug>.md` (또는 `.mdx`)

```md
---
title: "Configuration Space와 자유도"
date: 2026-09-20
series: robotics/modern-robotics     # 시리즈 id
order: 1                              # 선택. 시리즈 내 순서 (없으면 날짜순)
tags: [kinematics, c-space]           # 선택
youtube: https://www.youtube.com/watch?v=XXXXXXXXXXX   # 선택. 있으면 본문 위에 영상 삽입
draft: false                          # 선택. true면 빌드에서 제외
---

## 핵심 개념
인라인 수식 $\theta$, 블록 수식은

$$
\dot x = Ax + Bu
$$

![설명](./images/diagram.png)
```

- 이미지는 글 파일 옆 `images/` 폴더에 두고 **상대 경로**(`./images/...`)로 참조합니다. Astro가 최적화하고 base 경로도 자동으로 붙입니다.
- `public/`에 둔 파일을 Markdown에서 `/...` 절대 경로로 쓰면 base가 붙지 않으니 사용하지 마세요.

## 새 책 추가

`src/content/books/<book-slug>/` 폴더를 만들고 `index.md`와 표지 `cover.jpg`(또는 png/webp)를 넣습니다.

```md
---
title: "사피엔스"
author: 유발 하라리
category: 역사/문화        # src/config/books.ts 의 분류 중 하나
cover: ./cover.jpg         # 선택. 없으면 1:1.45 placeholder
readDate: 2026-03-10       # 선택
rating: 4                  # 선택 (0~5)
oneLine: 한줄평             # 선택
---

여기부터 독서 노트 본문 (Markdown)
```

Books 페이지의 행 순서는 `src/config/books.ts`의 배열(교보문고 국내도서 분류) 순서를 따르며, 책이 없는 분류도 빈 행으로 표시됩니다.
카드는 높이가 고정이고 너비는 표지 원본 비율을 따릅니다.

## 배포 (GitHub Pages)

1. (완료) GitHub `untiwin21/Blog` 저장소의 `main` 브랜치에 push 되어 있습니다.
2. (완료) 저장소 **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 바꿉니다.
3. 이후 `main`에 push 할 때마다 `.github/workflows/deploy.yml`이 빌드 후 자동 배포합니다.
   (Actions 탭에서 진행 상황 확인, 수동 실행은 `workflow_dispatch`)

## 기술 스택

- Astro 7, Content Collections(glob loader + zod 스키마), MDX
- 수식: remark-math + rehype-katex (`@astrojs/markdown-remark`의 unified 프로세서)
- 코드 하이라이팅: Shiki (github-light / github-dark 듀얼 테마)
- 폰트: Pretendard(본문), JetBrains Mono(코드)
- 라이트/다크 모드: 시스템 설정을 따르고, 상단 토글로 바꾼 값은 브라우저에 저장
