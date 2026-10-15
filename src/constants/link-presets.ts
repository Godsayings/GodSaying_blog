import { LinkPreset, type NavBarLink } from "@/types/config";

export const LinkPresets: Partial<Record<LinkPreset, NavBarLink>> = {
	[LinkPreset.Home]: {
		name: "首页",
		url: "/",
	},
	[LinkPreset.Archive]: {
		name: "归档",
		url: "/archive/",
	},
	[LinkPreset.Friends]: {
		name: "友链",
		url: "/friends/",
	},
	[LinkPreset.Apps]: {
		name: "应用",
		url: "/apps/",
	},
	// 原仓库的 [LinkPreset.Stats] 指向作者自建的 Umami 分享页（外链，不是本站页面），已移除。
	// 以后若自建 Umami，把下面这段加回来，并把 url 换成你自己的分享链接：
	// [LinkPreset.Stats]: { name: "统计", url: "https://你的umami域名/share/你的shareId", external: true },
	[LinkPreset.Works]: {
		name: "作品集",
		url: "/works/",
	},
};
