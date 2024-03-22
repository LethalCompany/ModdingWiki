---
prev: false
next: false
description: Como contribuir com artigos para a wiki.
---

# Contribuindo com Artigos

Obrigado por decidir contribuir com artigos para esta wiki! A graças a contribuições que esta wiki chegou tão longe e continua crescendo.

Este guia lhe ajudará a escrever, formatar e implementar seu artigo na wiki.

## Fazendo o Fork de um Repositório do GitHub {#forking-the-repo}

Para fazer um Pull Request (PR) para a wiki, pedindo para que seu artigo seja adicionado, você deve fazer o fork do [repositório ModdingWiki](https://github.com/LethalCompany/ModdingWiki)(repo).

Para fazer um fork da wiki é bem simples. Clique no botão `Fork` na página, e então em `Create Fork`.

![Botão Fork Repo no GitHub](/images/writing-articles/forkgithubrepobutton.png)

![Dialog Fork Repo no GitHub](/images/writing-articles/forkgithubrepopopup.png)

Criamos um fork! Você pode fazer alterações em um ramo (branch) no fork e criar um PR quando terminar.

## Criando o Arquivo

Creating the article file is pretty simple. Add the file to the folder/subsection you are adding to, such as `/docs/dev/api/` for APIs, and create a markdown file (.md).

:::danger IMPORTANT

For example, this article is named `writing-articles.md` and is located in `/docs/extras/`.
:::

## Viewing Your Article

This website uses VitePress to turn the markdown files into viewable webpages. To view your article in context as a webpage, it's simple.

To run VitePress and view as a local site, run the following command in the terminal:

```shell
npm run dev
```

:::tip
This must run in your repo folder. You can do so using the terminal in the code editor/IDE that you use.
:::

The terminal will then display the following, at which point you can go to the URL given in the terminal:

![Displayed Text in Terminal](/images/writing-articles/runvitepressterminal.png)

## Frontmatter

VitePress uses `YAML Frontmatter` for article configs. There are three commonly used settings, `description`, `prev`, and `next`.

### Description

In order to have descriptive info for search engines and embeds, you have to add a description to the front matter. To do so, you need the following code at the start of your article:

```md
---
description: Example description
---
```

::: tip
The description should be a short and descriptive; it should only be one to two sentences long.

For example, the description for this article is the following:

```md
---
description: How to contribute new articles to the wiki.
---
```

:::

### Previous & Next

You may have seen previous or next article buttons at the bottom of wiki pages. They can be enabled or disabled in the frontmatter section, using `prev` and `next`.

By default, the previous and next buttons are disabled. To enable these buttons, you need to set the options to true:

```md
---
prev: true // [!code ++]
next: true // [!code ++]
description: Example description
---
```

:::danger IMPORTANT

:::code-group

```md [correct.md]
---
prev: false
next: false
description: Example description
---

# Example Article
```

```md [incorrect.md]
<!-- Extra space causes errors -->
---
prev: false
next: false
description: Example description
---

# Example Article
```

:::

## Formatting

### Markdown

This wiki uses a modified version of markdown (.md) files for articles, allowing a fairly easy process to write a new article.
Markdown essentially is a simple text file with "shortcuts" that help with formatting.
An example of this is in Discord, where you can easily format your messages to be bold, italicized, etc.

:::tip
[This Markdown Guide](https://www.markdownguide.org/basic-syntax/) goes into greater detail than the basics given in this article.
:::

#### Common Usages

There are a few simple ways to format text.

- Using `**` on either side of a word/phrase will **bold that word/phrase**.
- Using `_` on either side of a word/phrase will _italicize that word/phrase_.
- Using `***` on either side of a word/phrase will _**bold and italicize that word/phrase**_.
- Using `~~` on either side of a word/phrase will ~~strike that word/phrase out~~.

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

#### Code

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

#### Containers

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
Hidden info
:::

#### Code

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

### Links & Images

Adding links and images to your article is simple using Markdown, although the link itself is more special.

:::tip
Directory references start from `/docs/`, so don't add `/docs/` to references when linking to another article or an image.
:::

#### Links

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

#### Images

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

## Adding Your Article to the Sidebar {#adding-article-to-sidebar}

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

## Submitting to GitHub

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
