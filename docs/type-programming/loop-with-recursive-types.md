# Loop with Recursive Types

In this section, we will explore how to create a loop with recursive types in TypeScript. We will start by defining a simple recursive type and then show how to create a loop with it.

## Recursive Types

Basic recursive types are types that refer to themselves in their definition. For example, consider the following type definition:

```ts twoslash
type Recursive<T> = T extends [infer Head, ...infer Tail]
 ? [Head, ...Recursive<Tail>]
 : [];
```

In this definition, the `Recursive` type is defined in terms of itself. It takes a type `T` and checks if `T` extends an array with a head element and a tail element. If it does, it constructs a new array type by recursively applying `Recursive` to the tail element.

## Examples

```ts twoslash
// This case Tail always be array
type CheckTailStatus<T extends any[]> = T extends [infer H, ...infer T]
  ? T extends any[]
    ? 'Tail is array'
    : 'Tail is not array'
  : 'empty array';

// The result will be "empty array"
type check1 = CheckTailStatus<[]>;
// The result will be "Tail is array"
type check2 = CheckTailStatus<['hello']>;
// The result will be "Tail is array"
type check3 = CheckTailStatus<['hello', 'wolrd']>;
```

In this example, we define a type `CheckTailStatus` that checks if the tail of an array is an array or not. We use conditional types to check if the tail element `T` extends an array. If it does, we return `'Tail is array'`; otherwise, we return `'Tail is not array'`.