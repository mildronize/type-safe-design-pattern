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

## Why I wrote this book

I'm not sure if everyone is like me, but when I started writing TypeScript, generics were really scary (not generics in other languages, but specifically TypeScript's).

The more I wrote in a type-safe manner, the more it felt like going into an unknown territory that left me confused, haha.

And of course, the concept of type-safe isn't new, and I didn't come up with it. Many modern TypeScript libraries have started to claim that they are type-safe libraries. You can check them out.

There are also articles (not many, but there are some) about programming with types, or what you might call type-level programming or a complete Turing system.

However, after reading those articles, I still couldn't design my own framework. It requires imagination and involves looking into well-known open-source code and gradually testing the concept of type programming to see how types work together.

One thing I've discovered is that when I write JavaScript code first (without types), it can't be transformed into type-safe code without rewriting. Therefore, older libraries that support TypeScript, like Express, can never be truly type-safe.

So, when you see people claiming that modern TypeScript is type-safe, it means TypeScript first, then JavaScript. In other words, you write the types before writing the code. I'm trying to understand how to shift my thinking and design my code to be type-safe, which requires a change in mindset.

As I wrote in my book:

> "Not every design pattern has type-safe data types. Applying the appropriate design patterns is essential."

I've learned type-safe design patterns from various modern TypeScript open-source projects, and write my own Azure Functions Framework called [Nammtham](https://nammatham.thaitype.dev/). I've learned a lot from these projects. 

I decided to write this book to help other developers who are struggling with type-safe design patterns. I hope this book will help you improve your TypeScript code quality and design.

## Prerequisites
Please make sure you have a good understanding of TypeScript before reading this book. If you are new to TypeScript, I recommend reading the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) first.

Generics are a fundamental concept in TypeScript, so make sure you understand them. You can read the [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) section of the TypeScript Handbook. 

## How the book is structured

From the book prerequisites, it is recommended to have a good understanding of TypeScript before reading this book. However, if you are already familiar with TypeScript, you can jump to a specific section that interests you. Each section will provide the necessary prerequisites and type knowledge that you need to know before reading it. So, you don't necessarily have to read the book from start to finish.

The book is divided into several sections, each covering a different topic. Each section is linked together, the sections are as follows:

- Section 1: Start Reading
- Section 2: Design Guideline
- Section 3: Basic Types
- Section 4: Type Programming
- Section 5: Design Patterns
- Section 6: Framework Patterns
- Section 7: Performance

## Reading Instructions

This book contains many code examples, with [twoslash plugin](https://shiki.matsu.io/packages/vitepress#twoslash) you can peak the type definitions by hovering over the code. For example:

```ts twoslash
type User = {
  name: string
  age: number
}

type UserWithoutAge = Omit<User, 'age'>
```

I recommend that you try running the code examples in the [TypeScript Playground](https://www.typescriptlang.org/play) or your own editor to get a better understanding of the concepts. However, I you need interactive examples I don't have enough time to support it, feel free to open the Pull Request on [GitHub](https://github.com/mildronize/type-safe-design-pattern) for [adding monao editor](https://github.com/vuejs/vitepress/issues/1508#issuecomment-1689500884) to the page.

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
  - When you copy the output from the ChatGPT, I recommend to paste at any WSYSIWYG editor like [Typora](https://typora.io/) or Notion to see the markdown preview, then you can copy the markdown content and paste it to the page.