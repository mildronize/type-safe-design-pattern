import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  title: "Type-safe Design Pattern",
  description:
    "Ready to use design Pattern for type-safe approach in modern typescript",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Book", link: "/intro" },
    ],

    sidebar: [
      {
        text: "Start Reading",
        collapsed: true,
        items: [
          { text: "Introduction", link: "/intro" },
          { text: "Examples", link: "/examples" },
        ],
      },
      {
        text: "Data Structure",
        collapsed: true,
        items: [
          { text: "Intro", link: "/data-structure/data-structure" },
          { text: "Literal String", link: "/data-structure/literal-string" },
          { text: "Tuple", link: "/data-structure/tuple" },
          { text: "Record Object", link: "/data-structure/record-object" },
        ],
      },
      {
        text: "Design Patterns",
        collapsed: true,
        items: [
          { text: "Intro", link: "/design-patterns/design-patterns" },
          { text: "Builder Pattern", link: "/design-patterns/builder-pattern" },
          {
            text: "Function Overloading",
            link: "/design-patterns/function-overload",
          },
          {
            text: "Function Argument",
            link: "/design-patterns/function-argument",
          },
        ],
      },
      {
        text: "Performance",
        collapsed: true,
        items: [
          { text: "Intro", link: "/performance/performance" },
        ],
      },

    ],
    footer: {
      message: 'Content License under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="blank">CC BY-NC-ND 4.0</a>',
      copyright: 'Copyright © 2024-present Thada Wangthammang'
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mildronize/type-safe-design-pattern",
      },
    ],
    search: {
      provider: "local",
    },
    editLink: {
      pattern: 'https://github.com/mildronize/type-safe-design-pattern/tree/main/docs/:path'
    }
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
  },
});
