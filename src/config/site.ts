// 사이트 전역 설정.
export const SITE = {
  title: "TW's Blog",
  description: '공부한 내용을 정리하고 복습하는 블로그',
  author: '최태웅',
  links: [
    { label: 'GitHub', href: 'https://github.com/untiwin21' },
    // { label: 'Portfolio', href: 'https://untiwin21.github.io' },
  ],
  recentPostCount: 8,
};

// 상단 메뉴의 카테고리. key는 URL 경로와 series frontmatter의 category 값입니다.
export const CATEGORIES = [
  { key: 'robotics', label: 'Robotics' },
  { key: 'ai', label: 'AI' },
  { key: 'me', label: 'ME' },
  { key: 'cse', label: 'CSE' },
  { key: 'writings', label: 'Writings' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];
export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key) as [CategoryKey, ...CategoryKey[]];

export function getCategory(key: string) {
  return CATEGORIES.find((c) => c.key === key);
}
