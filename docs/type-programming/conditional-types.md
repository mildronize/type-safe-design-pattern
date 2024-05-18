# Conditional Types

In TypeScript, conditional types are a powerful feature that allows you to create types that depend on a condition. Conditional types are used to create types that change based on the properties of other types. They are often used in generic types to create more flexible and reusable code.

```ts twoslash
// Define a type that checks if a type is an array
type IsArray<T> = T extends any[] ? "yes" : "no";

// Test the IsArray type
type Test1 = IsArray<number>; // "no"
type Test2 = IsArray<string[]>; // "yes"
```
