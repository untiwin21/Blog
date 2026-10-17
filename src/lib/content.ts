import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { url } from './url';

export type Post = CollectionEntry<'posts'>;
export type Series = CollectionEntry<'series'>;
export type Book = CollectionEntry<'books'>;

const lastSegment = (id: string) => id.split('/').pop()!;

// draft: true 인 글은 프로덕션 빌드에서 제외 (dev 서버에서는 보임)
export async function getPosts(): Promise<Post[]> {
  return getCollection('posts', ({ data }) => (import.meta.env.PROD ? data.draft !== true : true));
}

export async function getSeries(): Promise<Series[]> {
  return getCollection('series');
}

export function seriesSlug(series: Series): string {
  return lastSegment(series.id);
}

export function postSlug(post: Post): string {
  return lastSegment(post.id);
}

export function seriesUrl(series: Series): string {
  return url(`/${series.data.category}/${seriesSlug(series)}/`);
}

export function postUrl(post: Post, seriesMap: Map<string, Series>): string {
  const s = seriesMap.get(post.data.series.id);
  if (!s) throw new Error(`글 "${post.id}"의 series "${post.data.series.id}"를 찾을 수 없습니다.`);
  return url(`/${s.data.category}/${seriesSlug(s)}/${postSlug(post)}/`);
}

export function byDateDesc(a: Post, b: Post) {
  return b.data.date.getTime() - a.data.date.getTime();
}

// 시리즈 내 정렬: order 우선, 없으면 날짜 오름차순
export function bySeriesOrder(a: Post, b: Post) {
  const ao = a.data.order, bo = b.data.order;
  if (ao != null && bo != null && ao !== bo) return ao - bo;
  if (ao != null && bo == null) return -1;
  if (ao == null && bo != null) return 1;
  return a.data.date.getTime() - b.data.date.getTime();
}

export async function getSeriesMap(): Promise<Map<string, Series>> {
  const all = await getSeries();
  return new Map(all.map((s) => [s.id, s]));
}

export function postsInSeries(posts: Post[], series: Series): Post[] {
  return posts.filter((p) => p.data.series.id === series.id).sort(bySeriesOrder);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Seoul' })
    .replace(/\.\s?/g, '.').replace(/\.$/, '');
}

// 책 폴더에 있는 cover.* 파일 (frontmatter에 cover가 없을 때 사용)
const coverFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/books/*/cover.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function getBookCover(book: Book): ImageMetadata | undefined {
  if (book.data.cover) return book.data.cover;
  const hit = Object.entries(coverFiles).find(([p]) => p.split('/').at(-2) === book.id);
  return hit?.[1].default;
}
