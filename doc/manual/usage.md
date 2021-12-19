# Usage

> :warning: Depending on your environment, the code may require
> `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

First, require the polyfill at the entry point of your application
```js
await import('regenerator-runtime/runtime.js');
// or
import 'regenerator-runtime/runtime.js';
```

Then, import the library where needed
```js
const {Trie, ArrayNode, ObjectNode} = await import('@trie-data-structure/uncompressed-trie');
// or
import {Trie, ArrayNode, ObjectNode} from '@trie-data-structure/uncompressed-trie';
```
