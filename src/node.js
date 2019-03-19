class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {

		// if (this.left === null) {
		// 	return this.left = node;
		// } else if (this.right === null) {
		// 	return this.right = node;
		// }

		if ( this.left === null || this.right === null ) {//it's work

			if ( this.left === null ) {

				this.left = node;
				node.parent = this;

			} else if ( this.left !== null && this.right === null) {

				this.right = node;
				node.parent = this;
			}
			return this;
		}

	}

	removeChild(node) {

		if ( node === this.left && node.parent === this ) {//it's work
			
			node.parent = null;
			this.left = null;
		} else if ( node === this.right && node.parent === this ) {

			node.parent = null;
			this.right = null;
		} else if ( node !== this.right && node !== this.left ) {
			
			throw new Error();
		}
		
	}

	remove() {//it's work

		if (this.parent !== null ) {
			this.parent.removeChild(this);
		}
		
	}

	swapWithParent() {

		if (this.parent !== null ) {

			if (this.parent.parent === null ) {
				 
				if ( this.parent.right === null) {

					this.parent.parent = this;
				}

				this.parent.left.parent = this;

			} else if ( this.parent.parent !== null ) {

				this.parent = this.parent.parent;
				this.parent.left.parent = this;
			}

		}
	}
}

module.exports = Node;

//class exports {Node};