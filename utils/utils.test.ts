import { describe, test, expect } from "bun:test";
import { Sidebar } from "./utils";

describe("Sidebar Group", () => {
  test("should create a sidebar group", () => {
    const sidebar = new Sidebar().addGroup("/", { text: "Start Reading" });
    expect(sidebar).toBeDefined();
  });

  test("should add a sidebar group", () => {
    const sidebar = new Sidebar().addGroup("/", { text: "Start Reading" });
    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([{ key: "/", text: "Start Reading", order: 0 }]);
  });

  test("should add two sidebar groups", () => {
    const sidebar = new Sidebar().addGroup("/", { text: "Start Reading" }).addGroup("/loop", { text: "Loop" });
    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([
      { key: "/", text: "Start Reading", order: 0 },
      { key: "/loop", text: "Loop", order: 1 },
    ]);
  });

  test("should add two sidebar groups and its subgroup", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" });
    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([
      { key: "/", text: "Start Reading", order: 0 },
      { key: "/loop", text: "Loop", order: 1, items: [{ key: "/loop/mapped-types", text: "Mapped Types", order: 2 }] },
    ]);
  });

  test("should add two sidebar groups and its subgroup", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .addGroup("/loop/recursive-types", { text: "Recursive Types" });
    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([
      { key: "/", text: "Start Reading", order: 0 },
      {
        key: "/loop",
        text: "Loop",
        order: 1,
        items: [
          { key: "/loop/mapped-types", text: "Mapped Types", order: 2 },
          { key: "/loop/recursive-types", text: "Recursive Types", order: 3 },
        ],
      },
    ]);
  });

  test("should add two sidebar groups and its subgroup", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .addGroup("/loop/mapped-types/examples", { text: "Examples" });

    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([
      { key: "/", text: "Start Reading", order: 0 },
      {
        key: "/loop",
        text: "Loop",
        order: 1,
        items: [
          {
            key: "/loop/mapped-types",
            text: "Mapped Types",
            order: 2,
            items: [{ key: "/loop/mapped-types/examples", text: "Examples", order: 3 }],
          },
        ],
      },
    ]);
  });

  test("Add subgroup in missing parent group, should be error", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop/mapped-types/examples", { text: "Examples" });

    expect(() => sidebar.generateSidebarItemGroup()).toThrow(new Error("Parent group is not found or wrong order"));
  });

  test("Add subgroup in wrong order, should be error", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .addGroup("/loop", { text: "Loop" });

    expect(() => sidebar.generateSidebarItemGroup()).toThrow(new Error("Parent group is not found or wrong order"));
  });
});

// sidebar group can override

describe("Sidebar Group Override", () => {
  test("should add sidebar groups and override", () => {
    const baseSidebar = new Sidebar().addGroup("/", { text: "Start Reading" }).addGroup("/loop", { text: "Loop" });
    const sidebar = baseSidebar.clone().overrideGroup("/loop", { text: "Loop Override" });
    expect(sidebar.toSidebarItems()).toStrictEqual([
      { key: "/", text: "Start Reading" },
      { key: "/loop", text: "Loop Override" },
    ]);
  });
});

describe("Sidebar", () => {
  test("should create a sidebar", () => {
    const sidebar = new Sidebar();
    expect(sidebar).toBeDefined();
  });

  test("should add a group to sidebar and it's items", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading", collapsed: true })
      .add("/", "intro", { text: "Introduction", link: `/intro` })
      .toSidebarItems();

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        text: "Start Reading",
        collapsed: true,
        items: [{ key: "/intro", text: "Introduction", link: `/intro` }],
      },
    ]);
  });

  test("should add sidebarItem to group", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading", collapsed: true })
      .add("/", "intro", { text: "Introduction", link: `/intro` })
      .add("/", "conclusion", { text: "Conclusion", link: `/conclusion` })
      .toSidebarItems();

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        text: "Start Reading",
        collapsed: true,
        items: [
          { key: "/intro", text: "Introduction", link: `/intro` },
          { key: "/conclusion", text: "Conclusion", link: `/conclusion` },
        ],
      },
    ]);
  });

  test("should add a group to sidebar and it's items", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .addGroup("/loop/recursive-types", { text: "Recursive Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/intro` })
      .add("/loop/recursive-types", "intro", { text: "Introduction", link: `/intro` })
      .toSidebarItems();

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        text: "Start Reading",
      },
      {
        key: "/loop",
        text: "Loop",
        items: [
          {
            key: "/loop/mapped-types",
            text: "Mapped Types",
            items: [{ key: "/loop/mapped-types/intro", text: "Introduction", link: `/loop/mapped-types/intro` }],
          },
          {
            key: "/loop/recursive-types",
            text: "Recursive Types",
            items: [{ key: "/loop/recursive-types/intro", text: "Introduction", link: `/loop/recursive-types/intro` }],
          },
        ],
      },
    ]);
  });
});

