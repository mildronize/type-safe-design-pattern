# Loosen and Tighten

Simple design patterns to help trick the TypeScript compiler into doing what you want.

For example, you can use the `as` keyword to loosen the type of a variable, and then use the `as` keyword again to tighten the type of the variable.

```ts twoslash
const value = 'hello' as unknown as number;
//     ^? 
```