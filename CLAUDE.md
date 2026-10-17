# CLAUDE.md — 공부 글 작성 규칙

사용자가 공부 자료(강의 노트, 교재 내용, 사진, 코드 등)를 주면 아래 규칙에 따라 글을 작성해 추가한다.
작성 후 반드시 `npm run build`가 통과하는지 확인한다.

## 1. 파일 위치

- 글: `src/content/posts/<category>/<series-slug>/<NN>-<post-slug>.md`
  - `<category>`: `robotics | ai | me | cse`
  - `<NN>`: 시리즈 내 순번 두 자리 (`01`, `02`, ...). frontmatter `order`와 일치시킨다.
  - `<post-slug>`: 영어 소문자 kebab-case (예: `configuration-space`). 한글 파일명 금지.
- 시리즈가 없으면 먼저 만든다: `src/content/series/<category>/<series-slug>.md`
  (`title`, `category` 필수, `description`·`order` 선택. 사용자가 원하지 않으면 description은 넣지 않는다)
- React/컴포넌트가 필요할 때만 `.mdx`를 쓰고, 그 외에는 `.md`를 쓴다.
- 책 독서노트: `src/content/books/<book-slug>/index.md` + `cover.jpg`. `category`는 `src/config/books.ts`의 값 중 하나.
- **책을 추가할 때는 반드시 표지도 넣는다.** 한국어판 표지를 찾아(교보문고 상품 페이지의 `contents.kyobobook.co.kr/.../pdt/<ISBN>.jpg` 이미지 등) 다음 중 하나로 처리한다.
  1. 이미지를 내려받을 수 있으면 책 폴더에 `cover.jpg`로 저장한다 (frontmatter `cover`는 생략해도 자동 인식).
  2. 내려받을 수 없는 환경이면 frontmatter에 `coverUrl: <이미지 주소>`를 적는다. `npm run build`(GitHub Actions 포함) 전에 `scripts/fetch-covers.mjs`가 `cover.jpg`로 내려받는다.
  - 저자, 출판사, 번역판 여부를 확인해서 사용자가 읽은 판의 표지를 고른다.

## 2. frontmatter 형식

```yaml
---
title: "글 제목"                     # 따옴표로 감싼다 (콜론 등 특수문자 대비)
date: 2026-10-17                      # YYYY-MM-DD, 작성일
series: robotics/modern-robotics      # 시리즈 id = series/ 아래 경로 (확장자 제외)
order: 3                              # 시리즈 내 순서
tags: [kinematics, jacobian]          # 영어 소문자 kebab-case, 2~4개
youtube: https://www.youtube.com/watch?v=...   # 강의 영상이 있을 때만
draft: true                           # 미완성일 때만. 완성되면 줄을 지운다
---
```

- 존재하지 않는 시리즈 id를 쓰면 빌드가 실패한다. 반드시 `src/content/series/`에서 확인한다.
- 본문에 `# H1`을 쓰지 않는다 (제목은 frontmatter `title`로 표시됨). `##`부터 시작한다.
- 목차(TOC)는 `##`, `###`만 표시되므로 섹션 제목을 의미 있게 짓는다.

## 3. 수식 표기법 (KaTeX)

- 인라인: `$...$`, 블록: 앞뒤 줄을 비운 `$$ ... $$` (각각 별도 줄).
- 벡터는 `\mathbf{x}`, 행렬은 대문자 `A`, 집합/공간은 `\mathbb{R}^n`, 군은 `SO(3)`, `SE(3)`.
- 미분: 시간미분 `\dot x`, `\ddot x`, 편미분 `\frac{\partial f}{\partial x}`.
- 반대칭 행렬 `[\omega]`, 전치 `^\top`, 단위벡터 `\hat\omega`.
- 여러 줄 정렬은 `\begin{aligned} ... \end{aligned}` 를 `$$` 안에 쓴다.
- KaTeX가 지원하지 않는 매크로(`\bm`, `\newcommand` 남용 등)는 쓰지 않는다. `\boldsymbol`을 쓴다.
- Markdown과 충돌하는 `_`, `*`가 인라인 수식 밖에 남지 않게 주의한다.

## 4. 이미지

- 글 이미지: 글 파일과 같은 폴더의 `images/`에 저장한다.
  예: `src/content/posts/robotics/modern-robotics/images/2r-cspace.png`
- 본문에서는 상대 경로로 참조한다: `![대체 텍스트](./images/2r-cspace.png)`
- 파일명은 영어 kebab-case. 대체 텍스트는 그림이 무엇을 보여주는지 한국어로 쓴다.
- `public/`의 절대 경로(`/foo.png`)는 base 경로가 붙지 않으므로 쓰지 않는다.
- 책 표지: 책 폴더 안 `cover.jpg`, frontmatter `cover: ./cover.jpg`.

## 5. 글 작성 톤과 구조

- 문체: 간결하고 논리적인 평서문(`~이다`, `~한다`). 군더더기, 감탄, 과장 금지.
- 사용자가 준 자료의 내용을 기준으로 쓰고, 자료에 없는 사실을 지어내지 않는다. 보충 설명이 필요하면 근거가 명확한 표준 내용만 쓴다.
- 기본 순서: **핵심 개념 → 유도 → 예시** (필요하면 마지막에 정리)

```md
## 핵심 개념
무엇을, 왜 다루는지. 정의와 직관을 2~5문장으로.

## 유도
가정을 먼저 밝히고, 한 단계씩 수식을 전개한다. 각 단계 사이에 "왜 이렇게 되는지" 한 줄 설명.

## 예시
구체적인 숫자 예제, 코드(언어 명시한 코드 블록), 또는 그림.

## 정리
핵심 결과를 3~5개 bullet로.
```

- 코드 블록에는 항상 언어를 명시한다 (```` ```python ````, ```` ```cpp ```` 등).
- 용어는 처음 나올 때 `한국어(English)` 형태로 병기한다.
- 한 글은 하나의 주제에 집중한다. 길어지면 시리즈의 다음 글로 나눈다.

## 6. 작업 후 확인

1. `npm run build` 에러 없음
2. 새 글이 시리즈 페이지에 올바른 순서로 나오는지, 이전/다음 링크가 맞는지
3. 수식이 깨지지 않는지 (`npm run dev`로 확인)