describe("Sidebar Override", () => {
  test("Add group and sidebar, then override", () => {
    const baseSidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/intro` });

    const sidebar = baseSidebar
      .clone()
      .override("/loop/mapped-types", "intro", { text: "Mapped Types", link: `/mapped-types` })
      .toSidebarItems();

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        text: "Start Reading",
      },
      {
        key: "/loop",
        text: "Loop",
        items: [
          {
            key: "/loop/mapped-types",
            text: "Mapped Types",
            items: [{ key: "/loop/mapped-types/intro", text: "Mapped Types", link: `/loop/mapped-types/mapped-types` }],
          },
        ],
      },
    ]);
  });

  test("Add group and sidebar, then override, with partial metadata", () => {
    const baseSidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/intro` });

    const sidebar = baseSidebar
      .clone()
      .override("/loop/mapped-types", "intro", { text: "Mapped Types" })
      .toSidebarItems();

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        text: "Start Reading",
      },
      {
        key: "/loop",
        text: "Loop",
        items: [
          {
            key: "/loop/mapped-types",
            text: "Mapped Types",
            items: [{ key: "/loop/mapped-types/intro", text: "Mapped Types", link: `/loop/mapped-types/intro` }],
          },
        ],
      },
    ]);
  });

  test("Add group and sidebar, then override, with partial metadata, keep order", () => {
    const baseSidebar = new Sidebar({
      isRemoveOrder: false,
    })
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/intro` });

    const sidebar = baseSidebar
      .clone()
      .override("/loop/mapped-types", "intro", { text: "Mapped Types" })
      .toSidebarItems();

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        order: 0,
        text: "Start Reading",
      },
      {
        key: "/loop",
        order: 1,
        text: "Loop",
        items: [
          {
            key: "/loop/mapped-types",
            text: "Mapped Types",
            order: 2,
            items: [
              { key: "/loop/mapped-types/intro", text: "Mapped Types", link: `/loop/mapped-types/intro`, order: 3 },
            ],
          },
        ],
      },
    ]);
  });

  test("Add group and sidebar, then override, with global prefix link", () => {
    const baseSidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/intro` });

    const sidebar = baseSidebar
      .clone()
      .override("/loop/mapped-types", "intro", { text: "Mapped Types" })
      .toSidebarItems("/th");

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        text: "Start Reading",
      },
      {
        key: "/loop",
        text: "Loop",
        items: [
          {
            key: "/loop/mapped-types",
            text: "Mapped Types",
            items: [{ key: "/loop/mapped-types/intro", text: "Mapped Types", link: `/th/loop/mapped-types/intro` }],
          },
        ],
      },
    ]);
  });

  test("Add group and sidebar, then override, with item prefix link", () => {
    const baseSidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/intro` })
      .add("/loop/mapped-types", "intro2", { text: "Introduction 2", link: `/intro2` });

    const sidebar = baseSidebar
      .clone()
      .override("/loop/mapped-types", "intro", { text: "Mapped Types", prefix: '/th' })
      .toSidebarItems("");

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        text: "Start Reading",
      },
      {
        key: "/loop",
        text: "Loop",
        items: [
          {
            key: "/loop/mapped-types",
            text: "Mapped Types",
            items: [
              { key: "/loop/mapped-types/intro", text: "Mapped Types", link: `/th/loop/mapped-types/intro` },
              { key: "/loop/mapped-types/intro2", text: "Introduction 2", link: `/loop/mapped-types/intro2` },
            ],
          },
        ],
      },
    ]);
  });
});

describe("Sidebar with default Optionas", () => {
  test("Add group and sidebar, with default options and can override", () => {
    const sidebar = new Sidebar({
      collapsed: true,
    })
      .addGroup("/", { text: "Start Reading", collapsed: false })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .addGroup("/loop/recursive-types", { text: "Recursive Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/intro` })
      .add("/loop/recursive-types", "intro", { text: "Introduction", link: `/intro` })
      .toSidebarItems();

    expect(sidebar).toStrictEqual([
      {
        key: "/",
        collapsed: false,
        text: "Start Reading",
      },
      {
        key: "/loop",
        collapsed: true,
        text: "Loop",
        items: [
          {
            key: "/loop/mapped-types",
            collapsed: true,
            text: "Mapped Types",
            items: [{ key: "/loop/mapped-types/intro", text: "Introduction", link: `/loop/mapped-types/intro` }],
          },
          {
            key: "/loop/recursive-types",
            collapsed: true,
            text: "Recursive Types",
            items: [{ key: "/loop/recursive-types/intro", text: "Introduction", link: `/loop/recursive-types/intro` }],
          },
        ],
      },
    ]);
  });
});
