# Record Object

In TypeScript, a record object is a type that represents an object with keys of type `string` and values of type `unknown`. The `Record` type is a built-in utility type that allows you to define a record object with specific keys and values.

```ts twoslash
type User = Record<string, unknown>;
```

Mostly use with [builder pattern](../design-patterns//builder-pattern) to construct complex objects step by step.