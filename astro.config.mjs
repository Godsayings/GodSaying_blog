import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import swup from "@swup/astro";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components";/* Render the custom directive content */
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";/* Handle directives */
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { imageFallbackConfig, siteConfig } from "./src/config.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { LinkCardComponent } from "./src/plugins/rehype-component-link-card.mjs";
import rehypeImageFallback from "./src/plugins/rehype-image-fallback.mjs";
import rehypeImageAttrs from "./src/plugins/rehype-image-attrs.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import rehypeHeadingShift from "./src/plugins/rehype-heading-shift.mjs";
import rehypeExternalLinks from 'rehype-external-links';
import expressiveCode from "astro-expressive-code";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { expressiveCodeConfig } from "./src/config.ts";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.js";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";

const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

// GitHub Pages 的项目站点挂在子路径下（https://godsaying.github.io/GodSaying_blog/），
// 由 Pages 工作流注入 GITHUB_PAGES=true 时打开；Vercel 与本地构建都不受影响。
const isPages = process.env.GITHUB_PAGES === "true";

// 站点正式地址。影响 canonical、sitemap、RSS、robots.txt 里的绝对链接。
// Vercel 上自动取部署域名（优先生产域名，含以后绑定的自定义域名，其次当前部署域名），
// 所以换域名不需要改这个文件。本地构建取不到这些变量，退回下面的默认值。
const SITE_URL = isPages
    ? "https://godsaying.github.io"
    : vercelHost
      ? `https://${vercelHost}`
      : "https://godsaying-blog.vercel.app";

// 子路径部署需要 base；Vercel 与本地都是根路径。
const BASE_PATH = isPages ? "/GodSaying_blog/" : "/";

// https://astro.build/config
export default defineConfig({
    site: SITE_URL,
    base: BASE_PATH,
    trailingSlash: "always",
    integrations: [swup({
        theme: false,
        animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
        // the default value `transition-` cause transition delay
        // when the Tailwind class `transition-all` is used
        containers: ["main", "#toc"],
        smoothScrolling: true,
        cache: true,
        preload: true,
        accessibility: true,
        updateHead: true,
        updateBodyClass: false,
        globalInstance: true,
    }), icon({
        include: {
            "material-symbols": ["*"],
            "fa6-brands": ["*"],
            "fa6-regular": ["*"],
            "fa6-solid": ["*"],
            "simple-icons": ["*"],
        },
    }), svelte(), react(), sitemap({
        // 添加 sitemap 配置,确保格式正确
        serialize(item) {
            // 移除尾部斜杠(可选,根据您的 URL 结构)
            // item.url = item.url.replace(/\/$/, '');
            return item;
        },
        // 可以添加 changefreq 和 priority
        changefreq: 'weekly',
        priority: 0.7,
        // 确保所有 URL 都是绝对路径
        customPages: [],
    }),
    expressiveCode({
        themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
        plugins: [
            pluginCollapsibleSections(),
            pluginLineNumbers(),
            pluginLanguageBadge(),
            pluginCustomCopyButton()
        ],
        defaultProps: {
            wrap: true,
            overridesByLang: {
                'shellsession': {
                    showLineNumbers: false,
                },
            },
        },
        styleOverrides: {
            codeBackground: "var(--codeblock-bg)",
            borderRadius: "0.25rem",
            borderColor: "none",
            codeFontSize: "0.875rem",
            codeFontFamily: "'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            codeLineHeight: "1.5rem",
            frames: {
                editorBackground: "var(--codeblock-bg)",
                terminalBackground: "var(--codeblock-bg)",
                terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
                editorTabBarBackground: "var(--codeblock-topbar-bg)",
                editorActiveTabBackground: "none",
                editorActiveTabIndicatorBottomColor: "var(--primary)",
                editorActiveTabIndicatorTopColor: "none",
                editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
                terminalTitlebarBorderBottomColor: "none"
            },
            textMarkers: {
                delHue: 0,
                insHue: 180,
                markHue: 250
            }
        },
        frames: {
            showCopyToClipboardButton: false,
        }
    }),
    ],
    // Astro 7 默认使用新的 Rust Markdown 处理器 Sätteri，不再内置 remark/rehype 管线。
    // 本项目大量依赖自定义 remark/rehype 插件，因此显式切回 unified() 处理器以保持原有行为不变。
    // 需要安装 @astrojs/markdown-remark（已加入 package.json）。
    // 参见: https://docs.astro.build/en/guides/upgrade-to/v7/#new-default-markdown-processor-sätteri
    compressHTML: true, // 保留 Astro 6.x 的空白压缩行为（v7 默认改为 'jsx' 规则，可能吞掉行内元素间的空格）
    markdown: {
        processor: unified({
            remarkPlugins: [
                remarkMath,
                remarkReadingTime,
                remarkExcerpt,
                remarkGithubAdmonitionsToDirectives,
                remarkDirective,
                remarkSectionize,
                parseDirectiveNode,
            ],
            rehypePlugins: [
                rehypeHeadingShift, // 必须放在最前面，将 h1 降级为 h2，避免多个 h1 的 SEO 问题
                rehypeKatex,
                rehypeSlug,
                [rehypeImageFallback, imageFallbackConfig],
                rehypeImageAttrs,
                [
                    rehypeComponents,
                    {
                        components: {
                            github: GithubCardComponent,
                            link: LinkCardComponent,
                            note: (x, y) => AdmonitionComponent(x, y, "note"),
                            tip: (x, y) => AdmonitionComponent(x, y, "tip"),
                            important: (x, y) => AdmonitionComponent(x, y, "important"),
                            caution: (x, y) => AdmonitionComponent(x, y, "caution"),
                            warning: (x, y) => AdmonitionComponent(x, y, "warning"),
                        },
                    },
                ],
                [
                    rehypeExternalLinks,
                    {
                        target: '_blank',
                    },
                ],
                [
                    rehypeAutolinkHeadings,
                    {
                        behavior: "append",
                        properties: {
                            className: ["anchor"],
                        },
                        content: {
                            type: "element",
                            tagName: "span",
                            properties: {
                                className: ["anchor-icon"],
                                "data-pagefind-ignore": true,
                            },
                            children: [
                                {
                                    type: "text",
                                    value: "#",
                                },
                            ],
                        },
                    },
                ],
            ],
        }),
    },
    vite: {
        plugins: [tailwindcss()],
        build: {
            // Vite 8 将默认 CSS 压缩器从 esbuild 换成了 lightningcss，
            // 其解析器对本项目大量使用的 `&` 嵌套选择器（main.css/markdown.css/
            // scrollbar.css 及各组件 <style> 块）报 "Unexpected token Delim('&')"。
            // 显式指回 esbuild 以保持原有 CSS 写法不变。
            // 参见: https://github.com/vitejs/vite/issues/21911
            cssMinify: "esbuild",
            rollupOptions: {
                onwarn(warning, warn) {
                    // temporarily suppress this warning
                    if (
                        warning.message.includes("is dynamically imported by") &&
                        warning.message.includes("but also statically imported by")
                    ) {
                        return;
                    }
                    warn(warning);
                },
            },
        },
    },
});
