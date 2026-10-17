// 빌드 전에 실행: books/<slug>/index.md 의 coverUrl 을 내려받아 같은 폴더에 cover.jpg 로 저장합니다.
// 이미 cover.* 파일이 있으면 건너뜁니다. 내려받기에 실패해도 빌드는 계속됩니다(placeholder 표시).
import fs from 'node:fs';
import path from 'node:path';

const BOOKS_DIR = path.resolve('src/content/books');
const COVER_RE = /^cover\.(jpe?g|png|webp|avif)$/i;

if (!fs.existsSync(BOOKS_DIR)) process.exit(0);

for (const slug of fs.readdirSync(BOOKS_DIR)) {
  const dir = path.join(BOOKS_DIR, slug);
  const index = path.join(dir, 'index.md');
  if (!fs.statSync(dir).isDirectory() || !fs.existsSync(index)) continue;
  if (fs.readdirSync(dir).some((f) => COVER_RE.test(f))) continue;

  const fm = fs.readFileSync(index, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const url = fm?.[1].match(/^coverUrl:\s*["']?([^"'\s]+)["']?\s*$/m)?.[1];
  if (!url) continue;

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (study-blog cover fetcher)', Referer: new URL(url).origin + '/' },
    });
    const type = res.headers.get('content-type') ?? '';
    if (!res.ok || !type.startsWith('image/')) throw new Error(`HTTP ${res.status} ${type}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = type.includes('png') ? 'png' : type.includes('webp') ? 'webp' : 'jpg';
    fs.writeFileSync(path.join(dir, `cover.${ext}`), buf);
    console.log(`[covers] ${slug}: ${buf.length} bytes <- ${url}`);
  } catch (e) {
    console.warn(`[covers] ${slug}: 표지 다운로드 실패 (${e.message}) — placeholder로 표시됩니다`);
  }
}
