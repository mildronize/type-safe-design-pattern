---
outline: deep
---

# Function Argument

A function argument is a value passed to a function when it is called. Arguments are used to provide input to the function so that it can perform its task. Functions can have zero or more arguments, and the number of arguments a function can accept is determined by its signature.

Let's see step by step how to implement the Function Argument pattern.

## Example 1: Fetcher

In this example, we simply want to fetch data from a URL using the `fetch` API. 

```ts twoslash
const result = await fetch("http://localhost:3000/api/users", {
  method: "GET",
});
```

### Wrapping with a Function
When we want to make it more reusable, we can create a function that accepts the URL and the method as arguments.

```ts twoslash
// Define the fetcher options
interface FetcherOptions {
  baseUrl: string;
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

// Define the fetcher function
function fetcher(options: FetcherOptions) {
  return fetch(`${options.baseUrl}${options.path}`, {
    method: options.method ?? "GET",
  });
}

// Usage
await fetcher({ baseUrl: "http://localhost:3000", path: "/api/users" });
```

In this example, we created a `fetcher` function that accepts an object with the `baseUrl`, `path`, and `method` properties. This function is more reusable and can be used to fetch data from different URLs. 

### Using a Function Argument

However, when we want to call `fetcher`, we need to passing the `baseUrl` in every call. To make it more convenient, we can create a function that returns the `fetcher` function result with the `baseUrl` already set.

```ts{3,9-30} twoslash
/// <reference types="node" />
// Define the fetcher options
type FetcherOptionFunc<Context extends object = {}> = (context: Context) => {
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  logMessage?: string;
};

type Env = "dev" | "prod";
type EnvOptions = {
  activeEnv: Env;
  env: Record<
    Env,
    {
      baseUrl: string;
    }
  >;
};

const context: EnvOptions = {
  activeEnv: "dev",
  env: {
    dev: {
      baseUrl: "http://localhost:3000",
    },
    prod: {
      baseUrl: "https://api.example.com",
    },
  },
};

function fetcher(optionFunction: FetcherOptionFunc<EnvOptions>) {
  const options = optionFunction(context); // [!code highlight]

  if (options.logMessage) console.log(options.logMessage); // [!code highlight]

  const baseUrl = context.env[context.activeEnv].baseUrl;  // [!code highlight]
  return fetch(`${baseUrl}${options.path}`, {
    method: options.method ?? "GET",
  });
}

await fetcher((c) => ({
  path: "/api/users",
  logMessage:  // [!code highlight]
    `[Env=${c.activeEnv}] Fetching users from ${c.env[c.activeEnv].baseUrl}`, // [!code highlight]
}));
```

In this example, we created a `fetcher` function that accepts a function that returns an object with the `baseUrl`, `path`, `method`, and `logMessage` properties. This function is more flexible and allows us to set the `baseUrl` based on the environment. We can also add a `logMessage` property to log a message before fetching the data.

### Decoupling the Function Logic

By using the Function Argument pattern, we can create more flexible and reusable functions that accept different arguments and configurations. This pattern allows us to decouple the function logic from the input values, making the function more versatile and easier to maintain.

```ts{10-13} twoslash
/// <reference types="node" />
/**
 * Define the fetcher options
 */
type FetcherOptionFunc<Context extends object = {}> = (context: Context) => {
  path?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  logMessage?: string;
};
type EnvBase = {
  activeEnv: string,
  env: Record<string, { baseUrl: string }>,
}

/**
 * Create a fetcher function with the context
 */
function createFetcher<Context extends EnvBase>(context: Context) {  // [!code highlight]
  return function fetcher(optionFunction: FetcherOptionFunc<Context>) {
    const options = optionFunction(context);

    if (options.logMessage) console.log(options.logMessage);
    
    const baseUrl = context.env[context.activeEnv].baseUrl;
    return fetch(`${baseUrl}${options.path}`, {
      method: options.method ?? "GET",
    });
  };
}  // [!code highlight]

/**
 * Usage
 */

type Env = "dev" | "prod";
type EnvOptions = {
  activeEnv: Env;
  env: Record<
    Env,
    {
      baseUrl: string;
    }
  >;
};

const fetcher = createFetcher<EnvOptions>({  // [!code highlight]
  activeEnv: process.env.NODE_ENV === "production" ? "prod" : "dev",
  env: {
    dev: {
      baseUrl: "http://localhost:3000",
    },
    prod: {
      baseUrl: "https://api.example.com",
    },
  },
});  // [!code highlight]

await fetcher((c) => ({
  path: "/api/users",
  logMessage: 
    `[Env=${c.activeEnv}] Fetching users from ${c.env[c.activeEnv].baseUrl}`,
}));
```

In this example, we created a `createFetcher` function that returns a `fetcher` function with the context already set. This allows us to create a `fetcher` function with the environment configuration and reuse it multiple times without passing the context every time.