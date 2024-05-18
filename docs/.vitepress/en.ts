import { DefaultTheme, defineConfig } from "vitepress";
import { sidebar } from "./shared";

// https://vitepress.dev/reference/site-config
export const en = defineConfig({
  lang: "en-US",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Book", link: "/intro" },
    ],

    sidebar: sidebar(),

    footer: {
      message:
        'Content License under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="blank">CC BY-NC-ND 4.0</a>',
      copyright: `Copyright © 2024-${new Date().getFullYear()} Thada Wangthammang`,
    },

    editLink: {
      pattern:
        "https://github.com/mildronize/type-safe-design-pattern/tree/main/docs/:path",
    },
  },
});

