# Mapped Types

In generally programming, a map is a data structure that allows us to store key-value pairs. In type programming, we can think of a mapped type as a map. We can declare a mapped type that maps a set of keys to a set of values.

## Declare a Mapped Type

For example, we can declare a mapped type `CopyMap` that just copies the input type `T`. This is similar to declaring a map that copies the key-value pairs of another map. The result of the mapped type `CopyMap` is the same as the input type `T`.

```ts twoslash
// Declare a mapped type
type Person = {
  name: string;
  age: number;
};

type CopyMap<T> = {
  [Key in keyof T]: T[Key];
};

// Test the mapped type
type Test = CopyMap<Person>;
    // ^?




// End of the example
```

In the example above, `CopyMap` Type return the same thing that input from `T`, we declare a mapped type `CopyMap` that maps a set of keys `Key` to a set of values `T[Key]`. We use the `keyof` operator to get the keys of the type `T` and the `in` operator to iterate over the keys. We then use the key `Key` to access the value `T[Key]` and map it to the key `Key`. 

## Thinking Mapped Types are Loops

Too hard to understand? You can think of mapped types as loops. We loop in each key of `Person` and map it to the value of `Person` type. Check the js-like pseudo code below:

```js
function CopyMap(Person) {
  const Result = {};
  for(const Key in Object.keys(Person)) {
    Result[Key] = Person[Key];
  }
  return Result;
}
```

But wait!, we can't use `for` loop in type programming. We use mapped types to loop over the keys of a type and map them to the values of the type. This is similar to using a loop to iterate over the keys of an object and map them to the values of the object.

Go back to `CopyMap` type, in the code below:

```ts twoslash
type CopyMap<T> = {
  [Key in keyof T]: T[Key];
};
```

We use the `keyof` operator which returns the keys of the type `Person`, that is `"name" | "age"` in this case. We then use the `in` operator to iterate over the keys and map them to the values of the type `Person`. The result of the mapped type `CopyMap` is the same as the input type `Person`.

Note that, when we use `in` operator, we can act of union types to be arrary of keys (From the programming realm, we can't do this). For example, `keyof Person` returns `"name" | "age"`, we can think of it as `["name", "age"]` in the programming realm.