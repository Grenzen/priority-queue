const Node = require('./node');
//import {Node} from './node';

class MaxHeap {
	constructor() {

		this.root = null;
		this.parentNodes = [];

	}

	push(data, priority) {

		insertNode.call(new Node(data, priority));
		
	}

	pop() {

		// if(this.length !== 0) {

		// }
		
	}

	detachRoot() {

		// this.root = null;
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {//it's work

		if (this.root === null && this.parentNodes == 0) {
			return true;
		}
		return false;
		
	}

	clear() { //it's work

		if (this.root !== null || this.parentNodes.length !== 0) {
			this.root = null;
			this.parentNodes = [];
			return this;
		}
	}

	insertNode(node) {

		if (isEmpty(node) == 0) {

			let node = new Node(data. priority);
			return this.root = node;
		}
		
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
