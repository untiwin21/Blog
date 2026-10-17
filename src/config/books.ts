// 교보문고 국내도서 분류 기준. Books 페이지는 이 배열의 순서대로 행을 표시합니다.
// 책이 없는 분류도 빈 행으로 표시됩니다. 순서를 바꾸거나 분류를 추가/삭제하려면 이 배열만 수정하세요.
export const BOOK_CATEGORIES = [
  '소설',
  '시/에세이',
  '인문',
  '경제/경영',
  '자기계발',
  '정치/사회',
  '역사/문화',
  '기술/공학',
  '여행',
  '컴퓨터/IT',
] as const;

export type BookCategory = (typeof BOOK_CATEGORIES)[number];
