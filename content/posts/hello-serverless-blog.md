---
title: 本站上线：用 Serverless 搭一个属于自己的博客
published: 2026-10-15
description: 记录这个站点的搭建过程——fork 一个 Astro 博客模板、清掉原作者的所有配置、改造成自己的样子，再推到 Vercel 上免费托管。
tags: [博客, Astro, Vercel]
lang: zh_CN
draft: false
pinned: true
---

## 为什么要自己搭

写东西这件事，最怕的是「想写的时候工具不顺手」。租一台服务器、配 Nginx、折腾 HTTPS 和备案，这些事本身跟写作没关系，却会消耗掉真正想写作的精力。

所以这次选了 Serverless 的路子：**内容就是仓库里的 Markdown，构建和托管全交给平台**。不买服务器、不管运维，推一次代码就上线，成本是零。

## 技术选型

本站基于 [Fuwari](https://github.com/saicaca/fuwari) —— 一个用 Astro 写的静态博客主题。选它的原因很简单：

- **Astro 的零 JS 默认策略**：页面默认输出纯 HTML，只有需要交互的组件才加载 JavaScript，首屏很快。
- **Markdown 即内容**：文章就是 `.md` 文件，配合 Git 做版本管理，误删也能找回来。
- **纯静态产物**：构建出来是一堆 HTML/CSS/JS 文件，扔到任何静态托管上都能跑，不存在「被平台绑定」的问题。

## 部署链路

整条链路是这样的：

```
本地写 Markdown
      ↓  git push
   GitHub 仓库
      ↓  自动触发构建
    Vercel（pnpm build → dist/）
      ↓
   全球 CDN 分发
```

每次 `git push` 到 `main` 分支，Vercel 会自动跑一次 `pnpm build`，把 `dist/` 目录发布到 CDN。整个过程不需要手动操作，也不需要本地有构建环境——甚至可以直接在 GitHub 网页上改一篇文章，改完自动发布。

## 关于配图

文章里引用图片有两种方式：

```markdown
<!-- 相对路径，图片放在文章同级目录 -->
![描述](./cover.jpg)

<!-- 绝对路径，图片放在 public/ 目录下 -->
![描述](/images/screenshot.png)
```

封面图通过 frontmatter 的 `image` 字段指定：

```yaml
---
title: 文章标题
published: 2026-10-15
image: ./cover.jpg
---
```

## 接下来

这个站点会用来记录技术折腾的过程和一些零散的想法。如果你也想搭一个，这套方案的全部成本就是一个域名（甚至可以不买，用平台赠送的二级域名），其他都是免费的。
