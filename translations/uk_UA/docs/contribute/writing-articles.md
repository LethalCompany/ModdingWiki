---
prev: false
next: false
description: How to contribute new articles to the wiki.
---

# Contributing Articles

Дякую вам що вирішили зробити внесок в написання цієї вікі! Тільки завдяки вам ми зайшли так далеко, і продовжуємо рости з вашою допомогою.

Ця інструкція допоможе вам в написанні, форматуванні та створенні статей в цю вікі.

## Форк GitHub Repository {#forking-the-repo}

Для того щоб відправити Pull Request (PR) для цієї вікі, вам треба зробити форк [репозиторію](https://github.com/LethalCompany/ModdingWiki) (repo).

Форкнути дуже просто. Вам треба натиснути на кнопку `Fork`, після клікнути `Create fork`.

![GitHub Fork Repo Button](/images/writing-articles/forkgithubrepobutton.png)

![GitHub Create Fork Dialog](/images/writing-articles/forkgithubrepopopup.png)

Ви успішно створили форк! Тепер ви можете робити зміни в окрему гілку та створити PR як буде готово.

## Створення файлу

Створення файлу достатньо просте. Спочатку створіть файл опису директорії, наприклад у теці `/docs/dev/api/` для АПІ додайте маркдун файл (.md).

:::danger ВАЖЛИВО

Для прикладу створіть `writing-articles.md` розташований в `/docs/extras/`.
:::

## Перегляд своєї статті

Цей вебсайт використовує VitePress для того щоб формувати з markdown файлів читабельні вебсторінки. Для того щоб переглянути свій файл як сторінку, треба зробити наступні дії.

Щоб запустити VitePress як локальний сайт, виконайте наступну команду в терміналі:

```shell
npm run dev
```

:::tip
Ця команда має виконуватись в теці репозиторію. Ви можете зробити це зі свого улюбленого редактора коду/IDE.
:::

Термінал має вивести наступне посилання, через яке можна відкрити вебсторінку:

![Displayed Text in Terminal](/images/writing-articles/runvitepressterminal.png)

## Frontmatter

VitePress використовує `YAML Frontmatter` для налаштовування статтей. Три найчастіші налаштування `description`, `prev`, та `next`.

### Description

Для того щоб описати певну інформації для пошукового двигуна та вкладень, вам потрібно додати тег `description`. Для цього необхідно додати такий код на початок статті:

```md
---
description: Example description
---
```

::: tip
The description should be a short and descriptive; it should only be one to two sentences long.

Наприклад:

```md
Як зробити власний внесок в цю вікі
```

:::

### Попередня та Наступна

Ви могли помітити попередню та наступну кнопки під кожною статтею. Вони можуть бути додані або вилученні, використовуючі ключові слова `prev` та `next`.

За замовчуванням, ці кнопки вимкненні. Для того щоб їх активувати, вам потрібно встановити такі опції:

```md
---
prev: true // [!code ++]
next: true // [!code ++]
description: Приклад опису
---
```

:::danger ВАЖЛИВО

:::code-group

```md [correct.md]
---
prev: false
next: false
description: Приклад опису
---

# Приклад статті
```

```md [incorrect.md]
<!-- Зайві пробіли можуть викликати проблеми -->
---
prev: false
next: false
description: Приклад опису
---

# Приклад статті
```

:::

## Форматування

### Markdown

Ця вікі використовує модифіковану верcію markdown (.md) для написання статей, дозволяючи достатньо легко створювати нові статі.
Markdown по суті це простий текстовий файл з допоміжними функціями, що допомагають форматуванню.
Наприклад в Діскорді, ви можете легко форматувати свої повідомлення, роблячи їх товстим, курсивом, тощо.

:::tip
[Ця Markdown інструкція](https://www.markdownguide.org/basic-syntax/) розповідає більш детально, чим описано тут.
:::

#### Найпоширеніші використання

Є декілька простих способів форматувати текст.

- Використання `**` з обох боків слова/фрази **робить жирним слово/фразу**.
- Використання `_` з обох боків слова/фрази _робить слово/фразу курсивом_.
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
