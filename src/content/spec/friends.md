# 友链

欢迎互换友链。每一条友链是 `content/friends/` 目录下的一个 JSON 文件，文件名就是排序依据（也可以用同目录的 `_order.json` 指定顺序）。

<details>
<summary>点击查看申请方式与 JSON 格式示例</summary>

在 `content/friends/` 下新建一个 `.json` 文件，例如 `example.json`：

```json
{
  "name": "站点名称",
  "url": "https://example.com",
  "avatar": "https://example.com/avatar.png",
  "introduction": "一句话介绍",
  "friendsPage": "https://example.com/friends/"
}
```

字段说明：

| 字段 | 必填 | 说明 |
| :--- | :--- | :--- |
| `name` | 是 | 站点名称 |
| `url` | 是 | 站点首页地址 |
| `avatar` | 是 | 头像图片地址 |
| `introduction` | 是 | 一句话介绍 |
| `friendsPage` | 是 | 对方的友链页面地址，用于核对是否已添加本站 |

`_order.json` 是一个字符串数组，内容为文件名（不含 `.json`），用来控制展示顺序；没列进去的会按文件名排在最后。没有这个文件也能正常渲染。

</details>

---
