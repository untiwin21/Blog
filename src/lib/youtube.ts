// 유튜브 URL에서 영상 id를 뽑습니다. (watch?v=, youtu.be/, embed/, shorts/ 지원)
export function getYouTubeId(input: string): string | null {
  try {
    const u = new URL(input);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null;
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    const m = u.pathname.match(/\/(embed|shorts|live)\/([^/?]+)/);
    return m ? m[2] : null;
  } catch {
    return null;
  }
}

export function getYouTubeStart(input: string): number | null {
  try {
    const t = new URL(input).searchParams.get('t') ?? new URL(input).searchParams.get('start');
    if (!t) return null;
    const n = parseInt(t, 10);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}
