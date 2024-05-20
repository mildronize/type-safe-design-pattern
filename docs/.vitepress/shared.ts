import { defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
import { Sidebar } from "../../utils/utils";

export const shared = defineConfig({
  lastUpdated: true,
  title: "Type-safe Design Pattern",
  description: "Ready to use design Pattern for type-safe approach in modern typescript",
  markdown: {
    codeTransformers: [transformerTwoslash()],
  },

  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mildronize/type-safe-design-pattern",
      },
    ],
    search: {
      provider: "local",
    },
  },

  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    [
      "link",
      { href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap", rel: "stylesheet" },
    ],
  ],
});

interface SidebarOptions {
  isCollapsed?: boolean;
  /**
   * @default '' (Means en for English)
   */
  locale?: string;
}

export const baseSidebar = new Sidebar({
  collapsed: true,
})
  /**
   * Start Reading Section
   */
  .addGroup("/", { text: "Start Reading" })
  .add("/", "intro", { text: "Introduction", link: "/intro" })
  .add("/", "type-safe", { text: "What is Type-safe", link: "/type-safe" })
  .add("/", "project-structure", { text: "Project Structure", link: "/project-structure" })
  .add("/", "glossary", { text: "Glossary", link: "/glossary" })
  .add("/", "examples", { text: "Examples", link: "/examples" })
  /**
   * Data Structure Section
   */
  .addGroup("/data-structure", { text: "Data Structure" })
  .add("/data-structure", "data-structure", {
    text: "Intro",
    link: "/data-structure",
    docFooterText: "Intro to Data Structure",
  })
  .add("/data-structure", "literal-types", { text: "Literal Types", link: "/literal-types" })
  .add("/data-structure", "tuple", { text: "Tuple Types", link: "/tuple" })
  .add("/data-structure", "record-object", { text: "Record Types", link: "/record-object" })
  /**
   * Type Programming Section
   */
  .addGroup("/type-programming", { text: "Type Programming" })
  .add("/type-programming", "type-programming", {
    text: "Intro",
    link: "/type-programming",
    docFooterText: "Intro to Type Programming",
  })
  .add("/type-programming", "conditional-types", { text: "Conditional Types", link: "/conditional-types" })

  .addGroup("/type-programming/loop", { text: "Loop" })
  .add("/type-programming/loop", "mapped-types", { text: "Mapped Types", link: "/mapped-types" })
  .add("/type-programming/loop", "recursive-types", { text: "Recursive Types", link: "/recursive-types" })

  .add("/type-programming", "template-literal-types", {
    text: "Template Literal Types",
    link: "/template-literal-types",
  })
  .add("/type-programming", "testing", { text: "Testing", link: "/testing" })
  .add("/type-programming", "examples", { text: "Examples", link: "/examples" })
  /**
   * Design Patterns Section
   */
  .addGroup("/design-patterns", { text: "Design Patterns" })
  .add("/design-patterns", "design-patterns", {
    text: "Intro",
    link: "/design-patterns",
    docFooterText: "Intro to Design Patterns",
  })
  .add("/design-patterns", "loosen-and-tighten", { text: "Loosen and Tighten", link: "/loosen-and-tighten" })
  .add("/design-patterns", "builder-pattern", { text: "Builder Pattern", link: "/builder-pattern" })
  .add("/design-patterns", "function-overload", { text: "Function Overloading", link: "/function-overload" })
  .add("/design-patterns", "function-argument", { text: "Function Argument", link: "/function-argument" })
  /**
   * Framework Pattern Section
   */
  .addGroup("/framework-pattern", { text: "Framework Pattern" })
  .add("/framework-pattern", "framework-pattern", {
    text: "Intro",
    link: "/framework-pattern",
    docFooterText: "Intro to Framework Pattern",
  })
  .add("/framework-pattern", "config-file", { text: "Config File", link: "/config-file" })
  .add("/framework-pattern", "generate-dynamic-types", {
    text: "Generate Dynamic Types",
    link: "/generate-dynamic-types",
  })
  /**
   * Performance Section
   */
  .addGroup("/performance", { text: "Performance" })
  .add("/performance", "performance", {
    text: "Intro",
    link: "/performance",
    docFooterText: "Intro to Performance",
  });
