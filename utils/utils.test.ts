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
});

describe("Sidebar", () => {
  test("should create a sidebar", () => {
    const sidebar = new Sidebar();
    expect(sidebar).toBeDefined();
  });

  // test("should add a group to sidebar and it's items", () => {
  //   const sidebar = new Sidebar()
  //     .addGroup("/", { text: "Start Reading", collapsed: true })
  //     .add("/", "/intro", { text: "Introduction" })
  //     .toSidebarItems();
  //   expect(sidebar).toStrictEqual([
  //     {
  //       text: "Start Reading",
  //       collapsed: true,
  //       items: [{ text: "Introduction", link: `/intro` }],
  //     },
  //   ]);
  // });
});
