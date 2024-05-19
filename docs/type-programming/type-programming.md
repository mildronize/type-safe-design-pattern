---
outline: deep
---

# Type Programming

Type programming or type-level programmming, definition from [Type-Level Programming](https://type-level-typescript.com/), some developer say about [the Turing Complete type system](https://github.com/microsoft/TypeScript/issues/14833) in Typescript. Whatever it is, in my book, I will describe as **Type Programming**.

Type programming is the practice of writing programs that operate on types. In TypeScript, this is done using the type system. Type-level programming is a powerful technique that can be used to create complex type-level computations and to enforce constraints on types.


## Thinking Types as Variables

This might blow your mind, but in type programming, we can think of types as variables. We can declare a type and assign it a value. For example, we can declare a type `Age` and assign it the value `30`. This is similar to declaring a variable `age` and assigning it the value `30`.

```ts
// Declare a variable
const age = 30;
// Declare a type
type Age = 30;
```

## Mapping Programming to Type
| Generally Programming | Type Programming |
| --------------------- | ---------------- |
| Variable, Collection  | Type             |
| Object                | Interface        |
| Function              | Generic Type     |
| If-Else               | Conditional Type |
| Loop                  | Recursive Type   |

Why we don't call type programming with the similar name as programming? In my opinion, it's because the type programming is not a programming language. It's a type system that is used to enforce constraints on types. It might be confuse when call the same thing. In programming, we use variables to store values. In type programming, we use types to store constraints on values.

### Variable, Collection -> Type

In generally programming, a variable is a storage location and an associated symbolic name (an identifier) which contains some known or unknown quantity of information referred to as a value. The variable name is the way we refer to the value stored in the variable. 

In type programming, we can think of a type as a variable. We can declare a type and assign it a value. For example, we can declare a type `Age` and assign it the value `30`. This is similar to declaring a variable `age` and assigning it the value `30`.

```ts
// Declare a variable
const age = 30;
// Declare a type
type Age = 30;
```

For collection, in generally programming, a collection is a group of objects or values that are stored together. In type programming, we can think of a type as a collection. We can declare a type that contains a group of values. For example, we can declare a type `Numbers` that contains the values `1`, `2`, and `3`. This is similar to declaring an array `numbers` that contains the values `1`, `2`, and `3`.

```ts
// Declare an array
const numbers = [1, 2, 3];
// Declare a type
type Numbers = 1 | 2 | 3;
```

Don't be confused, in type programming, we can't store values in a type. The data type of `numbers` is an array of numbers (`number[]`).


### Object -> Interface

In generally programming, an object is a collection of properties, where each property has a name and a value. In type programming, we can think of an interface as an object. We can declare an interface that contains properties with names and values. 

For example, we can declare an interface `Person` with properties `name` and `age`. This is similar to declaring an object `person` with properties `name` and `age`.

```ts
// Declare an object
const person = {
  name: 'Alice',
  age: 30,
};
// Declare an interface
interface Person {
  name: 'Alice';
  age: 30;
}
```

### Function -> Generic Type

In generally programming, a function is a block of code that performs a specific task. In type programming, we can think of a generic type as a function. We can declare a generic type that takes input types and returns output types. 

For example, we can declare a generic type `Concat` that takes two input types `A` and `B` and returns an output type `Result`. This is similar to declaring a function `concat` that takes two input values `a` and `b` and returns an output value `a + b`.

```ts twoslash
// Declare a function
function concat(a: string, b: string): string {
  return `${a}${b}`;
}
// Declare a generic type
type Concat<A extends string, B extends string> = `${A}${B}`;

// Test the generic type
type Result = Concat<'Hello', 'World'>;
    // ^?    

// End of the example
```

### If-Else -> Conditional Type

In generally programming, an if-else statement is a control flow statement that allows us to execute different code blocks based on a condition. In type programming, we can think of a conditional type as an if-else statement. We can declare a conditional type that checks a condition and returns different types based on the condition.

For example, we can declare a conditional type `IsString` that checks if a type `T` is a string or not. This is similar to declaring an if-else statement that checks if a value is a string or not.

```ts twoslash
// Declare a conditional type
type IsString<T> = T extends string ? 'Yes' : 'No';

// Test the conditional type
type Test1 = IsString<string>;  // 'Yes'
type Test2 = IsString<number>;  // 'No'
```

::: warning
The `extends` keyword in the conditional type is used to check if a type `T` extends that type, 

From example, `T extends string` checks if a type `T` is assignable to a type `string`, in the other hands, you can think `T` is a subset of `string`.

This is not equivalent to `===` operator in JavaScript. The `extends` keyword in the conditional type is used to check if a type `T` is assignable to a type `string`.
:::

### Loop -> Recursive Type

In generally programming, a loop is a control flow statement that allows us to repeat a block of code multiple times. In type programming, we can think of a recursive type as a loop. We can declare a recursive type that repeats a type computation multiple times.

For example, we can declare a recursive type `FilterString` that filters out the string elements from an array type `T`. This is similar to writing a loop that filters out the string elements from an array.

```ts twoslash
// Declare a recursive type
type FilterString<T> = T extends [infer Head, ...infer Tail]
  ? Head extends string
    ? [Head, ...FilterString<Tail>]
    : FilterString<Tail>
  : [];

// Test the recursive type
type Test1 = FilterString<[1, 'hello', 2, 'world', 3]>;  // ['hello', 'world'];
type Test2 = FilterString<[1, 2, 3]>;  // []
```

### Summary

Type in TypeScript are similar to programming constructs in other languages. We can think of types as variables, interfaces as objects, generic types as functions, conditional types as if-else statements, and recursive types as loops. By thinking of types as variables, we can write type-level programs that operate on types.

However, some operators in type programming are not available in programming languages. For example, we can use the `keyof` operator to get the keys of an object type, the `infer` keyword to infer the type of a generic type, and the `never` type to represent an unreachable code path. These operators are unique to TypeScript and are not available in other programming languages.

Moreover, in case of `extends` keyword in conditional type, it's not equivalent to `===` operator in JavaScript. The `extends` keyword in the conditional type is used to check if a type `T` is assignable to a type `string`.

## Recommended Resources

- [type-challenges](https://github.com/type-challenges/type-challenges) Collection of TypeScript type challenges with online judge
- [TypeScript Awesome Template Literal Types](https://github.com/ghoullier/awesome-template-literal-types)
- [Type-Level Programming](https://type-level-typescript.com/)
- [Extreme Explorations of TypeScript's Type System](https://www.learningtypescript.com/articles/extreme-explorations-of-typescripts-type-system) by Josh Goldberg
- [TypeScript Type System Hacks](https://matt-rickard.com/typescript-type-system-hacks) by Matt Rickard