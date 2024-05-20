import type { DefaultTheme } from "vitepress";

export type SidebarMetadata = Omit<DefaultTheme.SidebarItem, "items" | "base" | "link"> & {
  order?: number;
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
    this.groups = {
      ...this.groups,
      ...(value as unknown as Groups),
    };
    return this as unknown as Sidebar<Groups & Record<Link, SidebarMetadata>, Items>;
  }

  add<Link extends RelativeLink>(group: keyof Groups, key: Link, value: SidebarMetadata) {
    this.items = {
      ...this.items,
      ...(value as unknown as Items),
    };
    return this as unknown as Sidebar<Groups, Items & Record<Link, SidebarMetadata>>;
  }

  toSidebarItems(): DefaultTheme.SidebarItem[] {
    return Object.entries(this.items).map(([link, metadata]) => ({
      ...metadata,
      link,
    }));
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

const baseSidebar = new Sidebar()
  .addGroup("/", { text: "Start Reading", collapsed: true })
  .addGroup("/type-programming", { text: "Type Programming", collapsed: true })
  .addGroup("/type-programming/loop", { text: "Loop", collapsed: true })
  .add("/type-programming/loop", "/intro", { text: "Introduction" });

const thSidebar = baseSidebar.clone();

thSidebar.override("/type-programming/loop", "/intro", { text: "Mapped Types" });
