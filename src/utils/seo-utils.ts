const META_DESCRIPTION_MIN_LENGTH = 150;
const META_DESCRIPTION_MAX_LENGTH = 160;

export interface MetaDescriptionOptions {
	description?: string;
	excerpt?: string;
	title?: string;
	siteName?: string;
	subtitle?: string;
	category?: string;
	tags?: string[];
}

function normalize(text: string): string {
	return text
		.replace(/\s+/g, " ")
		.replace(/。{2,}/g, "。")
		.replace(/\.。+/g, "。")
		.trim();
}

export function buildMetaDescription({
	description,
	excerpt,
	title,
	siteName,
	subtitle,
	category,
	tags,
}: MetaDescriptionOptions): string {
	const parts = [description, excerpt]
		.map((part) => part?.trim())
		.filter((part): part is string => Boolean(part));

	let text = normalize(parts.join("。"));

	// 站点名与副标题只在「完全没有描述」时兜底。
	// 原实现是「不足 MIN_LENGTH 就继续往上拼」，而中文描述天然短于 150 字符，
	// 于是首页会拼出「……记录技术学习、开发实践与日常折腾。GodSaying 的博客。
	// 记录与技术折腾。」这种重复文案，在搜索结果里很难看，所以改成只做兜底。
	if (!text) {
		text = normalize([siteName, subtitle].filter(Boolean).join("。"));
	}

	const fallbackParts = [
		title ? `《${title}》` : "",
		category ? `分类：${category}` : "",
		tags && tags.length > 0 ? `标签：${tags.join("、")}` : "",
	].filter(Boolean);

	for (const part of fallbackParts) {
		if (text.length >= META_DESCRIPTION_MIN_LENGTH) break;
		if (text.includes(part)) continue;
		text = normalize(`${text}。${part}`);
	}

	if (text.length > META_DESCRIPTION_MAX_LENGTH) {
		text = `${text.slice(0, META_DESCRIPTION_MAX_LENGTH - 1).trim()}…`;
	}

	return text;
}
