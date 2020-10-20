import test from 'ava';

import {range, map} from '@aureooms/js-itertools';
import {iter} from '@aureooms/js-persistent-stack';
import {Trie, ArrayNode} from '../../src';

test('Trie', (t) => {
	const object = {
		test: null,
		'test-1'() {},
		'test-2': {},
		'test-3': [],
		'': 42,
		'è!éèçé!èç!"§éç§É!"!É"': 'feed-the-test',
	};

	const degree = 256;
	const encode = (key) => map((i) => key.charCodeAt(i), range(key.length));
	const decode = (parts) =>
		[...iter(parts)]
			.reverse()
			.map((x) => String.fromCharCode(x))
			.join('');
	const root = new ArrayNode(degree);
	const trie = new Trie(root);

	for (const key of Object.keys(object)) trie.set(encode(key), object[key]);

	for (const key of Object.keys(object)) {
		t.true(trie.has(encode(key)));
		const value = trie.get(encode(key));
		t.deepEqual(object[key], value, 'value should be stored in trie');
	}

	const toObject = (trie) => {
		const actual = {};
		for (const [path, value] of trie) actual[decode(path)] = value;
		return actual;
	};

	t.deepEqual(object, toObject(trie), 'check global structure');

	const ext = {
		huh: 'zigzig',
	};
	const toadd = {};

	for (const element of Object.keys(ext)) {
		for (const key of Object.keys(object)) {
			toadd[key + element] = ext[element];
			trie.getSubTrie(encode(key)).set(encode(element), ext[element]);
		}
	}

	const newObject = Object.assign({}, object, toadd);
	t.deepEqual(newObject, toObject(trie), 'check global structure after ext.');

	for (const key of Object.keys(toadd)) trie.delete(encode(key));
	t.deepEqual(
		object,
		toObject(trie),
		'check global structure after removing ext.',
	);
});

test('SimpleTrie#getClosestAncestor', (t) => {
	const code = (key, i) => key.charCodeAt(i);
	const encode = (key) => map((i) => code(key, i), range(key.length));
	const degree = 256;
	const root = new ArrayNode(degree);
	const trie = new Trie(root);
	const r = Math.random();
	trie.set(encode('ancestor'), 0);
	const [i, pt] = trie.getClosestAncestor(encode('ancestors'));
	t.is(code('s', 0), i);
	pt.set(code('s', 0), r);
	t.is(r, trie.get(encode('ancestors')));

	const [j] = trie.getClosestAncestor(encode('ancestors'));
	t.is(undefined, j);
});

test('SimpleTrie#get', (t) => {
	const code = (key, i) => key.charCodeAt(i);
	const encode = (key) => map((i) => code(key, i), range(key.length));
	const degree = 256;
	const root = new ArrayNode(degree);
	const trie = new Trie(root);
	const r = Math.random();
	t.is(undefined, trie.get(encode('ancestor')));
	trie.set(encode('ancestor'), 0);
	t.is(trie.get(encode('ancestor')), 0);
	t.is(undefined, trie.get(encode('ancestors')));
	const [i, pt] = trie.getClosestAncestor(encode('ancestors'));
	t.is(code('s', 0), i);
	pt.set(code('s', 0), r);
	t.is(r, trie.get(encode('ancestors')));

	const [j] = trie.getClosestAncestor(encode('ancestors'));
	t.is(undefined, j);
});

test('SimpleTrie#delete', (t) => {
	const code = (key, i) => key.charCodeAt(i);
	const encode = (key) => map((i) => code(key, i), range(key.length));
	const degree = 256;
	const root = new ArrayNode(degree);
	const trie = new Trie(root);
	const r = Math.random();
	const key = 'abracadabra';
	t.is(undefined, trie.get(encode(key)));
	t.is(trie.delete(encode(key)), false);
	t.is(undefined, trie.get(encode(key)));
	const node = trie.set(encode(key), r);
	t.is(r, node.value());
	t.is(r, trie.get(encode(key)));
	t.is(trie.delete(encode(key)), true);
	t.is(undefined, trie.get(encode(key)));
	t.is(trie.delete(encode(key)), false);
	t.is(undefined, trie.get(encode(key)));
});
