// 사이트 전역 설정. 자기소개 문구는 여기서 수정하세요.
export const SITE = {
  title: '최태웅의 공부 기록',
  description: '공부한 내용을 정리하고 복습하는 블로그',
  author: '최태웅',
  affiliation: '성균관대학교 기계공학과',
  // TODO: 자기소개 문구를 직접 수정하세요.
  intro:
    '로보틱스와 AI를 공부하고 있습니다. 이 블로그에는 강의와 책으로 공부한 내용을 직접 유도하고 정리한 글을 올립니다.',
  links: [
    { label: 'GitHub', href: 'https://github.com/untiwin21' },
    // { label: 'Portfolio', href: 'https://untiwin21.github.io' },
  ],
  recentPostCount: 8,
};

// 상단 메뉴의 카테고리. key는 URL 경로와 series frontmatter의 category 값입니다.
export const CATEGORIES = [
  { key: 'robotics', label: 'Robotics', description: '로봇 기구학·동역학, 보행 로봇, SLAM' },
  { key: 'ai', label: 'AI', description: '딥러닝과 머신러닝' },
  { key: 'me', label: 'ME', description: '기계공학 전공 과목' },
  { key: 'cse', label: 'CSE', description: '컴퓨터공학 기초' },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];
export const CATEGORY_KEYS = CATEGORIES.map((c) => c.key) as [CategoryKey, ...CategoryKey[]];

export function getCategory(key: string) {
  return CATEGORIES.find((c) => c.key === key);
}
