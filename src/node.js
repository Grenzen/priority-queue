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

			let boxParent = null;

			if ( this === this.parent.left && this.parent.right !== null ) {//убираем предполагаемого 2-го ребенка родителя в коробку

				boxParent = this.parent.right;
				this.parent.right.remove();
	
			} else if ( this === this.parent.right && this.parent.left !== null ) {

				boxParent = this.parent.left;
				this.parent.left.remove();

			} //потом он отойдет его ребенку
			
			//определение ветки 0 - левая, 1 - правая
			let counter = 0;
			let tmpRight = null;
			let tmpLeft = null;
						
			if ( this === this.parent.right ) {//на случай, если this является правым ребенком родителя
	
				counter += 1;
			} //для итогового смещения родителя вправо после перемещения (очередность boxParent)
				
			if ( this.parent.parent !== null ) {//это блок без изменения корня

				if ( this.parent === this.parent.parent.left ) { //если родитель является левым чайлдом корня

					if ( this.parent.parent.right !== null ) {

						tmpRight = this.parent.parent.right;
						this.parent.parent.right.remove();
					}

					this.parent.parent.appendChild(this);
					this.appendChild(this.parent.left);
					this.left.left = null;
					this.parent.left = null;
					this.parent.appendChild(this);
					this.parent.right = null;

					if ( tmpRight !== null ) {

						this.parent.appendChild(tmpRight);
					}

				} else if ( this.parent === this.parent.parent.right ) {

					if ( this.parent.parent.left !== null ) {

						tmpLeft = this.parent.parent.left;
						this.parent.parent.left.remove();
					}

					this.parent.parent.appendChild(this);
					this.appendChild(this.parent.right);
					this.left.left = null;
					this.parent.right = null;
					this.parent.appendChild(this);
					this.parent.left = null;

					if ( tmpLeft !== null ) {

						this.parent.appendChild(tmpLeft);
					}
				}
			} else if ( this.parent.parent === null ) { //блок смены root

				let tmp = this.parent;

				if ( counter == 0 ) { //пересмотреть

					this.appendChild(tmp);
					this.remove();

					if ( boxParent !== null ) {//c принятием boxParent при левой ветке, нет проблем

						this.appendChild(boxParent);

					}

					if ( boxChildLeft !== null ) {//есть вопросы по присвоению правого ребенка без левого

						this.left.appendChild(boxChildLeft);
					}
					if ( boxChildRight !== null ) {
							
						this.left.appendChild(boxChildRight);
					}
				} else if ( counter == 1 ) {
		
					this.appendChild(boxParent);
					this.appendChild(tmp);
					this.remove();

					if ( boxChildLeft !== null ) {

						this.right.appendChild(boxChildLeft);

					}
					if ( boxChildRight !== null ) {

						this.right.appendChild(boxChildRight);

					}
				}
			} //конец блока смены root
		}
	}
}

module.exports = Node;

