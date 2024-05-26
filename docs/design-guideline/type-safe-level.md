# Type-safe Level

::: tip TL;DR:
**Type-safe level** is a measure of how much a project is type-safe. It is a subjective measure and can be different from one person to another. However, it is important to have a common understanding of what it means to be type-safe.
:::

TypeScript's type-safety stands out as the most robust I've encountered in any programming language, a point I'm elaborating on in my book under the topic of "Type-safe Level."

One of TypeScript's significant advantages is its ability to define types on the server side and seamlessly transfer them to the client side at compile time. This eliminates the need for an intermediate build process between client and server, as shown by the real-world use case of tRPC.

Consider a scenario where I set up a .NET project, export types from .NET to OpenAPI, and then generate these types into TypeScript. Is this considered type-safe? According to my personal definition, it is a form of type-safety, although it still depends on an additional build process. This will be discussed in the Framework Pattern section, specifically under [generating dynamic types](../framework-pattern/generate-dynamic-types), although this part is still a work in progress.

In contrast, TypeScript allows for immediate type-checking without the need for an extra compiler step. The editor's IntelliSense recognizes the types as you write, providing instant feedback and enhancing the development experience.

A feature that sets TypeScript apart is its Literal Template Strings at the type level, introduced in TypeScript 4.1 at the end of 2020. This feature marks a significant milestone, which I refer to as the advent of Modern TypeScript. It allows for advanced type inference through patterns like the Builder Pattern, achieving an exceptional level of type-safety, as seen in projects like tRPC and Elysia. While the Builder Pattern predates TypeScript 4.1, its application in conjunction with Literal Template Strings has elevated TypeScript's type-safety capabilities.

It’s important to note that this discussion is not intended to criticize the type-safety of other languages. Many languages achieve type-safety during compile time, and even memory-safe languages like Rust follow this approach. However, TypeScript's unique features and real-time type-checking capabilities provide a distinct and powerful development experience.

## Type-safe Level in TypeScript

TBA...
