import test from 'ava';

import {range} from '@iterable-iterator/range';
import {map} from '@iterable-iterator/map';

import {Trie, ArrayNode} from '#module';

test('README', (t) => {
	// eslint-disable-next-line unicorn/prefer-code-point
	const encode = (key) => map((i) => key.charCodeAt(i), range(key.length));
	const degree = 256;
	const trie = new Trie(new ArrayNode(degree));

	const set = (key, value) => trie.set(encode(key), value);
	const get = (key) => trie.get(encode(key));

	set('abra', 1);
	set('cadabra', 2);
	set('abracadabra', 3);

	t.is(get('abra'), 1);
	t.is(get('cadabra'), 2);
	t.is(get('abracadabra'), 3);
});
