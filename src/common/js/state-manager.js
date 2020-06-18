export class StateManager {
    constructor(state) {

        this.state = state
        this.subscribe = (fn) => {

        }
    }

    setState(data) {
        if (typeof data === 'function') {
            let fn = data
            this.state = fn(this.state)
        } else if (typeof data === 'object') {
            this.state = { ...this.state, data }
        } else {
            this.state = state
        }
    }

}