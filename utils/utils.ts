import type { DefaultTheme } from "vitepress";
import { sidebar } from '../docs/.vitepress/shared';
import { link } from "fs";

export type SidebarMetadata = Omit<DefaultTheme.SidebarItem, "items" | "base"> & {
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
export type SingleSidebarItem = Omit<SidebarItem, "items">;
export type AbsoluteLink = string;
export type RelativeLink = string;

/**
 * Trim the slash from the start and end of the string.
 * @param str
 * @returns
 */
export const trimSlash = (str: string) => str.replace(/^\/|\/$/g, "");

export type SidebarOptions = Pick<DefaultTheme.SidebarItem, "collapsed">;

export class Sidebar<
  Groups extends Record<AbsoluteLink, SidebarMetadata> = {},
  Items extends Record<RelativeLink, SidebarMetadata> = {}
> {
  items: Items = {} as Items;
  groups: Groups = {} as Groups;
  options: SidebarOptions = {};

  constructor(options?: SidebarOptions, group?: Groups, items?: Items) {
    this.groups = group ?? ({} as Groups);
    this.items = items ?? ({} as Items);
    this.options = options ?? {};
  }

  addGroup<Link extends AbsoluteLink>(group: Link, value: SidebarMetadata) {
    value.order = Object.keys(this.groups).length;
    this.groups = {
      ...this.groups,
      [group]: value as Groups[Link],
    };
    if(this.options.collapsed){
      this.groups[group].collapsed = value.collapsed ?? this.options.collapsed;
    }
    return this as unknown as Sidebar<Groups & Record<Link, SidebarMetadata>, Items>;
  }

  protected setItem(group: keyof any, key: keyof any, value: SidebarMetadata) {
    value.order = Object.keys(this.items).length;
    const parsedGroup = trimSlash(String(group)) === "" ? "" : trimSlash(String(group)) + "/";
    const mergedKey = `/${parsedGroup}${trimSlash(String(key))}`;
    // Merge the value if the key is already exist
    this.items = {
      ...this.items,
      [mergedKey]: {
        ...this.items[mergedKey],
        ...value,
      },
    };
    return this;
  }

  add<Link extends RelativeLink>(group: keyof Groups, key: Link, value: SidebarMetadata) {
    return this.setItem(group, key, value) as unknown as Sidebar<Groups, Items & Record<Link, SidebarMetadata>>;
  }

  override(group: keyof Groups, key: keyof Items, value: SidebarMetadata) {
    return this.setItem(group, key, value) as unknown as Sidebar<Groups, Items>;
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
   */
  public generateSidebarItemGroup(): SidebarItem[] {
    const items: SidebarItem[] = [];
    for (const [key, value] of Object.entries(this.groups)) {
      const split = key.split("/");
      if (split.length === 1) {
        throw new Error("Invalid group key, it should start with `/`");
      }
      let parentItems = items;
      for (let i = 1; i < split.length - 1; i++) {
        const parentKey = split.slice(0, i + 1).join("/");
        const parent = parentItems.find((item) => item.key === parentKey);
        if (!parent) {
          throw new Error("Parent group is not found or wrong order");
        }
        if (!parent.items) {
          parent.items = [];
        }
        parentItems = parent.items;
      }
      const isExist: boolean = parentItems.some((item) => item.key === key);
      if (isExist) {
        throw new Error("Duplicate group key");
      }
      delete value.order;
      parentItems.push({
        key,
        ...value,
      });
    }
    return items;
  }

  private getGroupKey(key: string) {
    const split = trimSlash(key).split("/");
    const groupKey = split.slice(0, split.length - 1).join("/");
    return "/" + groupKey;
  }
  /**
   * Loop in nested sidebar items and set the key and items.
   * @param findKey
   * @param items
   */
  protected setSidebarItemsWithKey(findKey: string, value: SingleSidebarItem, _groupItems: SidebarItem[]) {
    for (const groupItem of _groupItems) {
      if (findKey === groupItem.key) {
        if (!groupItem.items) {
          groupItem.items = [];
        }
        return groupItem.items.push(value);
      }
      if (groupItem.items) {
        this.setSidebarItemsWithKey(findKey, value, groupItem.items);
      }
    }
  }

  toSidebarItems(prefixLink = ''): SidebarItem[] {
    const groupItems: SidebarItem[] = this.generateSidebarItemGroup();

    for (const [key, value] of Object.entries(this.items)) {
      const { order, ...restValue } = value;
      const sidebarItem = {
        ...restValue,
        link: restValue.link ? `${prefixLink}${restValue.link}` : undefined,
      };
      this.setSidebarItemsWithKey(
        this.getGroupKey(key),
        {
          key,
          ...sidebarItem,
        },
        groupItems
      );
    }
    return groupItems;
  }

  clone(): Sidebar<Groups, Items> {
    return new Sidebar(this.options, this.groups, this.items);
  }
}