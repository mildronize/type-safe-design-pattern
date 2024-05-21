import type { DefaultTheme } from "vitepress";

export type BaseSidebar = Omit<DefaultTheme.SidebarItem, "items" | "base"> & {
  /**
   * The order of the sidebar item.
   */
  order?: number;
  /**
   * The prefix link for the sidebar item. Example, use for locale
   *
   * @example `/th`
   */
  prefix?: string;
  /**
   * Is override the sidebar item. 
   * 
   * @internal This is for internal use only.
   */
  isOverrided?: boolean;
};

export type Mode = "add" | "override";
export type SidebarMetadata = BaseSidebar;
export type SidebarItem = BaseSidebar & {
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

export type SidebarOptions = Pick<DefaultTheme.SidebarItem, "collapsed"> & {
  /**
   * The initial order for the sidebar item.
   *
   * @default 0
   */
  initialOrder?: number;
  /**
   * Remove the order from the sidebar item.
   *
   * @default true
   */
  isRemoveOrder?: boolean;

  /**
   * Add extra messages for the sidebar item when the sidebar is override but not set the prefix.
   */
  extraMessage?: string;
};

export class Sidebar<
  Groups extends Record<AbsoluteLink, SidebarMetadata> = {},
  Items extends Record<RelativeLink, SidebarMetadata> = {}
> {
  items: Items = {} as Items;
  groups: Groups = {} as Groups;
  options: SidebarOptions = {};
  order: number;
  constructor(options?: SidebarOptions, group?: Groups, items?: Items) {
    this.groups = group ?? ({} as Groups);
    this.items = items ?? ({} as Items);
    this.options = options ?? {};
    this.options.isRemoveOrder = this.options.isRemoveOrder ?? true;
    this.order = this.options.initialOrder ?? 0;
  }

  addGroup<Link extends AbsoluteLink>(group: Link, value: SidebarMetadata) {
    return this.setGroup(group, value) as unknown as Sidebar<Groups & Record<Link, SidebarMetadata>, Items>;
  }

  setGroup<Link extends AbsoluteLink>(group: Link, value: SidebarMetadata, mode: Mode = "add") {
    if (mode === "add") value.order = this.order++;
    if(mode === 'override'){
      if(!this.groups[group]){
        throw new Error(`Group '${group}' is not found`)
      }
    }
    // Merge the value if the key is already exist
    this.groups = {
      ...this.groups,
      [group]: {
        ...this.groups[group],
        ...value,
      },
    };
    if (this.options.collapsed) {
      this.groups[group].collapsed = value.collapsed ?? this.options.collapsed;
    }
    return this;
  }

  protected setItem(group: keyof any, key: keyof any, value: SidebarMetadata, mode: Mode = "add") {
    if (mode === "add") value.order = this.order++;
    const parsedGroup = trimSlash(String(group)) === "" ? "" : trimSlash(String(group)) + "/";
    const mergedKey = `/${parsedGroup}${trimSlash(String(key))}`;
    if(mode === 'override'){
      if(!this.items[mergedKey]){
        throw new Error(`Item '${mergedKey}' is not found`)
      }
      this.items[mergedKey].isOverrided = true;
    }
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
    return this.setItem(group, key, value, 'override') as unknown as Sidebar<Groups, Items>;
  }

  overrideGroup<Link extends AbsoluteLink>(group: Link, value: SidebarMetadata) {
    return this.setGroup(group, value, 'override') as unknown as Sidebar<Groups, Items>;
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
      // if (this.options.isRemoveOrder) delete value.order;
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
  protected setSidebarItemsWithKey(
    findKey: string,
    value: SingleSidebarItem,
    _groupItems: SidebarItem[],
    globalPrefixLink?: string
  ) {
    for (const groupItem of _groupItems) {
      if (findKey === groupItem.key) {
        if (!groupItem.items) {
          groupItem.items = [];
        }
        const { prefix, isOverrided, link, ...newValue } = value;
        /**
         * If the link is exist, append the link with the findKey (group prefix path)
         */
        if (link) {
          const parsedFindKey = trimSlash(findKey) === "" ? "" : "/" + trimSlash(findKey);
          const prefixLink = prefix ?? globalPrefixLink ?? "";
          const newLink = `${prefixLink}${parsedFindKey}/${trimSlash(link)}`;
          if(prefixLink === '' && this.options.extraMessage && isOverrided){
            newValue.text = `${newValue.text} ${this.options.extraMessage}`;
          } else {
            (newValue as SingleSidebarItem).link = newLink;
          }
          
        }
        return groupItem.items.push(newValue);
      }
      if (groupItem.items) {
        this.setSidebarItemsWithKey(findKey, value, groupItem.items, globalPrefixLink);
      }
    }
  }

  sortSidebarItems(sidebarItems: SidebarItem[]): SidebarItem[] {
    return sidebarItems
      .map((item) => {
        const newItem = { ...item };
        if (newItem.items) newItem.items = this.sortSidebarItems(newItem.items);
        return newItem;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  removeOrder(sidebarItems: SidebarItem[]): SidebarItem[] {
    return sidebarItems.map((item) => {
      const newItem = { ...item };
      if (newItem.items) {
        newItem.items = this.removeOrder(newItem.items);
      }
      delete newItem.order;
      return newItem;
    });
  }

  toSidebarItems(prefixLink?: string): SidebarItem[] {
    const groupItems: SidebarItem[] = this.generateSidebarItemGroup();

    for (const [key, value] of Object.entries(this.items)) {
      const sidebarItem = {
        key,
        ...value,
      };
      this.setSidebarItemsWithKey(this.getGroupKey(key), sidebarItem, groupItems, prefixLink);
    }
    const output = this.sortSidebarItems(groupItems);
    if (this.options.isRemoveOrder) {
      return this.removeOrder(output);
    }
    return output;
  }

  clone(): Sidebar<Groups, Items> {
    return new Sidebar(
      {
        ...this.options,
        initialOrder: this.order,
      },
      this.groups,
      this.items
    );
  }
}
