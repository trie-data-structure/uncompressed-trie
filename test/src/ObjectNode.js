import test from 'ava';

import {iter} from '@functional-data-structure/persistent-stack';
import {Trie, ObjectNode} from '../../src/index.js';

test('Trie', (t) => {
	const object = {
		test: null,
		'test-1'() {},
		'test-2': {},
		'test-3': [],
		'': 42,
		'è!éèçé!èç!"§éç§É!"!É"': 'feed-the-test',
	};

	const decode = (parts) => [...iter(parts)].reverse().join('');
	const root = new ObjectNode();
	const trie = new Trie(root);

	for (const key of Object.keys(object)) trie.set(key, object[key]);

	for (const key of Object.keys(object)) {
		t.true(trie.has(key));
		const value = trie.get(key);
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
			trie.getSubTrie(key).set(element, ext[element]);
		}
	}

	const newObject = Object.assign({}, object, toadd);
	t.deepEqual(newObject, toObject(trie), 'check global structure after ext.');

	for (const key of Object.keys(toadd)) trie.delete(key);
	t.deepEqual(
		object,
		toObject(trie),
		'check global structure after removing ext.',
	);
});

test('SimpleTrie#getClosestAncestor', (t) => {
	const root = new ObjectNode();
	const trie = new Trie(root);
	const r = Math.random();
	trie.set('ancestor', 0);
	const [i, pt] = trie.getClosestAncestor('ancestors');
	t.is(i, 's');
	pt.set('s', r);
	t.is(r, trie.get('ancestors'));

	const [j] = trie.getClosestAncestor('ancestors');
	t.is(undefined, j);
});

test('SimpleTrie#get', (t) => {
	const root = new ObjectNode();
	const trie = new Trie(root);
	const r = Math.random();
	t.is(undefined, trie.get('ancestor'));
	trie.set('ancestor', 0);
	t.is(trie.get('ancestor'), 0);
	t.is(undefined, trie.get('ancestors'));
	const [i, pt] = trie.getClosestAncestor('ancestors');
	t.is(i, 's');
	pt.set('s', r);
	t.is(r, trie.get('ancestors'));

	const [j] = trie.getClosestAncestor('ancestors');
	t.is(undefined, j);
});

test('SimpleTrie#delete', (t) => {
	const root = new ObjectNode();
	const trie = new Trie(root);
	const r = Math.random();
	const key = 'abracadabra';
	t.is(undefined, trie.get(key));
	t.is(trie.delete(key), false);
	t.is(undefined, trie.get(key));
	const node = trie.set(key, r);
	t.is(r, node.value());
	t.is(r, trie.get(key));
	t.is(trie.delete(key), true);
	t.is(undefined, trie.get(key));
	t.is(trie.delete(key), false);
	t.is(undefined, trie.get(key));
});
