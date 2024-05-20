# Record Object

In TypeScript, a record object is a type that represents an object with keys of type `string` and values of type `unknown`. The `Record` type is a built-in utility type that allows you to define a record object with specific keys and values.

```ts twoslash
type User = Record<string, unknown>;
```

Mostly use with [builder pattern](../design-patterns//builder-pattern) to construct complex objects step by step.

## Using Record Object for Enhanced Type Safety

Arrays in TypeScript are not inherently type-safe. For example:

```ts
type Tenant = {
  name: string;
  metadata: Record<string, unknown>;
}[];

```

In this case, we cannot use literal types with arrays. However, if we structure it as an object:

```ts
type Tenant = Record<'Provider' | 'Consumer', { 
  metadata: Record<string, unknown> 
}>;
```

We can infer types from the keys, which are literals.

### Flexibility vs. Type Safety

If we require the flexibility of an array—such as when managing tenants with varying roles like provider, consumer, or potentially new roles in the future—we might still use an array. However, this approach lacks type safety, necessitating manual type checks and validations.

Conversely, using an object instead of an array ensures type safety. The challenge, however, is that TypeScript, being a statically typed language, does not allow us to derive literal types from runtime data. As a result, many developers opt to auto-generate type definitions (`.d.ts` files) to maintain type safety and reflect any configuration changes in the code.

This technique will be further explained in the chapter on Framework Patterns, specifically in the section on Generating Dynamic Types.

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