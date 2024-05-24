# Generics

## Basic Generics

TBA...

## Understanding Type Inference from Function Arguments

When you pass a function as an argument, TypeScript will infer the type of the function based on the arguments passed to it. This is known as type inference.

```ts twoslash
function identity<T>(arg: T): T {
  return arg;
}

identity(42); // number
// ^?

// End of Example
```

In the above example, TypeScript infers the type of `T` as `number` because the argument passed to the `identity` function is a number.

### Think Generic Param as a variable

Generics are like variables for types. When you define a generic type, you are defining a placeholder for a type that will be determined when the generic type is used.

Defining generic types is similar to defining variables, you can use in every place where it is in scope. For example below, `Path` is a generic type that can be used in the function signature and return type.

```ts twoslash
type Paths = {
  "/": "home";
  "/about": "about";
  "/users": "users";
};

function routeTo<Path extends keyof Paths>(path: Path) {
  return path as Path;
}

routeTo("/users");
  //^?

// End of Example
```

Moreover, you can use generic with any type features such as template literal types. 
If I want to function that recieve one more argument and return a string that is a combination of the two arguments, I can use template literal types with generics.

```ts twoslash
type Paths = {
  "/": "home";
  "/about": "about";
  "/users": "users";
};

function routeTo<
  Path extends keyof Paths, 
  Param extends string
>(path: Path, params: Param) {
  return `${path}/${params}` as `${Path}/${Param}`;
}

routeTo("/users", '324');
// ^?

// End of Example
```

For example, the `routeTo` function takes two arguments: `path` and `params`. The `path` argument is a key of the `Paths` type, and the `params` argument is a string. The function returns a string that is a combination of the two arguments. So, the return type will be `"/users/324"`.