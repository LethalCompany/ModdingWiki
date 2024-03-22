---
prev: false
next: false
description: 如何向 Wiki 贡献新文章。
---

# 贡献文章

感谢你决定向此 Wiki 贡献文章！ 这个 Wiki 能走到这一步并继续发展的唯一途径就是通过贡献。

本指南将帮助你编写文章、格式化文章并将其实施到 Wiki 中。

## 分叉 GitHub 仓库 {#forking-the-repo}

为了向 Wiki 发送拉取请求（PR）来请求添加你的文章，你必须分叉 [ModdingWiki 仓库](https://github.com/LethalCompany/ModdingWiki)（repo）。

要分叉 Wiki，相当简单。 你可单击网页上的“`Fork`”按钮，然后单击“`Create fork`”。

![GitHub 分叉仓库按钮](/images/writing-articles/forkgithubrepobutton.png)

![GitHub 创建分叉对话框](/images/writing-articles/forkgithubrepopopup.png)

现在我们已经创建了分叉！ 从此你可以对分支上的分叉进行更改，并在完成后创建 PR。

## 创建文件

创建文章文件非常简单。 将文件添加到你要添加的文件夹/子部分，譬如 API 的“`/docs/dev/api/`”，并创建一个 Markdown 文件（.md）。

:::danger 重要

例如，本文章名为“`writing-articles.md`”，位于“`/docs/extras/`”。
:::

## 查看你的文章

本网站使用 VitePress 将 Markdown 文件转为可查看的网页。 要在网页的上下文中查看你的文章很简单。

要运行 VitePress 并作为本地站点查看，请在终端中运行以下命令：

```shell
npm run dev
```

:::tip
其必须在你的仓库文件夹中运行。 你也可以使用自己的代码编辑器/IDE 中的终端来执行此操作。
:::

然后，终端将显示以下内容，此时你可以访问终端中给出的 URL：

![终端中显示的文本](/images/writing-articles/runvitepressterminal.png)

## Frontmatter

VitePress 使用“`YAML Frontmatter`”进行文章配置。 常用的设置有 `description`、`prev` 和 `next` 三种。

### Description

为了获得搜索引擎和嵌入的描述性信息，你必须在 front matter 添加 description。 为此，你需要在文章开头添加以下代码：

```md
---
description: 示例描述
---
```

::: tip
The description should be a short and descriptive; it should only be one to two sentences long.

例如，本文章的描述如下所示：

```md
---
description: 如何向 Wiki 贡献新文章。
---
```

:::

### Previous 与 Next

你也许在 Wiki 页面底部见过上一篇或下一篇文章按钮。 可以使用 `prev` 和 `next` 在 frontmatter 部分启用或禁用它们。

默认情况下，上一篇和下一篇按钮被禁用。 要启用这些按钮，你需要将这些选项设置为 true：

```md
---
prev: true // [!code ++]
next: true // [!code ++]
description: 示例描述
---
```

:::danger 重要

:::code-group

```md [correct.md]
---
prev: false
next: false
description: 示例描述
---

# 示例文章
```

```md [incorrect.md]
<!-- 多余的空格会导致错误 -->
---
prev: false
next: false
description: 示例描述
---

# 示例文章
```

:::

## 格式化

### Markdown

本 Wiki 使用 Markdown（.md）文件的修改版来编写文章，从而可以相当容易地编写新文章。
Markdown 本质上是一个简单的文本文件，带有助于格式化的“快捷方式”。
Discord 就是一个例子，你可以轻松地将消息格式设置为粗体、斜体等。

:::tip
[此 Markdown 指南](https://www.markdownguide.org/basic-syntax/)比本文给出的基础知识更详细。
:::

#### 常见用法

有几种简单的方法可以设置文本格式。

- 在字词的两侧使用“`**`”会**将该字词加粗**。
- 在字词的两侧使用“`_`”会 _使该字词斜体化_。
- 在字词的两侧使用“`***`”会_**将该字词加粗并斜体化**_。
- 在字词的两侧使用“`~~`”会~~将该字词添加删除线~~。

:::warning
These symbols generally _**must not**_ have spaces between them and the word(s) you are formatting.
:::

#### Headings

You may want headings in your article. These are places you can link to which will bring readers to that exact spot on the page. For example, [this links to the formatting heading](#formatting).

There are several different heading "sizes" you can use.

- Using `#` will create the main heading (h1). For example, [this links to a main heading](#contributing-articles).
- Using `##` will create the an h2 heading.

This pattern continues until `######`, which creates an h6 heading.

::: info
Unless there is an empty line between lines of text, headings, or other line symbols, the lines of text, heading, code, or whatever else will either not work or be separated as intended.

::: code-group

```[Correct]
This text is correctly formatted.

Extra sentence.

---

This text is correctly formatted.
Extra sentence.
```

```[Incorrect]
This text is incorrectly formatted.
Extra sentence.

---

This text is incorrectly formatted. Extra sentence.

```

:::

#### 代码

You likely will want to display code as examples for readers to view. To do this, there are both code and code blocks.

The main usage of code formatting is to `highlight a method` or `a field`. You can do so using a backtick (`` ` ``) around the code.

You may, however, want to display codeblocks instead. To do so, you can use three backticks (` ``` `) around the code. You can also use the [language identifier](https://shikiji.netlify.app/languages) to use color highlighting specific to that language.

For example, the following text, marked as a `C# Script`:

\`\`\`cs<br>
public void TestMethod()<br>
{<br>
&emsp;// code<br>
}<br>
\`\`\`

Will be formatted to look like this:

```cs
public void TestMethod()
{
    // code
}
```

### VitePress

This wiki uses [VitePress](https://vitepress.dev/) to turn markdown files into a working website. This comes with additional methods to format text into a prettier-looking article.

:::tip
[This Vitepress Guide](https://vitepress.dev/guide/markdown) goes into greater detail than the basics given in this article
:::

#### 容器

Containers hold little snippets of text that can be small asides, or important to pay attention to. The general method of creating a container is the following:

::: info<br>
Example container text<br>
:::

This will become formatted by VitePress to look like this:

:::info
Example container text
:::

Common containers are:

- `info`
- `tip`
- `warning`
- `danger`
- `details`

These will vary the coloring of the container. `details` specifically creates a hidden container that can hold more information.

:::details Example Details Container
隐藏信息
:::

#### 代码

You may want to highlight a line/section of code to bring attention to it. You can do this by specifying what lines you want highlighted in braces next to the language identifier.

\`\`\`cs {2,4-6}<br>
//Example Line 1<br>
//Example Line 2<br>
//Example Line 3<br>
//Example Line 4<br>
//Example Line 5<br>
//Example Line 6<br>
//Example Line 7<br>
\`\`\`

```cs {2,4-6}
//Example Line 1
//Example Line 2
//Example Line 3
//Example Line 4
//Example Line 5
//Example Line 6
//Example Line 7
```

You might also want to display the line numbers of code, which can be done by adding `:line-numbers` after the language identifier.

\`\`\`cs:line-numbers<br>
//Example Line 1<br>
//Example Line 2<br>
//...<br>
\`\`\`

```cs:line-numbers
//Example Line 1
//Example Line 2
//...
```

### 链接与图像

Adding links and images to your article is simple using Markdown, although the link itself is more special.

:::tip
Directory references start from `/docs/`, so don't add `/docs/` to references when linking to another article or an image.
:::

#### 链接

Using [markdown syntax](https://www.markdownguide.org/basic-syntax/#links), a link is as simple as wrapping the text in brackets and adding the link in parenthesis. For example, to link to the Wikipedia article on Lethal Company, one could do the following:

```md
Look at [this Wikipedia article](https://en.wikipedia.org/wiki/Lethal_Company) for basic info about the game.
```

To specifically link to another article in this wiki, you should use a `relational link` instead of a `hard link`. A `relational link` is the file directory, whereas a `hard link` is the actual website URL.

To link to another article, say the `Contributing Translations` article, you use the following syntax:

```md
[text](/contribute/translating-the-wiki)
```

:::warning
Do not use file extensions in the `relational link` for webpages/articles, doing so can lead to un-clean URLs (ex. translating-the-wiki.html)
:::

To link to a specific heading, you can add `#heading-anchor` to the link, where `heading-anchor` is the specific heading anchor you want to use. To find what anchor to use, click on the heading, and see what anchor is in the URL.

```md
[heading of another article](/installation/syncing-mods#exporting-a-profile)
```

::: tip
If you want to do it to another heading in your article, you can drop the link and only have the anchor, like so:

```md
[heading](#example-heading-anchor)
```

:::

#### 图像

To add images to your article, there are two steps:

:::info 1. Save the image in the correct directory

For example, all images used in this article are saved within `/docs/public/images/writing-articles`.
:::

:::info 2. Add it with the correct syntax

```md
![Example Image Alt Text](/images/writing-articles/example-image.png)
```

There are three important parts in this:

- The Exclamation Mark
  - This marks the link as an image.
- The Alt Text
  - This text will show if the image is not loaded.
- The Image Link
  - The directory of the image as well as the file name _**and extension**_.

::: warning
When adding the image link, you need to exclude `/public` from the link as VitePress will automatically look into that directory for images.
:::

## 将文章添加到侧边栏 {#adding-article-to-sidebar}

In order for people to easily navigate to your article, you must add it to the sidebar. You can do so in `docs/.vitepress/config.mts`.

First, you must decide which sidebar you want to add your article to. `'/'` is the `Beginner's Guide` sidebar and `'/modding/'` is the `Developer's Guide` sidebar.

Next, insert the following into your article location:

```ts
{
    text: 'Modding APIs',
        items: [
        { text: 'Modding APIs Overview', link: '/apis/modding-apis' },
        { text: 'CustomSounds', link: '/apis/customsounds'},
        { text: 'Overview', link: '/modding/apis/overview' },
        {
            text: 'Asset APIs',
            collapsed: false,
            items: [
                { text: 'CustomSounds', link: '/modding/apis/customsounds'},
            ]
        },
        {
            text: 'Programming APIs',
            collapsed: false,
            items: [
                { text: 'Example Article', link: '<directory>' }, // [!code focus] // [!code highlight]
            ]
        }
    ]
},
```

Where `Example Article` is the article name, and `<directory>` is the location and name of the article file. For example, `/modding/apis/example-article` would be a correct directory/link.

:::tip
Please ensure your article name is in **Title Case** when adding it to the sidebar.
:::

## 提交至 GitHub

Now that you've written your article, you can submit it easily! First, switch to the `Fork` tab in GitHub.

![Pull Request Tab on GitHub](/images/writing-articles/pullrequesttab.png)

There, you can create the pull request (PR) via the button in the top right:

![Create a Pull Request](/images/writing-articles/createpullrequestbutton.png)

Finally, you can select the branch you used on the right for head/compare, and the `main` branch in `LethalCompany/ModdingWiki` for base. If you can't see your fork as an option, click on `compare across forks`.

![Pull Request Selection Dialog](/images/writing-articles/createpullrequestdialog.png)

After selecting your branch to pull from, click `Create pull request`. A dialog with a title and description should show up:

![Pull Request Title and Description Dialog](/images/writing-articles/pullrequestdescription.png)

Here, name your PR and describe of what you added and/or changed. GitHub uses markdown formatting for the description, so you can use that to better show your changes.

Once you've written up the description, just press `Create pull request` in the bottom right, and your PR will be submitted!

:::tip
Please give a summary of what your PR adds and a list of changes made.
:::
