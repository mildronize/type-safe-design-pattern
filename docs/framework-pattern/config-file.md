# Config File

When we talk about config file, it look like it's simpest feature while writing the code, however, 
behind the scene, they need to be designed with complex logic and type interface to ensure that the config file is type-safe.

## Using Simple Object

For example:

In next.js, they use `next.config.mjs` to configure the next.js project.

```ts
// @ts-check
 
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
}
 
export default nextConfig
```

## Using Function as a Config

For example: 

In Vite or Vitest, they use `defineConfig` to configure the project.

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  /* config options here */
})
```