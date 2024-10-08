# Adapter Pattern

In software design, the Adapter Pattern allows incompatible interfaces to work together by converting the interface of a class into another interface expected by the client. This pattern is especially useful when integrating with third-party services or legacy systems. It helps decouple the client code from the specifics of a service by using an abstraction, making the system more flexible and easier to maintain.

## Basic Adapter Pattern

Let’s consider a scenario where we have different payment providers like PayPal and Stripe. Each provider has its own implementation, but we want a unified interface to interact with them so that our application doesn't need to change depending on the provider.

In this case, we can use the Adapter Pattern to create a common interface for payments, and then implement specific adapters for PayPal and Stripe.

### Step 1: Define a Common Interface

The first step is to define a common interface for payments. In our example, the `PaymentAdapterBase` interface ensures that every payment method we implement follows the same contract.

```ts
export interface PaymentAdapterBase {
  pay(amount: number): void;
}
```

This interface defines a `pay` method that accepts an `amount` parameter. Any class that implements this interface must provide its own logic for how the payment is processed.

### Step 2: Create Adapters for Payment Providers

We can now create adapter classes for PayPal and Stripe. Each class implements the `PaymentAdapterBase` interface and provides its own implementation of the `pay` method.

```ts
export class PayPalAdapter implements PaymentAdapterBase {
  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase {
  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}
```

In this example, `PayPalAdapter` and `StripeAdapter` each have their own way of handling payments. However, they both adhere to the same interface (`PaymentAdapterBase`), ensuring consistency.

### Step 3: Use the PaymentProcessor

To simplify how we handle payments, we create a `PaymentProcessor` class that accepts any implementation of `PaymentAdapterBase`. This allows us to change payment providers without modifying the client code.

```ts
class PaymentProcessor {
  constructor(protected readonly payment: PaymentAdapterBase) { }

  pay(amount: number) {
    this.payment.pay(amount);
  }
}
```

Here, `PaymentProcessor` uses dependency injection to accept any `PaymentAdapterBase` implementation. This way, you can swap out payment providers without changing the logic of the `PaymentProcessor` class itself.

### Step 4: Making a Payment

Now that we have everything set up, we can use the `PaymentProcessor` to process payments with different providers.

```ts
const payment = new PaymentProcessor(new PayPalAdapter());
payment.pay(100);
```

In this example, the `PaymentProcessor` uses the `PayPalAdapter` to process the payment of `$100`. If we want to switch to Stripe, we can easily replace `PayPalAdapter` with `StripeAdapter` without making changes to the `PaymentProcessor`:

```ts
const payment = new PaymentProcessor(new StripeAdapter());
payment.pay(100);
```

### Benefits of the Adapter Pattern

- **Flexibility**: The Adapter Pattern allows us to switch between different payment providers without altering the core business logic.
- **Reusability**: By creating adapters for each payment provider, we can easily reuse these classes in other parts of the system.
- **Decoupling**: The pattern decouples the client from specific implementations, allowing us to change or add new payment providers with minimal effort.

The Adapter Pattern is particularly useful when integrating external systems or working with legacy code, as it enables us to standardize interactions without changing the underlying systems.

### Conclusion

In this section, we demonstrated how to use the Adapter Pattern in TypeScript to unify different payment providers under a common interface. This pattern provides flexibility and maintainability, especially when working with multiple services that have different APIs.

## Type Inference Problem in Adapter Pattern

One common issue when using the Adapter Pattern in TypeScript is related to type inference, especially when trying to access specific properties of an adapter. Let’s look at an example that highlights this problem.

Consider the following code:

```ts
const paymentMethod = paymentProcessor.payment.paymentMethod;

```

In this case, `paymentMethod` is inferred to be of type `string`. However, since the `paymentMethod` in our adapters is either `'PayPal'` or `'Stripe'`, we expect the type system to narrow down the type to those specific values. Instead, it defaults to the broader `string` type.

### The Problem with Generic `string` Type

Here’s the full code where this problem occurs:

