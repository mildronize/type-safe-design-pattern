---
outline: deep
---

# Glossary

## T

### Type loosing

**Type loosing**: The process of increase possibility of types or broadening types when converting from one type to another.

For example, when you convert from `'UP'` to `'UP' | 'DOWN'`, you are broadening the type. That's means you are loosing type information. because the possibility of types is increased, not only `'UP'` but also `'DOWN'`.

### Type tightening

**Type tightening**: The process of decrease possibility of types or narrowing types when converting from one type to another. 

For example, when you convert from `'UP' | 'DOWN'` to `'UP'`, you are narrowing the type. That's means you are tightening type information. because the possibility of types is decreased, not only `'UP' | 'DOWN'` but also `'UP'`.
