---
outline: deep
---

# TypeScript

After examining the code of several well-known open-source projects such as Zod, tRPC, Hono, Elysia, and ts-odata-client.

## TypeScript Config
Use strict

## Use literal instead of string


## Use object rather than list/array
## Use tuple rather than list/array
## Use builder pattern

```ts twoslash
class Inventory<Items extends Record<string, unknown> = {}> {

    items: Items = {} as Items;

    add<NewItem extends Record<string, unknown>>(value: NewItem) {
        this.items = {
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






// 
```

## Use predicate function instead of plain object
## Use function overload

```ts twoslash
console.log('hello')
//      ^?
```