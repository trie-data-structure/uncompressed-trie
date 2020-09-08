import assert from 'assert';

export default function ArrayNode(degree, value = undefined) {
	assert(Number.isInteger(degree) && degree >= 2);
	this.a = new Array(degree);
	this.v = value;
}

ArrayNode.prototype.get = function (i) {
	assert(Number.isInteger(i) && i >= 0 && i < this.a.length);
	return this.a[i];
};

ArrayNode.prototype.set = function (i, value = undefined) {
	assert(Number.isInteger(i) && i >= 0 && i < this.a.length);
	this.a[i] = new ArrayNode(this.a.length, value);
	return this.a[i];
};

ArrayNode.prototype.setValue = function (value) {
	this.v = value;
};

ArrayNode.prototype.value = function () {
	return this.v;
};

ArrayNode.prototype[Symbol.iterator] = function* () {
	const degree = this.a.length;
	for (let i = 0; i < degree; ++i) {
		const child = this.a[i];
		if (child !== undefined) yield [i, child];
	}
};
