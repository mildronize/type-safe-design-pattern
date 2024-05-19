# Project Setup and Structure

## TypeScript Compiler Config

The TypeScript compiler configuration file is `tsconfig.json`. This file is used to configure the TypeScript compiler. The TypeScript compiler uses this file to determine how to compile the project. Use `strict` mode to enable all strict type-checking options. This will help you catch more errors at compile time.

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## Project Structure

::: warning Disclaimer
Organizing the project structure and types may vary depending on the project's size and complexity. From my experience, the following structure works well for most projects. However, the specific needs and context of a project might necessitate deviations from these practices. Flexibility and critical thinking are key in effectively applying these principles.
:::

### Module Organization

**Modular Approach**: I typically organize my code and types in a modular fashion. This means creating smaller, self-contained modules rather than having everything in a single file. Functions or classes that work together frequently are placed in the same module. 

This approach aligns with the Single Responsibility Principle (SRP) from SOLID principles, which encourages developers to structure their code such that each module or file has a single responsibility.

### Type Definition Organization

**Inline Types**: Types that are specific to a module (e.g., parameters for functions or classes) are defined within that module. This ensures that related types are close to the code that uses them. Because it makes the code more readable and easier to understand. This is particularly useful for types that are specific to a particular module and not reused elsewhere.

**Shared Types**: For types that need to be used across multiple classes, I create a separate file, usually named `types.ts`, within the same module. This file contains shared interfaces or utility types specific to that module (domain strictly). This prevents type definitions from cluttering the main module file and keeps related types organized.

**Common/Global Types**: There are also common types used across all modules, such as utility types that are not specific to any business logic or module. These are placed in a common directory, making them accessible to any part of the project. This ensures that such utility types are easily accessible and do not need to be duplicated.

### Type Declaration Files

I recommend avoiding the use of `.d.ts` files unless absolutely necessary. They should be used sparingly, as global declarations can be difficult to manage and maintain as the project grows. Additionally, they can lead to discrepancies between compile-time and runtime types, causing more complexity. Instead, define types within modules and use import paths or wildcard imports (`import * as types from ...`) to manage type imports efficiently.

However, `.d.ts` files can be very useful for defining global types, especially when working with third-party libraries or when extending built-in types. Completely avoiding `.d.ts` files might not be practical in all scenarios. It’s important to balance their usage with careful management to avoid issues.

### Summary

The principles for organizing types are similar to those for organizing JavaScript code: separate by domain, module, and business logic. If you're using a type-safe framework, the need to write type definitions may be significantly reduced, as these frameworks often infer types automatically. In such cases, you mainly need to define data interfaces to complement the framework's type inference.

This approach ensures a clean, maintainable project structure that scales well as the project grows.