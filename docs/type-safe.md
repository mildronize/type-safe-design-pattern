# What is Type-safe?

::: tip TL;DR:
**Type-safe** ensures data types are correct and consistent in programs, especially in modern languages like TypeScript. Key characteristics include using generic and [template literal types](./type-programming/template-literal-types), the builder pattern, automatic type inference, and reducing type duplication. Examples of TypeScript projects utilizing type-safe design include Zod, tRPC, Hono, and Elysia.
:::

Many in the programming community frequently mention **"type-safe,"** yet few attempt to define it clearly. For more clarity, let's break down what type-safe means in the context of modern programming languages like TypeScript in my understanding.

Type-safe is a design pattern that ensures data types are correct and consistent within a program. This pattern is particularly valuable in modern programming languages like TypeScript, which boasts a powerful type system to enhance program correctness and reliability.

## The Traditional Type

When I've mentioned the traditional type, I mean the type that is defined in the program. Not only TypeScript type, but also the type in other programming language like Java, C#, etc.

The traditional type is a way to define the data type in the program. It can be a primitive type like `number`, `string`, `boolean`, etc. or a complex type like `interface`, `class`, etc.

For example, in TypeScript, we can define a type like this:

```ts twoslash
interface Person {
  name: string;
  age: number;
}
```

## Characteristics of Type-safe

Many libraries and frameworks provide type-safe support, here is some characteristics of type-safe when the they claim that they are type-safe:

- **Generic**: They use generic types
- **Template Literal Types**: They use template literal types
- **Builder Pattern**: They use builder pattern
- **Automatic Type Inference**: They use automatic type inference passing through the function and generic types
- **Reduce Type Duplicate Definition**: They reduce the duplicate definition of types