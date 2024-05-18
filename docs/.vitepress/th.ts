import { defineConfig } from "vitepress";
import { sidebar } from "./shared";

export const th = defineConfig({
  lang: "th",
  
  description: "ไทย",

  themeConfig: {
    nav: [
      { text: "หน้าแรก", link: "/th" },
      { text: "หนังสือ", link: "/th/intro" },
    ],
    sidebar: sidebar({
      locale: "th",
    }),

    footer: {
        message:
          'เนื้อหาอยู่ภายใต้ใบอนุญาต <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="blank">CC BY-NC-ND 4.0</a>',
        copyright: `ลิขสิทธิ์ © 2567-${new Date().getFullYear()+543} ธาดา หวังธรรมมั่ง`,
      },
  
      editLink: {
        pattern:
          "https://github.com/mildronize/type-safe-design-pattern/tree/main/docs/th/:path",
      },
  },
});