```ts twoslash
export interface PaymentAdapterBase {
  paymentMethod: string;
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentAdapterBase {
  paymentMethod = 'PayPal';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase {
  paymentMethod = 'Stripe';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}

class PaymentProcessor {
  constructor(public readonly payment: PaymentAdapterBase) { }

  pay(amount: number) {
    this.payment.pay(amount);
  }
}

const paymentProcessor = new PaymentProcessor(new PayPalAdapter());
paymentProcessor.pay(100);

const paymentMethod = paymentProcessor.payment.paymentMethod;
//     ^?



// ^-- TypeScript infers this as a `string` type, 
//     but it should be 'PayPal' or 'Stripe'

```

In this example, we defined the `paymentMethod` as a `string` in the `PaymentAdapterBase` interface. However, the adapters (`PayPalAdapter` and `StripeAdapter`) assign specific string literals, `'PayPal'` and `'Stripe'`, to the `paymentMethod` property. When accessed via `paymentProcessor.payment.paymentMethod`, TypeScript does not narrow the type and still treats it as a general `string`.

### Why This Happens

The issue arises because the `PaymentAdapterBase` interface declares `paymentMethod` as a `string`, which is a broad type. Even though each specific adapter provides a more precise string literal, TypeScript defaults to the general type defined in the interface.

### Solution: Use String Literal Types

We can solve this by using string literal types in the interface to ensure that the type system recognizes the specific values used by each adapter. Here's how we can modify the code:

```ts twoslash
export interface PaymentAdapterBase {
  paymentMethod: 'PayPal' | 'Stripe';
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentAdapterBase {
  paymentMethod: 'PayPal' = 'PayPal';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase {
  paymentMethod: 'Stripe' = 'Stripe';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}

class PaymentProcessor {
  constructor(public readonly payment: PaymentAdapterBase) { }

  pay(amount: number) {
    this.payment.pay(amount);
  }
}

const paymentProcessor = new PaymentProcessor(new PayPalAdapter());
paymentProcessor.pay(100);

const paymentMethod = paymentProcessor.payment.paymentMethod;
//     ^?



// ^--- Now TypeScript correctly infers the type as 'PayPal' or 'Stripe'

```

### How It Works

By explicitly defining the `paymentMethod` type in the `PaymentAdapterBase` interface as a union of `'PayPal' | 'Stripe'`, TypeScript can now infer the correct type when accessing the `paymentMethod` property. This ensures that the value will be either `'PayPal'` or `'Stripe'` and not a generic `string`.

### Benefits

- **Type Safety**: The solution provides better type safety. If a new payment method is added, TypeScript will catch any missing or incorrect types.
- **Code Readability**: The correct inference of `paymentMethod` makes the code more readable and understandable, reducing the likelihood of errors when dealing with specific payment providers.

In conclusion, when using the Adapter Pattern in TypeScript, it's essential to ensure that type inference works as expected by explicitly using string literal types when dealing with properties like `paymentMethod`. This avoids the pitfalls of overly generic types and makes your code more robust and maintainable.


## Problem with Union Type in Adapter Pattern

When using the union type for the `paymentMethod` property, we encounter a new issue. In the previous example:

```ts twoslash
export interface PaymentAdapterBase {
  paymentMethod: 'PayPal' | 'Stripe';
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentAdapterBase {
  paymentMethod: 'PayPal' = 'PayPal';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase {
  paymentMethod: 'Stripe' = 'Stripe';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}

class PaymentProcessor {
  constructor(public readonly payment: PaymentAdapterBase) { }

  pay(amount: number) {
    this.payment.pay(amount);
  }
}
// ---cut---
const paymentProcessor = new PaymentProcessor(new PayPalAdapter());
paymentProcessor.pay(100);

const paymentMethod = paymentProcessor.payment.paymentMethod;
//      ^?



//           ^--  This will be of union type "PayPal" | "Stripe"
```

The `paymentMethod` is inferred as a union type `'PayPal' | 'Stripe'`. However, we know that the specific adapter assigned to `PaymentProcessor` is `PayPalAdapter`, meaning the `paymentMethod` should only be `'PayPal'`. This mismatch can lead to problems in terms of accuracy and code clarity.

