import type { DefaultTheme } from "vitepress";

export type SidebarMetadata = Omit<DefaultTheme.SidebarItem, "items" | "base" | "link"> & {
  order?: number;
};
export type SidebarItem = Omit<DefaultTheme.SidebarItem, "items"> & {
  /**
   * The unique key for the sidebar item. It is the full path of the sidebar item.
   *
   * @example `/type-programming/loop/mapped-types`
   */
  key: string;

  items?: SidebarItem[];
};
export type AbsoluteLink = string;
export type RelativeLink = string;

export class Sidebar<
  Groups extends Record<AbsoluteLink, SidebarMetadata> = {},
  Items extends Record<RelativeLink, SidebarMetadata> = {}
> {
  items: Items = {} as Items;
  groups: Groups = {} as Groups;

  constructor(group?: Groups, items?: Items) {
    this.groups = group ?? ({} as Groups);
    this.items = items ?? ({} as Items);
  }

  addGroup<Link extends AbsoluteLink>(group: Link, value: SidebarMetadata) {
    value.order = Object.keys(this.groups).length;
    this.groups = {
      ...this.groups,
      [group]: value as Groups[Link],
    };
    return this as unknown as Sidebar<Groups & Record<Link, SidebarMetadata>, Items>;
  }

  add<Link extends RelativeLink>(group: keyof Groups, key: Link, value: SidebarMetadata) {
    value.order = Object.keys(this.items).length;
    this.items = {
      ...this.items,
      [key]: value as Items[Link],
    };
    return this as unknown as Sidebar<Groups, Items & Record<Link, SidebarMetadata>>;
  }

  /**
   * Using the group key as the hierarchy, generate the sidebar items.
   *
   * For example, the following group key: `/`, value: `{ text: 'Start Reading' }`
   *
   * ```json
   * {
   *  key: "/",
   *  text: "Start Reading",
   * }
   * ```
   *
   * It can support sub-groups as well.
   *
   * For example, the following group key: `/loop`, value: `{ text: 'Loop' }`
   *
   * ```json
   * {
   *  key: "/",
   *  text: "Start Reading",
   *  items: [
   *    {
   *     key: "/loop",
   *     text: "Loop",
   *    }
   *  ]
   * }
   * ```
   * 
   * TODO: Add support for more than 2 hierarchy
   */

  public generateSidebarItemGroup(): SidebarItem[] {
    const items: SidebarItem[] = [];
    for (const [key, value] of Object.entries(this.groups)) {
      const split = key.split("/");
      if (split.length === 1) {
        throw new Error("Invalid group key, it should start with `/`");
      }
      /**
       * First hierarchy
       */
      if (split.length === 2) {
        const isExist: boolean = items.some((item) => item.key === key);
        if (isExist) {
          throw new Error("Duplicate group key");
        }
        delete value.order;
        items.push({
          key,
          ...value,
        });
        /**
         * Second hierarchy
         */
      } else if (split.length === 3) {
        const parentKey = split.slice(0, split.length - 1).join("/");
        const parent = items.find((item) => item.key === parentKey);
        if (!parent) {
          throw new Error("Parent group is not found");
        }
        if (!parent.items) {
          parent.items = [];
        }
        delete value.order;
        parent.items.push({
          key,
          ...value,
        });
      } else {
        throw new Error("Unsupported nested group hierarchy more than 2");
      }
    }
    return items;
  }

  toSidebarItems(): SidebarItem[] {
    const items: SidebarItem[] = [];
    return items;
  }

  override(group: keyof Groups, key: keyof Items, value: SidebarMetadata) {
    this.items = {
      ...this.items,
      ...(value as unknown as Items),
    };
    return this as unknown as Sidebar<Groups, Items>;
  }

  clone(): Sidebar<Groups, Items> {
    return new Sidebar(this.groups, this.items);
  }
}

// const baseSidebar = new Sidebar()
//   .addGroup("/", { text: "Start Reading", collapsed: true })
//   .addGroup("/type-programming", { text: "Type Programming", collapsed: true })
//   .addGroup("/type-programming/loop", { text: "Loop", collapsed: true })
//   .add("/type-programming/loop", "/intro", { text: "Introduction" });

// const thSidebar = baseSidebar.clone();

// thSidebar.override("/type-programming/loop", "/intro", { text: "Mapped Types" });
