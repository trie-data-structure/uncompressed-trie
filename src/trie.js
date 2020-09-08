import assert from 'assert';
import {empty, push, pop} from '@aureooms/js-persistent-stack';

export const makePath = (current, key) => {
	assert(current !== undefined);
	const itKey = key[Symbol.iterator]();
	for (const part of itKey) {
		const temporary = current.get(part);
		if (temporary === undefined) {
			return makeNonExistingPath(current.set(part), itKey);
		}

		current = temporary;
	}

	return current;
};

export const makeNonExistingPath = (current, key) => {
	assert(current !== undefined);
	for (const part of key) current = current.set(part);
	return current;
};

export const writePath = (root, key, value) => {
	const current = makePath(root, key);
	current.setValue(value);
	return current;
};

export const readPath = (root, key) => {
	const node = getReference(root, key);
	return node === undefined ? undefined : node.value();
};

export const has = (root, key) => getReference(root, key) !== undefined;

export const getReference = (current, key) => {
	assert(current !== undefined);
	for (const part of key) {
		current = current.get(part);
		if (current === undefined) return undefined;
	}

	return current;
};

export const getClosestAncestor = (ancestor, key) => {
	assert(ancestor !== undefined);
	for (const part of key) {
		const current = ancestor.get(part);
		if (current === undefined) return [part, ancestor];
		ancestor = current;
	}

	return [undefined, ancestor];
};

export const erasePath = (current, key) => {
	assert(current !== undefined);
	for (const part of key) {
		current = current.get(part);
		if (current === undefined) return false;
	}

	if (current.value() === undefined) return false;
	current.setValue(undefined);
	return true;
};

export function* enumerate(root) {
	assert(root !== undefined);
	let prefix = empty();
	if (root.value() !== undefined) yield [prefix, root.value()];
	const stack = [root[Symbol.iterator]()];
	while (true) {
		const it = stack.pop();
		const {value, done} = it.next();
		if (done) {
			if (stack.length === 0) break;
			prefix = pop(prefix);
			continue;
		}

		stack.push(it);
		const [k, node] = value;
		prefix = push(prefix, k);
		if (node.value() !== undefined) yield [prefix, node.value()];
		stack.push(node[Symbol.iterator]());
	}
}
