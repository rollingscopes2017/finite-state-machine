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

class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this._config = config;
        this._states = new Stack();
        this._undoStates = new Stack();
        this._pushState(config.initial);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._states.top().name;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        this._pushState(state);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let state = this._states.top().transitions[event];
        this._pushState(state);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._states.clear();
        this._pushState(this._config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) {
            return Object.keys(this._config.states);
        }
        let result = [];
        for (let state in this._config.states) {
            if (Object.keys(this._config.states[state]['transitions']).includes(event)) {
                result.push(state);
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this._states.size() === 1) {
            return false;
        }
        this._undoStates.push(this._states.pop());
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this._undoStates.empty()) {
            return false;
        }
        this._states.push(this._undoStates.pop());
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        let currentState = this._states.top();
        this._states.clear().push(currentState);
        this._undoStates.clear();
    }

    _pushState(state) {
        this._states.push(Object.assign(this._config.states[state], {name: state}));
        this._undoStates.clear();
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