### Union Type Issue

Even though we are passing a `PayPalAdapter`, TypeScript still treats the `paymentMethod` as a union of both `'PayPal'` and `'Stripe'` due to the union type defined in the `PaymentAdapterBase` interface. This can be confusing because, at runtime, we know that the value will only be `'PayPal'` in this specific instance. This issue arises because the type system doesn’t narrow down the type based on the concrete adapter used.

### Scalability Limitation

Another limitation of the current approach is that `PaymentAdapterBase` only supports two adapters: `PayPalAdapter` and `StripeAdapter`. As your application grows, this becomes less scalable. Adding a new payment method would require extending the union type, which is not future-proof and could lead to maintenance difficulties.

### Solution: Generic `PaymentAdapterBase`

To address both of these issues, we can use generics in the `PaymentAdapterBase` interface. This approach ensures that the `paymentMethod` type is correctly inferred based on the specific adapter used and allows for better scalability as new adapters are added.

### Refined Code with Generic Types

Here is the solution that addresses these issues:

```ts twoslash
export interface PaymentAdapterBase<TPaymentMethod extends string> {
  paymentMethod: TPaymentMethod;
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentAdapterBase<'PayPal'> {
  readonly paymentMethod = 'PayPal';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase<'Stripe'> {
  readonly paymentMethod = 'Stripe';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}

class PaymentProcessor<TPaymentMethod extends string> {
  constructor(public readonly payment: PaymentAdapterBase<TPaymentMethod>) { }

  pay(amount: number) {
    this.payment.pay(amount);
  }
}

const paymentProcessor = new PaymentProcessor(new PayPalAdapter());
paymentProcessor.pay(100);

const paymentMethod = paymentProcessor.payment.paymentMethod;
//      ^?



// ^-- Now, the paymentMethod is correctly inferred as "PayPal"

```

### How It Solves the Problem

1. **Accurate Type Inference**:
By using the generic `PaymentAdapterBase<TPaymentMethod extends string>`, we allow TypeScript to correctly infer the type of `paymentMethod` based on the specific adapter used. In the example above, since we passed `PayPalAdapter` to the `PaymentProcessor`, the `paymentMethod` is inferred as `'PayPal'` and not as a union type.
2. **Scalability**:
This approach makes the solution more scalable. By using generics, we no longer need to explicitly modify the `PaymentAdapterBase` interface whenever we add a new payment method. Instead, each adapter defines its own specific `paymentMethod`, making it easy to add new adapters in the future without altering the core logic.

### Benefits of This Approach

- **Type-Safe**: The type of `paymentMethod` is now tightly coupled with the specific adapter used, eliminating the ambiguity of the union type.
- **Scalability**: New payment methods can be easily added without modifying the base interface. Each adapter simply defines its own `paymentMethod` type, making the system more maintainable and flexible.
- **Code Clarity**: The code is now easier to read and reason about, as the types are precisely tied to the specific implementations of each adapter.

### Conclusion

The solution presented here resolves the issues of type inference and scalability by using generics in the `PaymentAdapterBase` interface. This ensures that the `paymentMethod` type is accurately inferred based on the adapter used, while also allowing for the seamless addition of new adapters in the future without modifying existing code. This approach not only improves type safety but also enhances the flexibility and maintainability of your application’s architecture.


## Adding a Default Adapter with Type-Safety

In some cases, it may be useful to define a default adapter in the `PaymentProcessor` class, while still maintaining strict type safety. The goal is to allow the `PaymentProcessor` to default to an adapter (e.g., `PayPalAdapter`) if none is provided, but still ensure that the type of `paymentMethod` remains accurate and specific based on the actual adapter used.

### Initial Attempt with Default Adapter

Let's first attempt to modify the `PaymentProcessor` class to accept an optional adapter and default to `PayPalAdapter` if none is provided:

