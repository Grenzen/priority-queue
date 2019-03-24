class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {

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
		
			let boxChildLeft = null;
			let boxChildRight = null;
			let boxParent = null;
			let counter = 0;
			let tmp = this.parent;

			if ( this.parent.right !== null && this === this.parent.right || this.parent.parent !== null && this.parent === this.parent.parent.right ) {
				counter +=1;
			}
		
			if ( this.left !== null || this.right !== null ) { //убираем предполагаемых детей свопаемого чайлда в коробки
							
				if ( this.left !== null ) {
								
					boxChildLeft = this.left;
					this.left.remove();
				}
				if ( this.right !== null ) {
								
					boxChildRight = this.right;
					this.right.remove();
				}
		
			} //потом они отойдут к его родителю
		
		
			if ( this === this.parent.left && this.parent.right !== null ) {//убираем предполагаемого 2-го ребенка родителя в коробку
		
				boxParent = this.parent.right;
				this.parent.right.remove();
			
			} else if ( this === this.parent.right && this.parent.left !== null ) {
				
				boxParent = this.parent.left;
				this.parent.left.remove();
			} //потом он отойдет его ребенку
		
			this.parent = this.parent.parent;
		
			if ( counter === 1) {
				if ( !!this.parent ) { this.parent.right = this; }
				if ( !!boxParent ) { this.appendChild(boxParent); }
				this.appendChild(tmp);

				if ( this.right !== null ) {
					if ( this.right.right !== null ) { this.right.right = null; }
					if ( this.right.left !== null ) { this.right.left = null; }
				}
				if ( this.left !== null && this.parent !== null ) {
					if ( this.left.left !== null ) { this.left.left = null; }
					if ( this.left.right !== null ) { this.left.right = null; }
				}

				if (!!boxChildLeft) { this.right.appendChild(boxChildLeft); }
				if (!!boxChildRight) { this.right.appendChild(boxChildRight); }

			} else if ( counter === 0 ) {

				if ( !!this.parent ) { this.parent.left = this; }
				this.appendChild(tmp);


				if ( this.left !== null ) {
					if ( this.left.left !== null ) { this.left.left = null; }
					if ( this.left.right !== null ) { this.left.right = null; }
				}

				if ( this.right !== null && this.parent !== null ) {
					if ( this.right.right !== null ) { this.right.right = null; }
					if ( this.right.left !== null ) { this.right.left = null; }
				}

				if (!!boxParent) { this.appendChild(boxParent); }
				if (!!boxChildLeft) { this.left.appendChild(boxChildLeft); }
				if (!!boxChildRight) { this.left.appendChild(boxChildRight); }
			}
		}
	}
}

module.exports = Node;

