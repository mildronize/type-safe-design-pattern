import { describe, test, expect } from "bun:test";
import { Sidebar } from "./utils";

describe("Sidebar Group", () => {
  test("should create a sidebar group", () => {
    const sidebar = new Sidebar().addGroup("/", { text: "Start Reading" });
    expect(sidebar).toBeDefined();
  });

  test("should add a sidebar group", () => {
    const sidebar = new Sidebar().addGroup("/", { text: "Start Reading" });
    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([{ key: "/", text: "Start Reading" }]);
  });

  test("should add two sidebar groups", () => {
    const sidebar = new Sidebar().addGroup("/", { text: "Start Reading" }).addGroup("/loop", { text: "Loop" });
    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([
      { key: "/", text: "Start Reading" },
      { key: "/loop", text: "Loop" },
    ]);
  });

  test("should add two sidebar groups and its subgroup", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" });
    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([
      { key: "/", text: "Start Reading" },
      { key: "/loop", text: "Loop", items: [{ key: "/loop/mapped-types", text: "Mapped Types" }] },
    ]);
  });

  test("should add two sidebar groups and its subgroup", () => {
    const sidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .addGroup("/loop/recursive-types", { text: "Recursive Types" });
    expect(sidebar.generateSidebarItemGroup()).toStrictEqual([
      { key: "/", text: "Start Reading" },
      {
        key: "/loop",
        text: "Loop",
        items: [
          { key: "/loop/mapped-types", text: "Mapped Types" },
          { key: "/loop/recursive-types", text: "Recursive Types" },
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
      { key: "/", text: "Start Reading" },
      {
        key: "/loop",
        text: "Loop",
        items: [
          {
            key: "/loop/mapped-types",
            text: "Mapped Types",
            items: [{ key: "/loop/mapped-types/examples", text: "Examples" }],
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
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/loop/mapped-types/intro` })
      .add("/loop/recursive-types", "intro", { text: "Introduction", link: `/loop/recursive-types/intro`})
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
            items: [
              { key: "/loop/recursive-types/intro", text: "Introduction", link: `/loop/recursive-types/intro` },
            ],
          },
        ],
      },
    ]);
  });
});


describe("Sidebar Override", () => {
  test("should add a group to sidebar and it's items", () => {
    const baseSidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/loop/mapped-types/intro` })

    const sidebar = baseSidebar.clone()
      .override("/loop/mapped-types", "intro", { text: "Mapped Types", link: `/loop/mapped-types` })
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
            items: [{ key: "/loop/mapped-types/intro", text: "Mapped Types", link: `/loop/mapped-types` }],
          },
        ],
      },
    ]);
  });

  test("should add a group to sidebar and it's items, with partial metadata", () => {
    const baseSidebar = new Sidebar()
      .addGroup("/", { text: "Start Reading" })
      .addGroup("/loop", { text: "Loop" })
      .addGroup("/loop/mapped-types", { text: "Mapped Types" })
      .add("/loop/mapped-types", "intro", { text: "Introduction", link: `/loop/mapped-types/intro` })

    const sidebar = baseSidebar.clone()
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

});