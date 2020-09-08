export default function ObjectNode(value = undefined) {
	this.a = {};
	this.v = value;
}

ObjectNode.prototype.get = function (i) {
	return this.a[i];
};

ObjectNode.prototype.set = function (i, value = undefined) {
	this.a[i] = new ObjectNode(value);
	return this.a[i];
};

ObjectNode.prototype.setValue = function (value) {
	this.v = value;
};

ObjectNode.prototype.value = function () {
	return this.v;
};

ObjectNode.prototype[Symbol.iterator] = function* () {
	for (const [i, child] of Object.entries(this.a)) {
		if (child !== undefined) yield [i, child];
	}
};
