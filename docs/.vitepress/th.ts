import { defineConfig } from "vitepress";
import { baseSidebar } from "./shared";

const prefix = "/th";
/**
 * Note: Use prefix only tranlated page, the page is not translated will remove the link.
 */
export const thSidebar = baseSidebar
  .clone()
  .overrideGroup("/", { text: "เริ่มต้นอ่าน" })
  .override("/", "intro", { text: "บทนำ", prefix })
  .override("/", "type-safe", { text: "ความหมายของ Type-safe", prefix })
  .override("/", "glossary", { text: "คลังคำศัพท์", prefix })
  .override("/", "examples", { text: "ตัวอย่าง", prefix })
  .overrideGroup("/design-guideline", { text: "แนวทางการออกแบบ" })
  .override("/design-guideline", "design-guideline", { text: "บทนำ" })
  .override("/design-guideline", "when-type-safe", { text: "เมื่อไหร่ควรใช้ Type-safe" })
  .override("/design-guideline", "project-structure", { text: "โครงสร้างโปรเจกต์", prefix })
  .overrideGroup("/basic-types", { text: "โครงสร้างข้อมูล" })
  .override("/basic-types", "basic-types", { text: "บทนำ" })
  .override("/basic-types", "literal-types", {})
  .override("/basic-types", "tuple", {})
  .override("/basic-types", "record-object", {})
  .override("/basic-types", "template-literal-types", {})
  .overrideGroup("/type-programming", { text: "เขียนโปรแกรมด้วย Type" })
  .override("/type-programming", "type-programming", { text: "บทนำ" })
  .override("/type-programming", "conditional-types", { text: "เงื่อนไข (Conditional Types)" })
  .overrideGroup("/type-programming/loop", { text: "การวนลูป" })
  .override("/type-programming/loop", "mapped-types", {})
  .override("/type-programming/loop", "recursive-types", {})
  .override("/type-programming", "testing", { text: "การทดสอบ" })
  .override("/type-programming", "examples", { text: "ตัวอย่าง" })
  .overrideGroup("/design-patterns", { text: "รูปแบบการออกแบบ" })
  .override("/design-patterns", "design-patterns", { text: "บทนำ" })
  .override("/design-patterns", "loosen-and-tighten", { text: "ทำให้หลวมและแน่นขึ้น" })
  .override("/design-patterns", "builder-pattern", { text: "รูปแบบ Builder Pattern" })
  .override("/design-patterns", "function-overload", { text: "การใช้ Function หลายรูปแบบ" })
  .override("/design-patterns", "function-argument", { text: "การใช้ Argument ชนิดข้อมูลเป็นฟังก์ชัน" })
  .overrideGroup("/framework-pattern", { text: "การออกแบบของ Framework" })
  .override("/framework-pattern", "framework-pattern", { text: "บทนำ" })
  .override("/framework-pattern", "config-file", { text: "การใช้ไฟล์สำหรับการตั้งค่า" })
  .override("/framework-pattern", "generate-dynamic-types", { text: "การสร้างชนิดข้อมูลแบบยืดหยุ่น" })
  .overrideGroup("/performance", { text: "ประสิทธิภาพ" })
  .override("/performance", "performance", { text: "บทนำ" })
  .toSidebarItems();

export const th = defineConfig({
  lang: "th",

  description: "รูปแบบการออกแบบพร้อมใช้งานโดยมีชนิดข้อมูลที่ปลอดภัยใน typescript สมัยใหม่",

  themeConfig: {
    outline: {
      label: "สารบัญ",
    },
    docFooter: {
      next: "หน้าถัดไป",
      prev: "หน้าก่อนหน้า",
    },
    lastUpdated: {
      text: "อัพเดทล่าสุดเมื่อวันที่",
      formatOptions: {
        timeZone: "Asia/Bangkok",
        day: "numeric",
        month: "long",
        year: "numeric",
        forceLocale: true,
        hour: "numeric",
        minute: "numeric",
      },
    },
    nav: [
      { text: "หน้าแรก", link: prefix + "/" },
      { text: "หนังสือ", link: prefix + "/intro" },
    ],
    sidebar: thSidebar,

    footer: {
      message:
        'เนื้อหาอยู่ภายใต้ใบอนุญาต <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="blank">CC BY-NC-ND 4.0</a>',
      copyright: `ลิขสิทธิ์ © 2567-${new Date().getFullYear() + 543} ธาดา หวังธรรมมั่ง`,
    },

    editLink: {
      pattern: "https://github.com/mildronize/type-safe-design-pattern/tree/main/docs/:path",
      text: "แก้ไขหน้านี้บน GitHub",
    },
  },
});
