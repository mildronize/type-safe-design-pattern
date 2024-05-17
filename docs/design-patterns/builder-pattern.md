# Builder Pattern

The builder pattern is a creational design pattern that allows constructing complex objects step by step. The pattern is useful when the construction of an object is complex and requires multiple steps. The builder pattern is used to construct a complex object from simple objects step by step.


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

## Example Projects
- Hono
- Elysia
- Zod