```ts twoslash
export interface PaymentAdapterBase<TPaymentMethod extends string> {
  paymentMethod: TPaymentMethod;
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentAdapterBase<'PayPal'> {
  readonly paymentMethod = 'PayPal';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase<'Stripe'> {
  readonly paymentMethod = 'Stripe';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}
// ---cut---
class PaymentProcessor<TAdapter extends PaymentAdapterBase<string>> {
  public payment: TAdapter;
  constructor(payment?: TAdapter) {
    this.payment = payment ?? new PayPalAdapter() as TAdapter;
  }

  pay(amount: number) {
    this.payment.pay(amount);
  }
}

const paymentProcessor = new PaymentProcessor();
paymentProcessor.pay(100);

const paymentMethod = paymentProcessor.payment.paymentMethod;
//      ^?



// ^-- TypeScript will infer `paymentMethod` as `string`,
//     causing the same problem again.

```

While this works in terms of functionality, we face the same problem with type inference. Even though we default to `PayPalAdapter`, the `paymentMethod` is still inferred as `string`, which is not ideal. We want `paymentMethod` to be specific, such as `'PayPal'`, when `PayPalAdapter` is used.

### Second Attempt: Incorrect Generic Definition

After realizing the problem with the union type in the initial attempt, we tried to refactor the code to maintain type safety and allow for a default adapter. However, the following refactor introduces a new issue with how the generic types are defined:

```ts twoslash
export interface PaymentAdapterBase<TPaymentMethod extends string> {
  paymentMethod: TPaymentMethod;
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentAdapterBase<'PayPal'> {
  readonly paymentMethod = 'PayPal';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase<'Stripe'> {
  readonly paymentMethod = 'Stripe';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}

class PaymentProcessor<TAdapter extends PaymentAdapterBase<string>> {
  constructor(public payment: TAdapter) {}

  pay(amount: number) {
    this.payment.pay(amount);
  }
}
// ---cut---
const createPaymentProcessor = <TAdapter extends PaymentAdapterBase<string>>(defaultAdapter: TAdapter) => ({
  create(adapter?: TAdapter): PaymentProcessor<TAdapter> {
    if(adapter){
      return new PaymentProcessor(adapter) as unknown as PaymentProcessor<TAdapter>;
    }
    return new PaymentProcessor(defaultAdapter) as unknown as PaymentProcessor<TAdapter>;
  }
});
```

In this refactor, we attempt to use a factory function that takes a `defaultAdapter` of type `TAdapter`. The `create` method either accepts a custom adapter or falls back to the `defaultAdapter`.

Here is how we tried to use it:

```ts
const initPaymentProcessor = createPaymentProcessor(new PayPalAdapter());
const paymentProcessor = initPaymentProcessor.create(new StripeAdapter());
```

However, this code leads to a **type error**:

```
Argument of type 'StripeAdapter' is not assignable to parameter of type 'PayPalAdapter'.
Types of property 'paymentMethod' are incompatible.
  Type '"Stripe"' is not assignable to type '"PayPal"'.ts(2345)
```

#### Why This Fails

The issue arises because the generic type `TAdapter` is defined once in the factory function, and the system expects that type to remain consistent throughout the `create` method. In this case, `TAdapter` is inferred as `PayPalAdapter` from the default adapter. When we try to pass a `StripeAdapter`, TypeScript expects the adapter to be compatible with `PayPalAdapter`, which it is not, since `paymentMethod` has different values.

Essentially, TypeScript expects the `adapter` passed to the `create` method to match the type of the default adapter (`PayPalAdapter`), leading to the type error when trying to pass in `StripeAdapter`.

#### Key Takeaway

This second attempt demonstrates the challenge of defining a generic type too strictly. The type system locks in `TAdapter` based on the default adapter, preventing flexibility in passing other adapters later on. This approach fails because it doesn't allow for a different adapter type to be passed without violating the type constraints.

### Refactoring for Better Type Inference

To address this issue, we need to refactor how the default adapter is handled. Specifically, we can introduce a factory function to create a `PaymentProcessor` with a default adapter, while still preserving type safety and allowing for the adapter to be configurable.

