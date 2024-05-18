import { DefaultTheme, defineConfig } from "vitepress";
import { transformerTwoslash } from "@shikijs/vitepress-twoslash";
const isCollapsed = true;

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
});

interface SidebarOptions {
  isCollapsed?: boolean;
  /**
   * @default '' (Means en for English)
   */
  locale?: string;
}

export function sidebar(options?: SidebarOptions): DefaultTheme.SidebarItem[] {
  const isCollapsed = options?.isCollapsed ?? true;
  const lang = options?.locale ? `/${options.locale}` : "";
  return [
    {
      text: "Start Reading",
      collapsed: isCollapsed,
      items: [
        { text: "Introduction", link: `${lang}/intro` },
        { text: "What is Type-safe", link: `${lang}/type-safe` },
        { text: "Examples", link: `${lang}/examples` },
      ],
    },
    {
      text: "Data Structure",
      collapsed: isCollapsed,
      base: `${lang}/data-structure/`,
      items: [
        { text: "Intro", link: "data-structure" },
        { text: "Literal Types", link: "literal-types" },
        { text: "Tuple", link: "tuple" },
        { text: "Record Object", link: "record-object" },
      ],
    },
    {
      text: "Type Programming",
      collapsed: isCollapsed,
      base: `${lang}/type-programming/`,
      items: [
        { text: "Intro", link: "type-programming" },
        { text: "Conditional Types", link: "conditional-types" },
        { text: "Loop with Recursive Types", link: "loop-with-recursive-types" },
        { text: "Template Literal Types", link: "template-literal-types" },
        { text: "Testing", link: "testing" },
        { text: "Examples", link: "examples" },
      ],
    },
    {
      text: "Design Patterns",
      collapsed: isCollapsed,
      base: `${lang}/design-patterns/`,
      items: [
        { text: "Intro", link: "design-patterns" },
        { text: "Builder Pattern", link: "builder-pattern" },
        { text: "Function Overloading", link: "function-overload" },
        { text: "Function Argument", link: "function-argument" },
      ],
    },
    {
      text: "Framework Pattern",
      collapsed: isCollapsed,
      base: `${lang}/framework-pattern/`,
      items: [
        { text: "Intro", link: "framework-pattern" },
        { text: "Config File", link: "config-file" },
      ],
    },
    {
      text: "Performance",
      collapsed: isCollapsed,
      base: `${lang}/performance/`,
      items: [{ text: "Intro", link: "performance" }],
    },
  ];
}
