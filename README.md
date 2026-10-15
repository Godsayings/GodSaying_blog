# GodSaying 的博客

个人博客，基于 [Fuwari](https://github.com/saicaca/fuwari)（经 [Besty0728/fuwari](https://github.com/Besty0728/fuwari) 与 [Kazusa1085/Fuwari_blog](https://github.com/Kazusa1085/Fuwari_blog) 两代魔改）二次改造而来。

- **框架**：Astro 7 + Svelte 5 + Tailwind CSS 4
- **内容**：Markdown，直接放在本仓库的 `content/` 目录
- **部署**：Vercel（纯静态构建 + 边缘中间件）
- **成本**：0（Vercel 免费套餐足够个人博客使用）

---

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # 产物输出到 dist/
pnpm preview      # 本地预览构建产物
```

### 只有在「受限沙箱」里开发才需要处理（普通终端请跳过本节）

> 在普通终端里 `pnpm install && pnpm dev` 直接可用。
> 下面三条是在 DSH 这类**受限沙箱**里实测到的，根因都是「沙箱只允许写工作目录」以及
> 它会干扰模块加载，**与代码本身无关**，也不需要写进仓库配置。

**1. pnpm 想把自己切换到 `packageManager` 指定的版本**

仓库的 `.npmrc` 里写着 `manage-package-manager-versions = true`，`package.json` 里写着
`"packageManager": "pnpm@9.15.9"`，于是本机的 pnpm 10 会试图把 9.15.9 下载到
`%LOCALAPPDATA%\pnpm\.tools`——工作目录之外，被沙箱拦下，报 `EPERM`。

绕过：用本机已装的 pnpm，不让它切换版本。

```powershell
$env:npm_config_manage_package_manager_versions = 'false'
```

**2. Astro 遥测想写 `%APPDATA%\astro`**

同样落在工作目录之外，报 `EPERM`。顺带一提，关掉它也能避免构建数据被回传 Astro。

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
```

**3. Vite 加载 CJS 依赖会失败**

即使上面两条都处理了，沙箱里 `astro build` 和 `astro dev` 仍会报：

```
[astro] Unable to load your Astro config
Cannot set properties of undefined (setting 'sax')
```

这是沙箱干扰 Vite 模块加载导致的。已用同一命令做过对照实验：**放宽权限后立即构建成功**，
换依赖布局（isolated / hoisted）和换 Node 版本（24 / 26）都不改变结果。在沙箱里只能放宽
权限运行构建或开发服务器；普通终端不会出现这个问题。

### 沙箱内的完整构建命令

```powershell
$env:npm_config_manage_package_manager_versions = 'false'
$env:ASTRO_TELEMETRY_DISABLED = '1'
pnpm build        # 需要允许写工作目录之外（放宽沙箱权限）
```

---

## 写文章

```bash
pnpm new-post "文章标题"
```

会在 `content/posts/` 下生成一个 Markdown 文件。也可以手动创建，frontmatter 字段如下：

```yaml
---
title: 文章标题
published: 2026-10-15      # 必填
updated: 2026-10-16        # 可选，提交时 pre-commit 钩子会自动更新
description: 文章摘要        # 用于 SEO 与列表页
image: ./cover.jpg         # 可选，封面图
tags: [技术, 教程]          # 可选
lang: zh_CN                # 可选
draft: false               # true 则只在开发模式可见
pinned: true               # true 则置顶
---
```

### 内容目录结构

```
content/
├── posts/       # 文章（.md），文件名即 URL
├── friends/     # 友链（每站一个 .json，_order.json 控制顺序）
├── projects/    # 作品集（.json）
└── apps/        # 应用（.json）
```

以上内容都**随本仓库提交**，推送到 GitHub 后 Vercel 会自动重新构建。

> 上游原仓库把 `content/` 放在独立的内容仓库里、构建时 clone 进来，因此它的 `.gitignore`
> 忽略 `content/`。本站已改为本地内容，`.gitignore` 里**不再忽略** `content/`。
>
> ⚠️ 如果哪天发现线上文章没更新，先确认 `content/` 是否真的提交进仓库了——内容缺失时
> 构建仍然是绿的，很容易误判成「部署成功」。

---

## 配置

主要配置都在 `src/config.ts`：

| 配置项 | 说明 | 当前状态 |
| :--- | :--- | :--- |
| `siteConfig` | 站点标题、副标题、描述、主题色相、背景图、favicon | 已按本站定制 |
| `navBarConfig` | 导航栏显示哪些页面 | 首页/归档/友链/应用/作品 |
| `profileConfig` | 头像、名字、简介、社交链接 | 已填 |
| `antiLeechConfig` | 防盗链域名白名单 | 关闭 |
| `umamiConfig` | Umami 统计 | 关闭 |
| `googleAnalyticsConfig` | Google Analytics | 关闭 |
| `imageFallbackConfig` | 双 CDN 图床回退 | 关闭 |

其余常改的地方：

- **主题色相**：`siteConfig.themeColor.hue`（当前 200，青色）
- **自定义背景图**：`siteConfig.background.src`（当前是第三方随机图 API，依赖外部服务）
- **博主坐标**：`src/scripts/visitor-info.ts` 里的 `BLOGGER_LAT` / `BLOGGER_LON`，
  用于侧边栏的「与博主距离」（当前填的是南极点 `-90, 0`）
- **站点域名**：`astro.config.mjs` 的 `site` 字段（在 Vercel 上自动取自部署域名）

> `site` 决定 canonical、sitemap、RSS 里的绝对地址。在 Vercel 上它由
> `VERCEL_PROJECT_PRODUCTION_URL`（生产域名）自动推导，绑自定义域名后**无需改代码**；
> 只有在非 Vercel 平台部署时，才需要手动改 `astro.config.mjs` 里那个默认值。

---

## 部署到 Vercel

1. 把本仓库推到 GitHub（已完成）
2. Vercel → Add New Project → 导入本仓库
3. Framework 选 Astro；构建命令 `pnpm build`、输出目录 `dist`
   （`vercel.json` 里已写好，通常会自动识别）
4. **配置环境变量**（Settings → Environment Variables）：

| 变量 | 值 | 说明 |
| :--- | :--- | :--- |
| `ALBIREO_SECRET` | 一串足够长的随机字符串 | **必填**，缺失会让整站返回 503 |
| `ALBIREO_ENABLED` | `true` / `false` | PoW 防爬总开关，默认 `true` |
| `ASTRO_TELEMETRY_DISABLED` | `1` | 可选，关掉构建期遥测 |

生成随机密钥：

```bash
openssl rand -hex 32
# Windows 上没有 openssl 时用 Node：
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. 部署完成后**不需要再改代码**：`astro.config.mjs` 会从 Vercel 注入的
   `VERCEL_PROJECT_PRODUCTION_URL` 自动取部署域名，以后绑定自定义域名也会自动跟随

### 关于 PoW 防爬（`middleware.ts`）

`middleware.ts` 是 Vercel 的边缘中间件，会对访客下发一道工作量证明（PoW）挑战来挡爬虫。
几点必须知道：

- 它**拦截所有路由**，包括首页
- `ALBIREO_ENABLED` 默认是 `true`
- `ALBIREO_SECRET` 没配时，除静态资源与 sitemap 等元数据外的请求**全部返回 503**——最容易踩的坑
- 想彻底关掉就设 `ALBIREO_ENABLED=false`，站点立即恢复正常
- 纯静态托管（Cloudflare Pages、GitHub Pages 等）不会执行这个中间件

其他可调变量：`ALBIREO_DIFFICULTY`（默认 4）、`ALBIREO_CHALLENGE_TTL`（默认 5 分钟）、
`ALBIREO_SOLVED_TTL`（默认 24 小时）。

---

## 评论区

文章页的评论区目前是**关闭**的。上游原仓库接的是作者自己的 giscus 仓库，
照搬会让读者把评论写进别人的 Discussions，所以已经移除。

要接自己的评论区，见 `src/pages/posts/[...slug].astro` 里那段注释：

1. 给一个**公开** GitHub 仓库开启 Settings → General → Features → **Discussions**
2. 到 [giscus.app](https://giscus.app) 安装 giscus App 到该仓库，并选定一个 Discussion 分类
3. 把 giscus.app 生成的 `data-repo` / `data-repo-id` / `data-category` / `data-category-id`
   填回那个 `<script>` 标签

---

## 目录导览

```
src/
├── config.ts          # 站点配置入口（最常改的就是它）
├── content.config.ts  # 内容集合与 frontmatter 校验规则
├── layouts/           # 页面布局
├── pages/             # 路由页面
├── components/        # UI 组件
└── plugins/           # remark / rehype 插件
content/               # 文章与友链等实际内容（随仓库提交）
middleware.ts          # Vercel 边缘中间件（PoW 防爬）
vercel.json            # Vercel 配置：构建命令、响应头、重定向
```

常用命令：`pnpm dev` / `pnpm build` / `pnpm preview` / `pnpm new-post "标题"` /
`pnpm lint`（Biome 检查并修复）/ `pnpm format`。

---

## 许可与出处

- **代码**：[MIT](./LICENSE)，版权归 saicaca、Besty0728 与 Godsayings
- **文章内容**：[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

上游链路：`saicaca/fuwari` → `Besty0728/fuwari` → `Kazusa1085/Fuwari_blog` → 本仓库。

> 仓库根目录还有几份上游带来的文档（`BLOG_GUIDE.md`、`FUWARI_CUSTOMIZATIONS.md`、
> `docs/AI_DEPLOYMENT_GUIDE.md`），它们描述的是**上游作者自己的站点**，其中部分内容已与当前
> 代码不符（例如文档里提到的 base64 加密域名数组在当前代码中并不存在；README 里写的
> 部署平台 Netlify 也没有对应配置文件）。请以本 README 为准。