Here’s how we can achieve this:

```ts twoslash
export interface PaymentAdapterBase<TPaymentMethod extends string> {
  paymentMethod: TPaymentMethod;
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentAdapterBase<'PayPal'> {
  readonly paymentMethod = 'PayPal';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase<'Stripe'> {
  readonly paymentMethod = 'Stripe';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}

class PaymentProcessor<TAdapter extends PaymentAdapterBase<string>> {
  constructor(public payment: TAdapter) {}

  pay(amount: number) {
    this.payment.pay(amount);
  }
}
// ---cut---
const createPaymentProcessor = <TDefaultAdapter extends PaymentAdapterBase<string>>(defaultAdapter: TDefaultAdapter) => ({
  create<TAdapter extends PaymentAdapterBase<string> = TDefaultAdapter>(adapter?: TAdapter): PaymentProcessor<TAdapter> {
    if (adapter) {
      return new PaymentProcessor(adapter) as unknown as PaymentProcessor<TAdapter>;
    }
    return new PaymentProcessor(defaultAdapter) as unknown as PaymentProcessor<TAdapter>;
  }
});

```

In this refactor, the `createPaymentProcessor` function returns an object with a `create` method. The `create` method allows for an optional `adapter` to be passed in, defaulting to the `TDefaultAdapter` type if none is provided. This ensures that the type of `paymentMethod` remains specific to the adapter used, whether it’s the default or a provided one.

### Full Example

```ts twoslash
export interface PaymentAdapterBase<TPaymentMethod extends string> {
  paymentMethod: TPaymentMethod;
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentAdapterBase<'PayPal'> {
  readonly paymentMethod = 'PayPal';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with PayPal`);
  }
}

export class StripeAdapter implements PaymentAdapterBase<'Stripe'> {
  readonly paymentMethod = 'Stripe';

  pay(amount: number): void {
    console.log(`Pay amount ${amount}$ with Stripe`);
  }
}

class PaymentProcessor<TAdapter extends PaymentAdapterBase<string>> {
  constructor(public readonly payment: TAdapter) { }

  pay(amount: number) {
    this.payment.pay(amount);
  }
}

const createPaymentProcessor = <TDefaultAdapter extends PaymentAdapterBase<string>>(defaultAdapter: TDefaultAdapter) => ({
  create<TAdapter extends PaymentAdapterBase<string> = TDefaultAdapter>(adapter?: TAdapter): PaymentProcessor<TAdapter> {
    if (adapter) {
      return new PaymentProcessor(adapter) as unknown as PaymentProcessor<TAdapter>;
    }
    return new PaymentProcessor(defaultAdapter) as unknown as PaymentProcessor<TAdapter>;
  }
});

const initPaymentProcessor = createPaymentProcessor(new PayPalAdapter());
const paymentProcessor = initPaymentProcessor.create(new StripeAdapter());

paymentProcessor.pay(100);

const paymentMethod = paymentProcessor.payment.paymentMethod;
//      ^?



// ^-- Now, `paymentMethod` is correctly inferred as 'Stripe'.

```

### How This Works

1. **Generics for Flexibility**:
The `createPaymentProcessor` function uses generics to allow the type of the default adapter to be passed in. The `create` method also uses generics to accept either a specific adapter or default to the one provided during initialization.
2. **Type-Safe Inference**:
By using generics and default types, TypeScript is able to correctly infer the type of `paymentMethod` based on the specific adapter used. If no adapter is passed to `create`, the `paymentMethod` will be inferred based on the default adapter. If an adapter is passed, TypeScript will infer the type based on that adapter.
3. **Scalability**:
This solution remains scalable. You can easily add more payment adapters without modifying the core logic, and the type system will continue to work correctly, inferring the specific type of `paymentMethod` based on the adapter passed.

### Conclusion

By refactoring the `PaymentProcessor` class to use a factory function and generics, we are able to achieve both type safety and flexibility. This approach allows for a default adapter to be provided while maintaining correct type inference, ensuring that the `paymentMethod` is always accurately typed based on the adapter used.


