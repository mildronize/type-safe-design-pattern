import { defineConfig } from "vitepress";
import { baseSidebar } from "./shared";

const prefix = "/th";
/**
 * Note: Use prefix only tranlated page
 */
export const thSidebar = baseSidebar
  .clone()
  .overrideGroup("/", { text: "เริ่มต้นอ่าน" })
  .override("/", "intro", { text: "บทนำ", prefix })
  .toSidebarItems();

export const th = defineConfig({
  lang: "th",

  description: "ไทย",

  themeConfig: {
    nav: [
      { text: "หน้าแรก", link: prefix },
      { text: "หนังสือ", link: prefix + "/intro" },
    ],
    sidebar: thSidebar,

    footer: {
      message:
        'เนื้อหาอยู่ภายใต้ใบอนุญาต <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="blank">CC BY-NC-ND 4.0</a>',
      copyright: `ลิขสิทธิ์ © 2567-${new Date().getFullYear() + 543} ธาดา หวังธรรมมั่ง`,
    },

    editLink: {
      pattern: "https://github.com/mildronize/type-safe-design-pattern/tree/main/docs/th/:path",
    },
  },
});
