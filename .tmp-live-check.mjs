// 临时脚本：验证线上站点。用法：node .tmp-live-check.mjs https://xxx.vercel.app
const base = process.argv[2].replace(/\/$/, "");

const UA =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// [路径, 必须包含的内容（null 表示只要求 2xx）]
const cases = [
	["/robots.txt", "Sitemap"],
	["/rss.xml", "hello-serverless-blog"],
	["/sitemap-index.xml", "sitemap"],
	["/", null],
	["/about-privacy/", null],
];

let bad = 0;
for (const [path, marker] of cases) {
	try {
		const res = await fetch(base + path, {
			headers: { "user-agent": UA },
			redirect: "manual",
		});
		const body = await res.text();
		const challenge = body.includes("正在确认您是真人");
		const is503 = res.status === 503;
		const ok = marker ? res.ok && body.includes(marker) : res.ok;
		if (!ok) bad++;
		console.log(
			`${res.status} ${ok ? "OK " : "BAD"} ${path.padEnd(20)} len=${String(body.length).padStart(6)} PoW挑战页=${challenge} 503=${is503}${marker ? ` 含「${marker}」=${body.includes(marker)}` : ""}`,
		);
	} catch (err) {
		bad++;
		console.log(`ERR ${path} ${err.message}`);
	}
}

// 若为 503，把响应体打出来——那是 ALBIREO_SECRET 没配的信号
try {
	const res = await fetch(base + "/", { headers: { "user-agent": UA } });
	if (res.status === 503) {
		console.log("503 响应体:", (await res.text()).slice(0, 200));
	}
} catch {}

console.log(bad === 0 ? "LIVE_OK" : `ISSUES=${bad}`);
