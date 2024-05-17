# Function Argument

A function argument is a value passed to a function when it is called. Arguments are used to provide input to the function so that it can perform its task. Functions can have zero or more arguments, and the number of arguments a function can accept is determined by its signature.

## Examples

```ts
import { ODataExpression} from 'ts-odata-client';

const result = ODataExpression.forV4<User>()
  .filter((p) => p.firstName.$equals("john"))
  .build();

console.log(results);
```

Implementing a function argument instead of a plain object:

```ts
export class ODataQueryBase<T, U = ExcludeProperties<T, unknown[]>> {
  public filter(
    predicate:
      | BooleanPredicateBuilder<T>
      | ((builder: EntityProxy<T, true>, functions: FilterAccessoryFunctions<T>) => BooleanPredicateBuilder<T>),
  ) {
    if (typeof predicate === "function")
      predicate = predicate(
        this.provider[createProxiedEntity]() as unknown as EntityProxy<T, true>,
        new FilterAccessoryFunctions<T>(),
      );

    const expression = new Expression(ExpressionOperator.Predicate, [predicate], this.expression);
    return this.provider.createQuery<T, U>(expression);
  }
}
```

From [ts-odata-client](https://github.com/cbrianball/ts-odata-client/blob/7b55184beebe5a08437863035f7bac29c341025a/src/lib/ODataQueryBase.ts#L106-L119)


## Example Projects
- ts-odata-client