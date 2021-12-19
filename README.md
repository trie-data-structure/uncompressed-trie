:chains: [@trie-data-structure/uncompressed-trie](https://trie-data-structure.github.io/uncompressed-trie)
==

Trie data structures for JavaScript.
See [docs](https://trie-data-structure.github.io/uncompressed-trie/index.html).

> :warning: Depending on your environment, the code may require
> `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

```js
import {Trie, ArrayNode} from '@trie-data-structure/uncompressed-trie';
import {range} from '@iterable-iterator/range';
import {map} from '@iterable-iterator/map';

const encode = (key) => map((i) => key.charCodeAt(i), range(key.length));
const degree = 256;
const trie = new Trie(new ArrayNode(degree));

const set = (key, value) => trie.set(encode(key), value);
const get = (key) => trie.get(encode(key));

set('abra', 1);
set('cadabra', 2);
set('abracadabra', 3);

get('abra'); // 1
get('cadabra'); // 2
get('abracadabra'); // 3
```

[![License](https://img.shields.io/github/license/trie-data-structure/uncompressed-trie.svg)](https://raw.githubusercontent.com/trie-data-structure/uncompressed-trie/main/LICENSE)
[![Version](https://img.shields.io/npm/v/@trie-data-structure/uncompressed-trie.svg)](https://www.npmjs.org/package/@trie-data-structure/uncompressed-trie)
[![Tests](https://img.shields.io/github/workflow/status/trie-data-structure/uncompressed-trie/ci:test?event=push&label=tests)](https://github.com/trie-data-structure/uncompressed-trie/actions/workflows/ci:test.yml?query=branch:main)
[![Dependencies](https://img.shields.io/david/trie-data-structure/uncompressed-trie.svg)](https://david-dm.org/trie-data-structure/uncompressed-trie)
[![Dev dependencies](https://img.shields.io/david/dev/trie-data-structure/uncompressed-trie.svg)](https://david-dm.org/trie-data-structure/uncompressed-trie?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/trie-data-structure/uncompressed-trie.svg)](https://github.com/trie-data-structure/uncompressed-trie/issues)
[![Downloads](https://img.shields.io/npm/dm/@trie-data-structure/uncompressed-trie.svg)](https://www.npmjs.org/package/@trie-data-structure/uncompressed-trie)

[![Code issues](https://img.shields.io/codeclimate/issues/trie-data-structure/uncompressed-trie.svg)](https://codeclimate.com/github/trie-data-structure/uncompressed-trie/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/trie-data-structure/uncompressed-trie.svg)](https://codeclimate.com/github/trie-data-structure/uncompressed-trie/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/trie-data-structure/uncompressed-trie/main.svg)](https://codecov.io/gh/trie-data-structure/uncompressed-trie)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/trie-data-structure/uncompressed-trie.svg)](https://codeclimate.com/github/trie-data-structure/uncompressed-trie/trends/technical_debt)
[![Documentation](https://trie-data-structure.github.io/uncompressed-trie/badge.svg)](https://trie-data-structure.github.io/uncompressed-trie/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/@trie-data-structure/uncompressed-trie)](https://bundlephobia.com/result?p=@trie-data-structure/uncompressed-trie)
