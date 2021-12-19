import {
	makePath,
	writePath,
	readPath,
	has,
	erasePath,
	enumerate,
	getClosestAncestor,
} from './core.js';

export default function SimpleTrie(root) {
	this.r = root;
}

SimpleTrie.prototype.set = function (key, value) {
	return writePath(this.r, key, value);
};

SimpleTrie.prototype.get = function (key) {
	return readPath(this.r, key);
};

SimpleTrie.prototype.has = function (key) {
	return has(this.r, key);
};

SimpleTrie.prototype.getClosestAncestor = function (key) {
	return getClosestAncestor(this.r, key);
};

SimpleTrie.prototype.getSubTrie = function (key) {
	const root = makePath(this.r, key);
	return new SimpleTrie(root);
};

SimpleTrie.prototype.delete = function (key) {
	return erasePath(this.r, key);
};

SimpleTrie.prototype[Symbol.iterator] = function () {
	return enumerate(this.r);
};
