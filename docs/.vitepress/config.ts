import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";

const isCollapsed = true;

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
        collapsed: isCollapsed,
        items: [
          { text: "Introduction", link: "/intro" },
          { text: "What is Type-safe", link: "/type-safe" },
          { text: "Examples", link: "/examples" },
        ],
      },
      {
        text: "Data Structure",
        collapsed: isCollapsed,
        items: [
          { text: "Intro", link: "/data-structure/data-structure" },
          { text: "Literal String", link: "/data-structure/literal-string" },
          { text: "Tuple", link: "/data-structure/tuple" },
          { text: "Record Object", link: "/data-structure/record-object" },
        ],
      },
      {
        text: "Design Patterns",
        collapsed: isCollapsed,
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
        text: "Framework Pattern",
        collapsed: isCollapsed,
        items: [
          { text: "Intro", link: "/framework-pattern/framework-pattern" },
          { text: "Config File", link: "/framework-pattern/config-file" },
        ],
      },
      {
        text: "Type Programming",
        collapsed: isCollapsed,
        items: [
          { text: "Intro", link: "/type-programming/type-programming" },
          { text: "Conditional Types", link: "/type-programming/conditional-types" },
          { text: "Loop with Recursive Types" , link: "/type-programming/loop-with-recursive-types"},
          { text: "Template Literal Types", link: "/type-programming/template-literal-types" },
          { text: "Testing", link: "/type-programming/testing" },
          { text: "Examples", link: "/type-programming/examples" },
        ],
      },
      {
        text: "Performance",
        collapsed: isCollapsed,
        items: [{ text: "Intro", link: "/performance/performance" }],
      },
    ],
    footer: {
      message:
        'Content License under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="blank">CC BY-NC-ND 4.0</a>',
      copyright: "Copyright © 2024-present Thada Wangthammang",
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
      pattern:
        "https://github.com/mildronize/type-safe-design-pattern/tree/main/docs/:path",
    },
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
  },
});
