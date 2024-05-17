# Design Patterns

In order to write type-safe and maintainable code in TypeScript, it is important to follow best practices and design patterns. Design patterns are reusable solutions to common problems that arise when writing software. They provide a way to structure code in a way that is easy to understand, maintain, and extend.

Not all design pattern meet type-safety, but some of them are very useful in TypeScript. Here are some design patterns that are commonly used in TypeScript:

- [Use builder pattern](./builder-pattern.md) when constructing complex objects step by step, passing type information along the way.
- [Use function argument instead of plain object](./function-argument.md) to enforce type safety and avoid runtime errors.
- [Use function overload](./function-overload.md) to create multiple functions with the same name but different parameters, achieving polymorphism in programming languages that do not support it natively.