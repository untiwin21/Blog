// 모든 내부 링크는 이 함수를 거쳐 base(/<REPO_NAME>)가 붙도록 합니다.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${clean}`;
}

// base를 뗀 현재 경로 (예: "/robotics/modern-robotics/")
export function stripBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) return pathname.slice(BASE.length) || '/';
  return pathname;
}
