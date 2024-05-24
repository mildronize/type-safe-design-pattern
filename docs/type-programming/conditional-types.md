# Conditional Types

In TypeScript, conditional types are a powerful feature that allows you to create types that depend on a condition. Conditional types are used to create types that change based on the properties of other types. They are often used in generic types to create more flexible and reusable code.

```ts twoslash
// Define a type that checks if a type is an array
type IsArray<T> = T extends any[] ? "yes" : "no";

// Test the IsArray type
type Test1 = IsArray<number>; // "no"
type Test2 = IsArray<string[]>; // "yes"
```

## Using Infer

### Prerequisites
- [Template Literal Types](../data-structure/template-literal-types)

Infer is a keyword used in conditional types to infer the type of a variable based on a condition. Infer is often used in conjunction with the `extends` keyword to extract the type of a variable that matches a specific condition.

```ts twoslash
type FindPrefix<T> = 
    T extends `${infer Prefix}/${string}`
    ? Prefix
    : 'Not Found';


type Test = FindPrefix<'api/users'>;
    // ^?

// End of Example
```

For example above, the `FindPrefix` type extracts the prefix of a string that is separated by a `/`. If the string matches the pattern `${infer Prefix}/${string}`, the type `Prefix` is inferred as the prefix of the string. Otherwise, the type is set to `'Not Found'`.
