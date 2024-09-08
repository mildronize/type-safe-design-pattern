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

```ts
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
// TypeScript infers this as a `string` type, but it should be 'PayPal' or 'Stripe'

```

In this example, we defined the `paymentMethod` as a `string` in the `PaymentAdapterBase` interface. However, the adapters (`PayPalAdapter` and `StripeAdapter`) assign specific string literals, `'PayPal'` and `'Stripe'`, to the `paymentMethod` property. When accessed via `paymentProcessor.payment.paymentMethod`, TypeScript does not narrow the type and still treats it as a general `string`.

### Why This Happens

The issue arises because the `PaymentAdapterBase` interface declares `paymentMethod` as a `string`, which is a broad type. Even though each specific adapter provides a more precise string literal, TypeScript defaults to the general type defined in the interface.

### Solution: Use String Literal Types

We can solve this by using string literal types in the interface to ensure that the type system recognizes the specific values used by each adapter. Here's how we can modify the code:

```ts
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
// Now TypeScript correctly infers the type as 'PayPal' or 'Stripe'

```

### How It Works

By explicitly defining the `paymentMethod` type in the `PaymentAdapterBase` interface as a union of `'PayPal' | 'Stripe'`, TypeScript can now infer the correct type when accessing the `paymentMethod` property. This ensures that the value will be either `'PayPal'` or `'Stripe'` and not a generic `string`.

### Benefits

- **Type Safety**: The solution provides better type safety. If a new payment method is added, TypeScript will catch any missing or incorrect types.
- **Code Readability**: The correct inference of `paymentMethod` makes the code more readable and understandable, reducing the likelihood of errors when dealing with specific payment providers.

In conclusion, when using the Adapter Pattern in TypeScript, it's essential to ensure that type inference works as expected by explicitly using string literal types when dealing with properties like `paymentMethod`. This avoids the pitfalls of overly generic types and makes your code more robust and maintainable.