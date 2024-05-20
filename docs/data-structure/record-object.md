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