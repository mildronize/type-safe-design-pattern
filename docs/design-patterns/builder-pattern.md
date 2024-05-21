# Builder Pattern

The builder pattern is a creational design pattern that allows constructing complex objects step by step. The pattern is useful when the construction of an object is complex and requires multiple steps. The builder pattern is used to construct a complex object from simple objects step by step.


```ts twoslash
class Inventory<Items extends Record<string, unknown> = {}> {

  items: Items = {} as Items;

  add<NewItem extends Record<string, unknown>>(value: NewItem) {
    this.items = {
      ...this.items,
      ...value as unknown as Items
    }
    return this as Inventory<Items & NewItem>;
  }
}

const inventory = new Inventory()
  .add({
    hello: 'world',
  }).add({
    typescript: 5.1,
    numbers: [23, '123']
  });

console.log(inventory.items.typescript)


type A = typeof inventory.items;
//   ^? 






// End of the example
```


## Examples

List of Sidebar Items in Vitepress is not a type-safe, but we can use Record Object to make it type-safe.

```ts twoslash
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
```

In this example, we define a `Sidebar` class that uses a record object to manage sidebar items in Vitepress. The `Sidebar` class has two generic parameters: `Groups` and `Items`. The `Groups` parameter is a record object with keys of type `AbsoluteLink` and values of type `SidebarMetadata`. The `Items` parameter is a record object with keys of type `RelativeLink` and values of type `SidebarMetadata`.

The `Sidebar` class has methods to add groups and items to the sidebar, override existing items, and clone the sidebar. The `toSidebarItems` method converts the sidebar items to an array of `DefaultTheme.SidebarItem` objects.

We create a base sidebar with three groups and one item. We then clone the base sidebar and override the item in the cloned sidebar. This demonstrates how we can use a record object to manage sidebar items in a type-safe manner.

## Example Projects
- Hono
- Elysia
- Zod