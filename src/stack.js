class StackNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class Stack {
    constructor() {
        this._top = null;
    }

    push(data) {
        this._top = new StackNode(data, this._top);
        return this;
    }

    pop() {
        let result = this._top;
        if (this._top) {
            this._top = this._top.next;
        }
        return result ? result.data : null;
    }

    top() {
        return this._top ? this._top.data : null;
    }

    empty() {
        return this._top === null;
    }

    clear() {
        this._top = null;
        return this;
    }

    size() {
        let result = 0;
        let iterator = this._top;
        while(iterator) {
            iterator = iterator.next;
            result++;
        }
        return result;
    }
}

module.exports = Stack;
