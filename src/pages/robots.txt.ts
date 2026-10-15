import type { APIRoute } from "astro";

// BASE_URL 在 GitHub Pages（子路径部署）下是 "/GodSaying_blog/"，在 Vercel 与本地是 "/"。
// 必须带上它，否则 robots.txt 里的 sitemap 地址会漏掉子路径而指向 404。
const base = import.meta.env.BASE_URL.endsWith("/")
	? import.meta.env.BASE_URL
	: `${import.meta.env.BASE_URL}/`;

const robotsTxt = `
User-agent: *
Disallow: ${base}_astro/

Sitemap: ${new URL(`${base}sitemap-index.xml`, import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
