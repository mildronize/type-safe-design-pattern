# Function Overloading

Function overloading is a feature that allows creating multiple functions with the same name but different parameters. It is a way to achieve polymorphism in programming languages that do not support it natively.

## Examples

```ts
import { ODataQueryProvider } from 'ts-odata-client';

export class ODataV4QueryProvider extends ODataQueryProvider {
  executeQueryAsync<T extends ODataResponse>(expression?: Expression): Promise<T>;
  executeQueryAsync<T extends ODataResponse>(odataUrl: string): Promise<T>;
  async executeQueryAsync<T extends ODataResponse>(value?: Expression | string): Promise<T> {
    if (typeof value !== "string") value = this.buildQuery(value);
    const response = await this.sendRequest(value);

    if (response.ok) {
      return (await response.json()) as T;
    }

    throw new Error(JSON.stringify(await response.json()));
  }
}
```

From the example above, the `executeQueryAsync` method is overloaded to accept either an `Expression` or a `string` parameter. This allows the method to be called with different types of arguments while maintaining the same name. From [ts-odata-client](https://github.com/cbrianball/ts-odata-client/blob/7b55184beebe5a08437863035f7bac29c341025a/src/lib/ODataV4QueryProvider.ts#L35-L46)

## Example Projects
- Hono
- ts-odata-client