import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
          { text: "Use Cases", link: "/use-cases" },
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
          { text: "Function Overloading", link: "/design-patterns/function-overload" },
          { text: "Function Argument", link: "/design-patterns/function-argument" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mildronize/type-safe-design-pattern",
      },
    ],
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
  },
});
