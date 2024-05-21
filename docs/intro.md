---
outline: deep
---


# Introduction

::: warning
This book is still in the draft phase. Please feel free to open an issue or submit a pull request on [GitHub](https://github.com/mildronize/type-safe-design-pattern)
:::

::: info
This book is more advanced than the TypeScript Handbook. It is intended for developers who are already familiar with TypeScript and are looking to improve their code quality and design.
:::

This book is a collection of TypeScript best practices and design patterns. It is intended to be a guide for developers who are looking to improve their TypeScript code quality and design. The book covers a wide range of topics, including TypeScript configuration, data structures, design patterns, and more.

After examining the code of several well-known open-source projects such as Zod, tRPC, Hono, Elysia, and ts-odata-client.

## Author Talk

I am currently writing a new E-book. Please follow and support!This book is for advanced TypeScript users (not suitable for beginners, it might be overwhelming). The title of the book is **"Type-safe Design Pattern in Modern TypeScript."** Not every Design Pattern can be made Type-safe, but I have compiled frequently used Design Patterns in Modern TypeScript Libraries.

Moreover, I have not seen any books or articles that cover these topics. I hope this book will help you improve your TypeScript code quality and design. I will publish the book on Leanpub. I will update the progress on X (Twitter). Please follow me on X (Twitter) [@mildronize](https://x.com/mildronize). I've been working on this book for a while, and I hope to finish it soon. I would love to hear feedback from the community because at that time when I'm writing, I haven't seen anyone write about this yet.

## Table of Contents

- TypeScript Config
  - Use strict
- Data Structure
  - Use [literal type](./data-structure/literal-types) rathen than string
  - Use [Record object](./data-structure/record-object.md) rather than list/array
  - Use [Tuple](./data-structure/tuple.md) rather than list/array
- Design Patterns
  - Use [builder pattern](./design-patterns/builder-pattern.md)
  - Use [function argument](./design-patterns/function-argument.md) instead of plain object
  - Use [function overload](./design-patterns/function-overload.md)

## Prerequisites
Please make sure you have a good understanding of TypeScript before reading this book. If you are new to TypeScript, I recommend reading the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) first.

Generics are a fundamental concept in TypeScript, so make sure you understand them. You can read the [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) section of the TypeScript Handbook. 

## Recommended Reading

- [Type-Level Programming](https://type-level-typescript.com/) e-book. 
There are many free chapters available. However, I recommend buying the book to support the author. See more in [YouTube](https://www.youtube.com/watch?v=vGVvJuazs84) and his [slide](https://docs.google.com/presentation/d/18Y0M4SRjKoJGR3ePSBBn8yPlpkE5biufZRdHo1Ka2AI/edit?usp=sharin).
- [Effective TypeScript: 62 Specific Ways to Improve Your TypeScript](https://learning.oreilly.com/library/view/effective-typescript/9781098155056/) By Dan Vanderkam
- [TypeScript Cookbook](https://learning.oreilly.com/library/view/typescript-cookbook/9781098136642/) By Stefan Baumgartner

## Disclaimer

I did not create these design patterns. I learned from various modern TypeScript open-source projects, including famous ones like Zod, tRPC, Hono, Elysia, and many others, as well as writing the [Nammtham](https://nammatham.thaitype.dev/) (Azure Functions Framework). This process has helped me distill commonly used patterns. 

The type-safe design patterns is not suitable for every project. It is intended for projects that require high code quality and design. Make sure to evaluate whether these patterns are suitable for your project before using them.

## Contributing
If you have any suggestions or feedback, please feel free to open an issue or submit a pull request on [GitHub](https://github.com/mildronize/type-safe-design-pattern)

You can both contibute to the content and the translation:

- **Content Contribution**, you can contribute by adding new design patterns, best practices, or improving the existing content, this is allowed only through the English version.
- **Translation Contribution**, you can contribute by translating the content to your language. I've recommened to use the prompt from the generative AI like GPT-3, GPT-4, etc. to generate the content for the page. You can see the example in the [Prompt](./prompt.md) page.
  - For consistency, please do not translate the content directly, but use the prompt to generate the content. When result of the prompt is not good, you update your prompt condition and try again, you can see the example in the [Thai Prompt](/th/prompt.md) page.