# Examples

A curated list of awesome things related to Type Programming


## Extracting URL Parameters



```ts twoslash
// ✅ Correct type example
navigate("user/:userId", { userId: "2"});

// ✅ Correct type example, which is `dashboardId` is optional.
navigate("user/:userId/dashboard(/:dashboardId)", { userId: "2" });

// ❌ Incorrect Type, `userId` is missing. Add one to fix the error!
// @ts-expect-error
navigate("user/:userId/dashboard(/:dashboardId)", { dashboardId: "2" });

// ❌ Incorrect Type, `oops` isn't a parameter. Remove it to fix the error!
// @ts-expect-error
navigate("user/:userId/dashboard(/:dashboardId)", { userId: "2", oops: ":(" });

// Here is the implementation

type ParseUrlParams<url> =
  url extends `${infer path}(${infer optionalPath})`
    ? ParseUrlParams<path> & Partial<ParseUrlParams<optionalPath>>
    : url extends `${infer start}/${infer rest}`
    ? ParseUrlParams<start> & ParseUrlParams<rest>
    : url extends `:${infer param}`
    ? { [k in param]: string }
    : {};

// navigate to a different route
function navigate<T extends string>(
  path: T,
  params: ParseUrlParams<T>
) {
  // interpolate params
  let url = Object.entries<string>(params).reduce<string>(
    (path, [key, value]) => path.replace(`:${key}`, value),
    path
  );

  // clean url
  url = url.replace(/(\(|\)|\/?:[^\/]+)/g, '')

  // update url
  history.pushState({}, '', url);
}
```

The example from [Type-level Programming](https://type-level-typescript.com/) book. It shows how to extract URL parameters from a string and navigate to a different route.

