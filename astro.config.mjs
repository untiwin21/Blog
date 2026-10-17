// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// ───────────────────────────────────────────────
// 배포 정보: 사용자명/저장소 이름이 바뀌면 여기 두 줄만 고치면 됩니다.
// ───────────────────────────────────────────────
const GITHUB_USERNAME = 'untiwin21';
const REPO_NAME = 'study-blog';

export default defineConfig({
  site: `https://${GITHUB_USERNAME}.github.io`,
  base: `/${REPO_NAME}`,
  trailingSlash: 'ignore',
  integrations: [mdx()],
  markdown: {
    // 수식: remark-math + rehype-katex (unified 프로세서에서 동작)
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
});
