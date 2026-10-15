# 关于 & 隐私政策

最后更新日期：2026 年 10 月

## 概述

本站是一个**纯静态网站**，使用 [Astro](https://astro.build) 构建、托管在 Vercel 上，源码以 MIT 协议开源于 GitHub。页面在构建时就已经生成好，访问时由 CDN 直接返回文件——没有应用服务器，也没有数据库。

### 本站源码

::github{repo="Godsayings/GodSaying_blog"}

## 网站性质

因为是完全静态的站点：

- 我们**没有**服务端程序，因此不会在服务器上存储、处理或分析您的任何信息
- 没有注册、登录、评论表单等任何向服务端提交数据的入口
- 本站**不设置任何用于追踪的 Cookie**

## 本站实际加载的第三方资源

以下是页面访问过程中会向第三方发起的请求。它们由浏览器直接发起，对方能看到您的 IP 地址和浏览器标识，但本站无法读取这些数据：

| 资源 | 用途 | 说明 |
| :--- | :--- | :--- |
| 背景图 API | 首页随机背景图 | 每次访问向该服务取一张随机图片 |
| IP 归属地接口 | 侧边栏显示您所在地区 | 由浏览器把请求发给公开的 IP 查询服务，本站不记录结果 |
| jsDelivr | 渲染文章中的流程图 | 仅当文章包含 Mermaid 图表时加载 |

> 本站**没有**接入任何网站统计或广告服务（Google Analytics、Umami 等均未启用），也不存在任何用户画像或数据回传。

## 本地存储

本站使用浏览器本地存储保存您的**显示偏好**，这些数据只存在于您自己的浏览器里，不会上传：

| 键名 | 用途 |
| :--- | :--- |
| 主题 / 显示偏好 | 记住您的界面设置 |
| Cookie 同意状态 | 仅在站点启用统计服务时才会用到 |

### 清理本地存储

在浏览器开发者工具中清除本站的本地存储，或直接清除浏览数据即可。若本站将来启用了统计服务，也可以用下方按钮重置同意状态：

<button id="reset-cookie-consent" style="padding:8px 20px;border-radius:8px;border:none;background:var(--primary,#a78bfa);color:#fff;font-size:14px;cursor:pointer;font-weight:600;margin:8px 0;">重置同意状态 / Reset Consent</button>
<span id="reset-cookie-msg" style="margin-left:10px;font-size:13px;color:var(--primary,#a78bfa);display:none;"></span>

<script>
document.getElementById('reset-cookie-consent')?.addEventListener('click',function(){
  localStorage.removeItem('cookie-consent');
  var msg=document.getElementById('reset-cookie-msg');
  msg.textContent='✅ 已重置 / Reset done.';
  msg.style.display='inline';
});
</script>

## 您的选择

- 禁用 JavaScript 后，文章正文、归档等核心内容仍然可以正常阅读，只有背景图、侧边栏小部件等增强功能会失效
- 使用浏览器的隐私模式或广告拦截器不会影响本站的正常访问
- 您也可以直接关闭页面，本站不依赖任何会话状态

## 数据安全

本站通过 HTTPS 提供内容，源码公开可审计。由于没有服务端数据存储，也就不存在「本站数据库泄露」这类风险。

## 儿童隐私

本站是个人技术博客，不针对儿童，也不会主动收集任何人的个人信息。

## 政策更新

本政策如有变更会直接更新本页面。

---

*本政策的目的是如实说明本站的数据处理方式。如果您发现描述与实际行为不符，欢迎在 GitHub 仓库提 Issue 指正。*
