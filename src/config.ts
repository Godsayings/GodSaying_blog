import type {
	AntiLeechConfig,
	ExpressiveCodeConfig,
	ImageFallbackConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
	UmamiConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "GodSaying 的博客",
	subtitle: "记录与技术折腾",
	description: "GodSaying 的个人博客，记录技术学习、开发实践与日常折腾。",

	keywords: [],
	lang: "zh_CN", // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko', 'es', 'th'
	// 在 Google Search Console 拿到属于你自己的验证 token 后填在这里；留空则不输出该 meta 标签
	googleSiteVerification: "",
	themeColor: {
		hue: 200, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // Hide the theme color picker for visitors
		forceDarkMode: true, // Force dark mode and hide theme switcher
	},
	banner: {
		// 首页顶部大图，默认关闭。要开启就把它设为 true，并把 src 指向一张真实存在的图
		enable: false,
		src: "/og.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'

		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed

			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	background: {
		enable: true, // Enable background image
		src: "https://www.loliapi.com/acg", // 每次访问取一张随机图（第三方服务）
		position: "center", // Background position: 'top', 'center', 'bottom'
		size: "cover", // Background size: 'cover', 'contain', 'auto'
		repeat: "no-repeat", // Background repeat: 'no-repeat', 'repeat', 'repeat-x', 'repeat-y'
		attachment: "fixed", // Background attachment: 'fixed', 'scroll', 'local'
		opacity: 0.5, // Background opacity (0-1)
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "/favicon/icon.png", // Path of the favicon, relative to the /public directory
			//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
			//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Friends,
		LinkPreset.Apps,
		LinkPreset.Works,
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "https://avatars.githubusercontent.com/u/61729043?v=4", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Godsayings",
	bio: ["Studying"],
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github-alt",
			url: "https://github.com/Godsayings",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

//图片回退（双 CDN 图床回退）。本站暂未使用图床，保持关闭；
//需要时填入你自己的图床域名，并把 enable 改成 true。
export const imageFallbackConfig: ImageFallbackConfig = {
	enable: false,
	originalDomain: "", // 主力图床域名
	fallbackDomain: "", // 备用图床域名
};

// Umami 统计。本站未接入，保持关闭；接入自己的实例后再填 baseUrl / shareId。
export const umamiConfig: UmamiConfig = {
	enable: false,
	baseUrl: "",
	shareId: "",
	timezone: "Asia/Shanghai",
};

// 防盗链/域名保护配置：非白名单域名访问时弹出安全提醒。
// 目前关闭。等你有了正式域名，把域名填进 officialSites 再开启即可。
// 注意：localhost、127.0.0.1 与 *.vercel.app 始终放行，不需要写进白名单。
export const antiLeechConfig: AntiLeechConfig = {
	enable: false,
	officialSites: [],
	debug: false,
	warningTitle: "⚠️ 域名安全警告",
	warningMessage:
		"您可能正在访问非官方网站，存在安全风险！建议跳转到官方网站。",
};

// Google Analytics。本站未接入，保持关闭；关闭后 Cookie 同意弹窗也不会出现。
export const googleAnalyticsConfig = {
	enable: false,
	measurementId: "",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
